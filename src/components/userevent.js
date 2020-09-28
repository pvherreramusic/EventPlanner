import React, { useEffect, useState } from "react";


const Example = ({ eventid }) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch(`/api/events/event/${eventid}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.userEvent);
      });
  }, []);



  return (
    <div>
      {posts.map((item) => (
        <ul>
          <h1>{item.title}</h1>
          in
          <h2>{item.location}</h2>
          at
          <h3>
            {item.time} , {item.date}
          </h3>
          <br></br>
          <br></br>
          <h3>DESCRIPTION ABOUT THE EVENT: {item.description}</h3>

          <h1> BY {item.name}</h1>
        </ul>
      ))}
    </div>
  );
};

export default Example;
