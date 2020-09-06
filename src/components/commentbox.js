import React, { useState, useEffect} from "react";
import axios from "axios";
import { Button, Form, Header } from "semantic-ui-react";



const CommentForm = ({userid}) => {
  const initialFormData = {
    message : "",
    event_id: ""
   


  };

  const [formData, setFormData] = useState(initialFormData);
  const [successForm, setSuccess] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState();
  
  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`/api/events/event/${userid}`);
      const body = await response.json();
      setItems(body.userEvent.map(({ title , event_id},) => ({ label: title, value: event_id })));
    }
    getCharacters();
  }, []);
  
  
  



  const handleChange = (e) => {
    if (e.target.value !== "YourEvents") {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(!successForm);
    console.log(formData);
    axios
      .post("api/comments/newcomment", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  


  return (



    <>
      <div>


        {successForm ? (
          <>
            <Header as="h1" textAlign="center">
            
            
            </Header>
          </>
        ) : (


          <Header as="h1" textAlign="center">
            Enter your comment
            <Form>
              <Form.Group >
                <Form.Input
                  label="comment"
                  name="message"
                  onChange={handleChange}
                />
              </Form.Group>
            
FOR Event

              <select 
              multiple={false}
label="Event"
name="event_id"
value={value} 
onChange={handleChange} 
>
<option value="YourEvent">Your Events:</option>
{items.map(({ label, value }) => (
<option key={value} value={value}>
{label}
</option>

))}
</select>
             
              <Button onClick={handleSubmit}>Submit Your Comment</Button>
            </Form>
          </Header>
          )}
        
    
      </div>
  

  </>
  )}



 
export default CommentForm;
