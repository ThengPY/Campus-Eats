import React, { useState } from 'react';

const CommunityBoard = ({isOpen, onClose}) => {
    if (!isOpen) return null;
    // State to manage comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");
  
    // Handle form submission
    const handleAddComment = (e) => {
      e.preventDefault();
      if (newComment.trim() === "" || username.trim() === "") return;
  
      // Add new comment to the list
      setComments((prevComments) => [
        ...prevComments,
        { id: Date.now(), text: newComment, user: username },
      ]);
    };
  
    // Handle input change
    const handleInputChange = (e) => {
      setNewComment(e.target.value);
      setUsername(e.target.value);
    };
  
    return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Community Board</h2>
            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="comment-form">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="username-input"
            />
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-textarea"
            ></textarea>
            <button type="submit">Post Comment</button>
            </form>

            {/* Comments List */}
            <div className="comments-list">
                <h2>Comments</h2>
                {comments.length > 0 ? (
                 comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <p className="comment-user"><strong>{comment.user}</strong></p>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                 ))
                ) : (
                  <p>No comments yet. Be the first to post!</p>
                )}
            
          </div>
        </div>
      </div>
      );
  }
  
  export default CommunityBoard;