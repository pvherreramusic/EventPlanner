const { client } = require("./client");

async function getInvitationsById({ group_id, inviter_id, invitee_id }) {
  try {
    const {
      rows: [invitations],
    } = await client.query(
      `
              SELECT *
              FROM invitations
              WHERE group_id=$1;
              WHERE inviter_id=$2;
              WHERE invitee_id=$3;

              `,
      [group_id, inviter_id, invitee_id]
    );

    if (!invitations) {
      throw {
        name: "NotFoundError",
        description: "Could not find user with that Invite ID",
      };
    }

    return invitations;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInvitations({ group_id, inviter_id, invitee_id }) {
  try {
    const {
      rows: [invitations],
    } = await client.query(
      `
        INSERT INTO invitations (group_id ,inviter_id, invitee_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [group_id, inviter_id, invitee_id]
    );

    return invitations;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateInvitations(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [invitations],
    } = await client.query(
      `
              UPDATE invitations
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
              `,
      Object.values(fields)
    );

    return invitations;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllInvitations() {
  const { rows } = await client.query(`
          SELECT *
          FROM invitations;
          `);

  return rows;
}

module.exports = {
  getAllInvitations,
  getInvitationsById,
  updateInvitations,
  createInvitations,
};
