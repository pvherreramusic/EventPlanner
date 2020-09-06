const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { client } = require("./client");

const promisifiedHash = (password) => new Promise(
  (resolve, reject) => {
    bcrypt.hash(password, 10, (error, hash) => {
        if (error)
          reject(error);
        else
          resolve(hash);
    });
  }
);

const promisifiedSign = (id) => new Promise(
  (resolve, reject) => {
    jwt.sign({ id }, process.env.SECRET, (error, token) => {
      if (error)
        reject(error);
      else
        resolve(token);
    });
  }
);

const promisifiedVerify = (token) => new Promise(
  (resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error)
        reject(error);
      else
        resolve(decoded);
    });
  }
);

async function createUser({name, username, password, email}) {
  const hashedPassword = await promisifiedHash(password);

  const {
    rows: [user],
  } = await client.query(
    `
      INSERT INTO users (name, username, password, email )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `,
    [name, username, hashedPassword, email]
  );

  if (!user) {
    throw new Error("Server error: Failed to create the user.");
  }

  // create a token for the new user
  const token = await promisifiedSign(user.id);

  return [user, token];
}

async function getAllUsers() {
  const { rows } = await client.query(`
        SELECT *
        FROM users;
        
        `);

  return rows;
}



async function getUserByUserId(id) {
    try {
      const {
        rows
      } = await client.query(
        `
              SELECT name
              FROM users
              WHERE id= $1
  
  
              
          `,
          [id]
      );
  
      
  
      return rows;
    } catch (error) {
      throw error;
    }
  }


  async function getUserByGroupId(id) {
    try {
      const {
        rows
      } = await client.query(
        `
        SELECT
        users.id,
        groups.id
        groups.user_id
     FROM
         users
     INNER JOIN groups ON (users.id = groups.user_id)
     
     GROUP BY
     users.id,
     groups.id,
     groups.user_id
     HAVING
     users.id= $1
  
  
              
          `,
          [id]
      );
  
      
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function doesUserExist(username = "", email = "") {
  if (!username && !email) {
    throw new Error("You must provide username or email.");
  }

  if (username && username.length) {
      const usernameQuery = await client.query(`
        SELECT id FROM users
        WHERE username = $1;
      `, [username]);

    if (usernameQuery.rows.length > 0) {
      return [true, "username"];
    }
  }

  if (email && email.length) {
    const emailQuery = await client.query(`
      SELECT id FROM users
      WHERE email = $1;
    `, [email]);

    if (emailQuery.rows.length > 0) {
      return [true, "email"];
    }
  }

  return [false, ""];
}

const login = async (email = "", password = "") => {
  if (!email || !password) {
    return [null, ""];
  }

  const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE email = $1;
  `, [email]);

 ;

  if (!(await bcrypt.compare(password, user.password)))
    return [null, ""];

  return [
    user,
    await promisifiedSign(user.id)
  ];
};

const loginWithToken = async (token = "") => {
  if (!token) {
    return null;
  }

  const { id } = await promisifiedVerify(token);

  return getUserById(id);
};




module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  doesUserExist,
  login,
  loginWithToken,
  promisifiedVerify,
  getUserByUserId
};