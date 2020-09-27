const { client } = require("./client");

async function createGroup({group_name, user_id, description}) {
  try {
    const {
      rows: [group]
    } = await client.query(
      `
      INSERT INTO groups (group_name ,user_id ,description)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [group_name, user_id, description]
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

////api/groups/selectedgroup/${groupid}`
async function getSelectedGroup(groupid) {
  try {
    const {
      rows
    } = await client.query(
      `
      SELECT
      groups.id, groups.group_name, groups.description
            
            
        FROM
           groups
       
        GROUP BY 
        groups.id, groups.group_name, groups.description
      
      HAVING 
      groups.id = $1
    `,
      [groupid]
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
    
      groups.user_id,
      groups.group_name
   FROM
       groups
   
   
   GROUP BY
      groups.user_id,
      groups.group_name
      
      HAVING  groups.user_id = $1
    
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
updateGroup,
getSelectedGroup
};

