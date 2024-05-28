import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';



const Service = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [socket, setSocket] =useState();
  const { serviceId } = useParams();
  const [newComment,setnewComment] =useState('');
  useEffect(() => {
    const socketIO = io('http://localhost:3000/events', {
  withCredentials: true, 
});
setSocket(socketIO);
socketIO.on("connect", () => {
      console.log("Connected!");
      
    });
    socketIO.on("newComment", (newComment) => {
        console.log(serviceId)
        console.log(newComment.serviceId)
      if (newComment.serviceId === Number(serviceId)) {
        
      setComments((prevComments) => [...prevComments, newComment]);}
    });

    fetchComments();

    return () => {
      socketIO.disconnect();
    };
  }, [serviceId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/${serviceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setComments(data);
      console.log(data)

    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '') return;

    
    const newCommentData = { content, serviceId: Number(serviceId) };  // Create an object with content and serviceId
  setnewComment(newCommentData);  // Set the new comment data

  // Emit the new comment via socket.io
  socket.emit('comment', JSON.stringify(newCommentData));

  // Clear the input field
  setContent('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        <CommentList comments={comments} />
        <CommentForm content={content} setContent={setContent} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => (
  <ul className="space-y-4">
    {comments.map((comment) => (
      <li key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow">

        <div className="flex justify-between items-center">
          <small className="text-green-600">{comment.user.firstName}</small>
        </div>
        <p className="text-gray-1000 text-lg">{comment.content}</p>
        
      </li>
    ))}
  </ul>
);

const CommentForm = ({ content, setContent, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="mt-6">
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Write a comment..."
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      required
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
      Post Comment
    </button>
  </form>
);

export default Service;