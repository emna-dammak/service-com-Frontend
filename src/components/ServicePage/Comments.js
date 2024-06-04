import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const API_URL = process.env.REACT_APP_SERVER_URL;

const Comments = ({ serviceId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIO = io(`${API_URL}events`, {
      withCredentials: true,
    });
    setSocket(socketIO);
    socketIO.on("connect", () => {});
    socketIO.on("newComment", (newComment) => {
      if (newComment.service.id === Number(serviceId)) {
        const formattedComment = {
          ...newComment,
          createdAt: newComment.createdAt
            ? newComment.createdAt.slice(0, 10)
            : "",
        };
        setComments((prevComments) => [formattedComment, ...prevComments]);
      }
    });

    fetchComments();

    return () => {
      socketIO.disconnect();
    };
  }, [serviceId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}comments/${serviceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const formattedData = data.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt ? comment.createdAt.slice(0, 10) : "",
      }));
      setComments(formattedData.reverse());
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentData = {
      content: newComment,
      serviceId: Number(serviceId),
    };
    socket.emit("comment", JSON.stringify(newCommentData));
    setNewComment("");
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="md:ml-4 mt-4 md:mt-0 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Comments</h3>
      <form onSubmit={handleCommentSubmit} className="mb-4 flex items-center">
        <img
          src={`/${user.profileImagePath}`} // Replace with the actual path to the profile picture
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          className="flex-1 border border-gray-300 rounded-l-full p-2"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-r-full"
        >
          Submit
        </button>
      </form>
      <div className="space-y-4">
        {currentComments.map((comment, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-3xl p-4 shadow-sm flex items-start bg-emerald-50"
          >
            <img
              src={`/${comment.user.profileImagePath}`}
              alt={`${comment.userId}'s profile`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800 font-semibold">
                  {comment.user.firstName + " " + comment.user.lastName}
                </p>
                <span className="text-xs text-gray-500">
                  {comment.createdAt}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded ${
              number === currentPage ? "bg-green-300" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastComment >= comments.length}
          className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Comments;
