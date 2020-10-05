import React, { useEffect, useState } from "react";

const Comments = ({ userid }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/eventcomments/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.eventComment);
      });
  }, []);

  return (
    <div>
      <h1>ALL COMMENTS FROM EVENTS</h1>
      {comments.map((item) => (
        <ul>
          <h3>
            {item.message} BY {item.name}
          </h3>
        </ul>
      ))}
    </div>
  );
};

export default Comments;
