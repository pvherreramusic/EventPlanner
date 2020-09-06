const { client } = require("./client");


async function getUserGroupById({user_id, group_id}) {
    try {
      const {
        rows: [user_group],
      } = await client.query(
        `
              SELECT *
              FROM user_group


              `,
        [user_id, group_id]
      );
  
      if (!user_group) {
        throw {
          name: "UserNotFoundError",
          description: "Could not find user with that userId",
        };
      }
  
      return user_group;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function createUG({group_id, user_id}) {
    try {
      const {
        rows: [user_group]
      } = await client.query(
        `
        INSERT INTO user_group (group_id ,user_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [group_id, user_id]
      );
  
      return user_group;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function updateUserGroup(id, fields = {}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
  
    if (setString.length === 0) {
      return;
    }
  
    try {
      const {
        rows: [user_group],
      } = await client.query(
        `
              UPDATE user_group
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
              `,
        Object.values(fields)
      );
  
      return user_group;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getAllUserGroup() {
    const { rows } = await client.query(`
          SELECT *
          FROM user_group;
          `);
  
    return rows;
  }

  module.exports = {
  getUserGroupById,
  createUG,
  updateUserGroup,
  getAllUserGroup,
    };