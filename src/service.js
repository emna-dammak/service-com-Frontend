import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJlbWFpbCI6ImVtbmFAdGVzdHQuY29tIiwiZ291dmVybm9yYXQiOiIiLCJkZWxlZ2F0aW9uIjoiIiwiaWF0IjoxNzE2NzE5NDc3fQ.g7FvTHY8dWL0KVR_SVOV-4tZh0Rns0_2LDSlhe5od3A"


const Service = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
const [socket, setSocket] =useState();
  useEffect(() => {
    const socketIO = io('http://localhost:3000/events', {
  transports: ['websocket'],
  autoConnect: false,
  extraHeaders: {
    Authorization:`Bearer ${token}`,
  } 
});
setSocket(socketIO);
socketIO.on("connect", () => {
      console.log("Connected!");
    });
    // Listen for the 'newComment' event from the server
    socketIO.on("newComment", (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    // Fetch initial comments
    fetchComments();

    // Cleanup when the component is unmounted
    return () => {
      socketIO.disconnect();
    };
  }, []);

  // Function to fetch comments from the server
  const fetchComments = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:3000/comments', config);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === '') return;

    
    const newComment = { content, serviceId: 1 };  // Replace 1 with the actual service ID
     socket.emit('comment', JSON.stringify(newComment));

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
        <p className="text-gray-800">{comment.content}</p>
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