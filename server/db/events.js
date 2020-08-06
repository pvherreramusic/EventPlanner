const { client } = require("./client");

async function getAllEvents() {
  const { rows } = await client.query(`
          SELECT *
          FROM events;
          `);

  return rows;
}

async function getEventById(eventId) {
  try {
    const {
      rows: [event],
    } = await client.query(
      `
              SELECT *
              FROM events
              WHERE id=$1;
              `,
      [eventId]
    );


    if (!event) {
      throw {
        name: "EventNotFoundError",
        description: "Could not find event with that eventId",
      };
    }


    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function createEvent({ title, description, isOwner}) {
  try {
    const {
      rows: [event],
    } = await client.query(
      `
              INSERT INTO products (title, description, isOwner)
              VALUES ($1, $2, $3)
              ON CONFLICT (title) DO NOTHING
              RETURNING *;
              `,
      [title, description, isOwner]
    );

    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateEvent(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [event],
    } = await client.query(
      `
              UPDATE products
              SET ${setString}
              WHERE id=${id}
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
deleteProduct,
getAllEvents,
getEventById,
createEvent,
updateEvent,
deleteEvent




}