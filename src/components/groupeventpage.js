import React, { useState, useEffect } from "react";
import { GroupPageEx, SendInvite } from "./index";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

const SelectGroups = () => {
  const initialFormData = {
    group_id: "",
  };

  const [items, setItems] = useState([]);
  const [value, setValue] = useState();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`/api/groups/allgroups`);
      const body = await response.json();
      setItems(
        body.groups.map(({ group_name, id }) => ({
          label: group_name,
          value: id,
        }))
      );
    }
    getCharacters();
  }, []);

  const handleChange = (e) => {
    if (e.target.value !== "YourGroups") {
      setValue(e.target.value);
      setFormData({
        ...formData,

        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("api/groups/usergroup", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log(value);

  if (value) {
    return (
      <Form>
        <GroupPageEx groupid={value}></GroupPageEx>
        <Button onClick={handleSubmit}>JOIN GROUP</Button>
      </Form>
    );
  } else {
    return (
      <div>
        <h1>Select your group to see group event page</h1>

        <select
          multiple={false}
          name="group_id"
          value={value}
          onChange={handleChange}
        >
          <option value="The Groups">The Groups:</option>
          {items.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default SelectGroups;
