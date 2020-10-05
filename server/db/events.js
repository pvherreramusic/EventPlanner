const { client } = require("./client");

async function getEventByEventId(userId) {
  try {
    const { rows} = await client.query(`
    SELECT

    event.user_id



    
    
FROM
    event




GROUP BY 

event.user_id

    
    
HAVING
event.user_id = $1
    `,
    [userId]
    
    );

return rows;
}
  catch (error) {
    throw error;
  }
}

///http://localhost:3001/api/events/event/
async function getEventByUserId(eventid) {
  try {
    const {
      rows
    } = await client.query(
      `
      
      SELECT
      users.id,
      event.event_id,
      event.user_id,
      event.group_id,
      event.title,
      event.description,
      event.date,
      event.time,
      event.location,
      users.name

 
      
      
  FROM
      event
 INNER JOIN users ON (event.user_id = users.id)

 
 
  GROUP BY 
  users.id,
 event.event_id,
 event.title,
 event.user_id,
      event.description,
      event.date,
      event.time,
      event.location,
      users.name,
      event.group_id
      
      
  HAVING
 event.event_id = $1
            
        `,
        [eventid]
    );

    

    return rows;
  } catch (error) {
    throw error;
  }
}
///bygroup/


async function getEventByGroupId(userid) {
  try {
    const {
      rows
    } = await client.query(
      `
      SELECT
      event.event_id,
      event.user_id,
      event.group_id,
       event.title
    FROM
        user_group
    INNER JOIN event ON (event.event_id = event.event_id)
    
 
 
    GROUP BY
    event.event_id,
      event.user_id,
      event.group_id,
       event.title
       
       HAVING event.group_id = $1
       
      
    
      
      

            
        `,
        [userid]
    );

    

    return rows;
  } catch (error) {
    throw error;
  }
}







async function getAllEvents() {
  const { rows } = await client.query(`
          SELECT *
          FROM event;
          `);

  return rows;
}



async function createEvent({user_id, group_id, title, description, isComfirmed = false, date, time, location}) {
  try {
    const {
      rows: [event],
    } = await client.query(
      `
              INSERT INTO event (user_id, group_id, title, description, isComfirmed, date, time, location)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              RETURNING *;
              `,
      [user_id, group_id, title, description, isComfirmed, date, time, location]
    );

    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateEvent(eventid, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [event]
    } = await client.query(
      `Update event
    SET ${setString}
    WHERE event_id=${eventid}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteEvent(eventId) {
  if (!eventId) {
    return false;
  }

  await client.query(
    `
    DELETE FROM event
    WHERE id=$1;
    `,
    [eventId]
  );

  return true;
}

module.exports = {
getAllEvents,
getEventByUserId,
getEventByGroupId,
createEvent,
updateEvent,
getEventByEventId

}