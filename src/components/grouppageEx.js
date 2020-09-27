import React, { useEffect, useState } from "react";
import {SendInvite} from "./index"





const GroupPageEx = ({ groupid }) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch(`/api/groups/selectedgroup/${groupid}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.selected);
      });
  }, []);



  return (

   
    <div>

    
    {posts.map((item) => (
      <ul>
   <h1>GROUP NAME: {item.group_name}</h1>
   <h3>DESCRIPTION:</h3><p>{item.description}</p>
   
      </ul>
    ))}

    <br>
</br>
<br>
</br>

<SendInvite></SendInvite>
    
  </div>

     
  );
};



export default GroupPageEx;