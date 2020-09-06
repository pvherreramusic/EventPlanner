const { client } = require("./client");

async function createGroup({group_name, user_id}) {
  try {
    const {
      rows: [group]
    } = await client.query(
      `
      INSERT INTO groups (group_name ,user_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [group_name, user_id]
    );

    return group;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllGroup() {
  const { rows } = await client.query(`
  SELECT *
  FROM groups;
  `);
  return rows;
}




async function updateGroup(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [group]
    } = await client.query(
      `Update groups
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return group;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getGroupById(userid) {
  try {
    const {
      rows
    } = await client.query(
      `
      SELECT
      groups.group_name,
        groups.id,
        groups.user_id
     FROM
         groups
     INNER JOIN users ON (groups.user_id = users.id)
     
     GROUP BY
        users.id,
        groups.id,
        groups.user_id
     HAVING
     users.id = $1
    `,
      [userid]
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {
getAllGroup,
getGroupById,
createGroup,
updateGroup
};