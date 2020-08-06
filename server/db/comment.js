const { client } = require("./client");

async function getAllComments() {
  const { rows } = await client.query(`
    SELECT *
    FROM reviews;
  `);

  return rows;
}

async function getCommentsById(commentId) {
  try {
    const {
      rows: [comment],
    } = await client.query(
      `
      SELECT *
      FROM comment
      WHERE id=$1;
        `,
      [commentId]
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

//getReviewsByUserId - Will this works? need to get multiple reviews.
async function getCommentByUserId(userId) {
  try {
    const {
      rows: [comment],
    } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE user_id=$1;
        `,
      [userId]
    );

    if (!comment) {
      throw {
        name: "ReviewByUserIdNotFoundError",
        description: `Couldn't find review with userId: ${userId}`,
      };
    }

    return comment;
  } catch (error) {
    throw error;
  }
}

//getReviewsByProductId
async function getCommentByEventId(eventId) {
  try {
    const {
      rows: [comment],
    } = await client.query(
      `
      SELECT *
      FROM reviews
      WHERE product_id=$1;
      `,
      [eventId]
    );

    if (!comment) {
      throw {
        name: "ReviewByUserIdNotFoundError",
        description: `Couldn't find review with userId: ${userId}`,
      };
    }

    return comment;
  } catch (error) {
    throw error;
  }
}


async function createComment({ title, body, userId, eventId }) {
  if (!title || !userId || !eventId) {
    return null;
  }

  const {
    rows: [comment],
  } = await client.query(
    `
        INSERT INTO reviews(title, body, user_id, event_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
    [title, body || null, userId, productId]
  );

  return comment;
}

//updateReview
async function updateComment(id, fields = {}) {
  if (!id) {
    return null;
  }

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
        UPDATE reviews
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
    `,
    Object.values(fields)
  );

  return updatedComment;
}


module.exports = {
getCommentByUserId,
getAllComments,
getCommentsById,
updateComment,
getCommentByEventId,
createComment
};