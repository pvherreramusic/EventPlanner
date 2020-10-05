import React, { useEffect, useState } from "react";

const Example = ({ eventid }) => {
  const [posts, setPosts] = useState([]);

  const fetchInventory = () => {
    fetch(`/api/events/event/${eventid}`)
      .then((res) => res.json())
      .then((json) => setPosts(json.userEvent));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [Title, setTitle] = useState(null);
  const [Description, setDescription] = useState(null);

  const onEdit = ({ eventid, oldTitle, oldDescription }) => {
    setInEditMode({
      status: true,
      rowKey: eventid,
    });
    setTitle(oldTitle);
    setDescription(oldDescription);
  };

  const updateEvent = ({ eventid, newTitle, newDescription}) => {
    fetch(`/api/events/event/${eventid}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTitle,
        event_id: eventid,
        description: newDescription,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        onCancel();
        fetchInventory();
      });
  };

  const onSave = ({ eventid, newTitle, newDescription }) => {
    updateEvent({ eventid, newTitle, newDescription });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });

    setTitle(null);
    setDescription(null);
  };

  return (
    <div className="container">
      <h1>Simple Inventory Table</h1>
      <table>
        <thead>
          <tr>
            <th>Event TItle</th>
            <br></br>
            <br></br>
            <th>Location</th>
            <th>Time and Date</th>
            <th>EVENT PLANNER NAME</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr key={item.event_id}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.event_id ? (
                  <input
                    value={Title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                ) : (
                  item.title
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.event_id ? (
                  <React.Fragment>
                    <button
                      className={"btn-success"}
                      onClick={() =>
                        onSave({ eventid: item.event_id, newTitle: Title })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit({ eventid: item.event_id, oldTitle: item.title })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
             
              <td>{item.location}</td>
              <td>
                {item.date}
                {item.time}
               
              </td>
              <td>
                {item.name}
               
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.event_id ? (
                  <input
                    value={Description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                ) : (
                  item.description
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.event_id ? (
                  <React.Fragment>
                    <button
                      className={"btn-success"}
                      onClick={() =>
                        onSave({
                          eventid: item.event_id,
                          newDescription: Description,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit({
                        eventid: item.event_id,
                        oldDescription: item.description,
                      })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Example;
