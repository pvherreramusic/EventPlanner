import React from "react";
import { CommentForm, Example, Comments } from "./index";

export default function GroupPage({userid}) {
  return (
    
    <div>
     
      <CommentForm userid={userid}></CommentForm>
      <Comments userid={userid}></Comments>
    </div>
  );
}

