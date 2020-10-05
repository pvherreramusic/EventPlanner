import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Header } from "semantic-ui-react";

const FormForNewEvent = ({ userid }) => {
  const initialFormData = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    group_id: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successForm, setSuccess] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`/api/groups/${userid}/usergroup`);
      const body = await response.json();
      setItems(
        body.group.map(({ group_name, group_id }) => ({
          label: group_name,
          value: group_id,
        }))
      );
    }
    getCharacters();
  }, []);

  const handleChange = (e) => {
    if (e.target.value !== "YourGroups") {
      setFormData({
        ...formData,

        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(!successForm);
    console.log(formData);
    axios
      .post("api/events/newevent", formData, {
        headers:  {Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {})
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
              Your Details are Complete. Go Check Out Your Event in the Groups
              Page.
            </Header>
          </>
        ) : (
          <Header as="h1" textAlign="center">
            EVENT FORM
            <br></br>
            Enter correct fields
            <Form>
              <Form.Group unstackable widths={2}>
                <Form.Input
                  label="Title"
                  name="title"
                  onChange={handleChange}
                />
                <Form.TextArea
                  label="description"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  label="Date(MM-DD-YYYY)"
                  name="date"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Time(HH:MM:SS AM/PM)"
                  name="time"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Location"
                  name="location"
                  onChange={handleChange}
                />
                <br></br>
                <h2>WHICH GROUP YOU ARE IN DO YOU WANT THIS EVENT TO GO TO?</h2>
                <select
                  multiple={false}
                  label="GROUP"
                  name="group_id"
                  value={value}
                  onChange={handleChange}
                >
                  <option value="YourGroups">Your Groups:</option>
                  {items.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Button onClick={handleSubmit}>Submit Your Event</Button>
            </Form>
          </Header>
        )}
      </div>
    </>
  );
};

export default FormForNewEvent;
