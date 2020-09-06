const { client } = require("./client");

async function getAllComments() {
  const { rows } = await client.query(`
  SELECT *
  FROM comment

  `);

  return rows;
}

async function getCommentsById(userId) {
  try {
    const {
      rows: [comment],
    } = await client.query(
      `
      SELECT
      comment.id
      comment.message,
      comment.user_id,
      comment.event_id,
      users.name
      FROM comment
      INNER JOIN event ON (comment.event_id = event.id)
      INNER JOIN users ON (comment.user_id = users.id)
      GROUP BY
      comment.message,
      comment.user_id,
      comment.event_id,
      users.name
      HAVING
      comment.event_id = $1
  
      `,
      [userId]
    );

    if (!comment) {
      throw {
        name: "CommentByIdNotFoundError",
        description: `Couldn't find comment with Id: ${commentId}`,
      };
    }

    return comment;
  } catch (error) {
    throw error;
  }
}

async function getCommentEventId(userId) {
  try {
    const { rows } = await client.query(
      `
      SELECT
      comment.id,
      comment.message,
      comment.user_id,
      comment.event_id,
      users.name,
      event.title
      FROM comment
      INNER JOIN users ON (comment.id = users.id)
      INNER JOIN event ON (comment.event_id = event.event_id)
      GROUP BY
      comment.message,
      comment.user_id,
      comment.event_id,
      users.name,
      event.title,
      comment.id
      HAVING
     comment.user_id= $1


            
        `,
      [userId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCommentUserId(userId) {
  try {
    const { rows } = await client.query(
      `
            SELECT *
            FROM comment
            WHERE user_id= $1


            
        `,
      [userId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createComment({ message, user_id, event_id }) {
  const {
    rows: [comment],
  } = await client.query(
    `
        INSERT INTO comment(message, user_id, event_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    [message, user_id, event_id]
  );

  return comment;
}

//updateReview
async function updateComment(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (!setString.length) {
    return null;
  }

  const {
    rows: [updatedComment],
  } = await client.query(
    `
        UPDATE comment
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
    `,
    Object.values(fields)
  );

  return updatedComment;
}

module.exports = {
  getAllComments,
  getCommentsById,
  updateComment,
  createComment,
  getCommentEventId,
  getCommentUserId,
};
