import React, { useState, useEffect } from "react";
import { Example, CommentForm, Comments } from "./index";

const SelectGroups = ({ userid }) => {
  const [items, setItems] = useState([]);
  const [successForm, setSuccess] = useState(false);
  const [value, setValue] = useState();
  const [groupEvents, setGroupEvents] = useState([]);

  console.log(value);
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`/api/events/bygroup/${value}`);
      const body = await response.json();
      setGroupEvents(
        body.evnt.map(({ title, event_id }) => ({
          label: title,
          value: event_id,
        }))
      );
    }

    getEvents();
  }, [value]);

  const handleEventChange = (e) => {
    if (e.target.value !== "TheEvents") {
      setSuccess(!successForm);
      setGroupEvents(e.target.value);
    }
  };

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`/api/groups/${userid}/usergroup`);
      const body = await response.json();
      setItems(
        body.group.map(({ group_name, id }) => ({
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
    }
  };

  console.log(value);
  console.log(userid);

  if (value) {
    return (
      <div>
        {successForm ? (
          <>
            <div>
              <Example eventid={groupEvents}></Example>
              <CommentForm userid={groupEvents}></CommentForm>
              <Comments userid={groupEvents}></Comments>
            </div>
          </>
        ) : (
          <select multiple={false} onChange={handleEventChange}>
            <option value="TheEvents">The Events:</option>
            {groupEvents.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Select your group to see group event page</h1>

        <select multiple={false} onChange={handleChange}>
          <option value="YourGroups">Your Groups:</option>
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
