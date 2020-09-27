const { client } = require("./client");


async function getUserGroupById(userid) {
    try {
      const {
        rows
      } = await client.query(
        `
        SELECT
      groups.group_name,
        groups.id,
        groups.user_id,
        user_group.group_id,
        user_group.user_id
     FROM
         user_group
     INNER JOIN groups ON (groups.id = user_group.group_id)
    
     GROUP BY
     groups.group_name,
        groups.id,
        groups.user_id,
        user_group.group_id,
        user_group.user_id
        
        HAVING 
        user_group.user_id = $1


              `,
        [userid]
      );

  
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function createUG({group_id, user_id}) {
    try {
      const {
        rows 
      } = await client.query(
        `
        INSERT INTO user_group (group_id ,user_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [group_id, user_id]
      );
  
      return rows;
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



  module.exports = {
  getUserGroupById,
  createUG,
  updateUserGroup
  
    };