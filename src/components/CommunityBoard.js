import React, { useState, useEffect } from 'react';

const CommunityBoard = ({isOpen, onClose}) => {
    if (!isOpen) return null;
    // State to manage comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");

    //Fetch comments when the component mounts
    useEffect(() => {
        fetchComments();
    }, []);

    // Function to fetch comments from the server
    const fetchComments = () => {
        fetch('http://localhost:5000/comments')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Map the fetched comments to match the local structure
                    const formattedComments = data.comments.map(comment => ({
                        id: comment.id, // Assuming your database has an id field
                        text: comment.comment, // Assuming your database has a comment field
                        user: comment.username // Assuming your database has a username field
                    }));
                    setComments(formattedComments);
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    };

    // Handle form submission
    const handleAddComment = (e) => {
        e.preventDefault();
        if(localStorage.getItem('username')===''){
            alert('Please log in before reserving');
            return;
        }
        else if (newComment.trim() === "" || username.trim() === "") return;


        // Prepare the comment data
        const commentData = { comment: newComment };

        // Make the POST request to add the comment
        fetch(`http://localhost:5000/comment/create/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add comment');
                }
                return response.text();
            })
            .then(data => {
                console.log('Comment added response:', data);

                // Add new comment to the local state in the required format
                setComments((prevComments) => [
                    ...prevComments,
                    { id: Date.now(), text: newComment, user: username },
                ]);

                // Clear the new comment input
                setNewComment("");
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };

    // Handle input change
    const handleInputChange = (e) => {
      setNewComment(e.target.value);
      setUsername(e.target.value);
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className = "close-btn">
          <span class="material-symbols-rounded" onClick={onClose}>close</span>
        </div>
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