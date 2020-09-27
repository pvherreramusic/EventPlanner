import React, { useState} from "react";
import axios from "axios";
import { Button, Form, Header, } from "semantic-ui-react";



const CreateGroup = () => {
  const initialFormData = {
   group_name: "",
   description: "",
   

   

  };

  const [formData, setFormData] = useState(initialFormData);
  const [successForm, setSuccess] = useState(false);
  
  



  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(!successForm);
    console.log(formData);
    axios
      .post("api/groups/newgroup", formData, {
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
              Your Details are Complete. Go Check Out Your Event in the Groups Page.
            </Header>
          </>
        ) : (

          <Header as="h1" textAlign="center">
            Enter correct fields
            <Form>
              <Form.Group unstackable widths={2}>
                <Form.Input
                  label="Group Name"
                  name="group_name"
                  onChange={handleChange}
                />
                 <Form.TextArea
                  label="Description"
                  name="description"
                  onChange={handleChange}
                />
               


            
              </Form.Group>
              <Button onClick={handleSubmit}>Create Group</Button>
            </Form>
          </Header>
          )}
        
    
      </div>
  

  </>
  )}

export default CreateGroup;