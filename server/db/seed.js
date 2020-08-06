require("dotenv").config();

const {
  client,

  getAllUsers,
  createUser,
  getUserInfo,

} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      
      DROP TABLE IF EXISTS users;
    `);

    console.log("Done dropping tables...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title varchar(255) UNIQUE NOT NULL,
      description text NOT NULL,
      owner_Id NOT NULL, 

      );
    `);

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(255) UNIQUE NOT NULL
        );
    `);

   

    console.log("Done building tables...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialUsers() {
  try {
    await createUser({
      name: "Patty B",
      username: "o2boy",
      password: "pretty59",
      email: "o2boyo2@aol.com",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function rebuildDB(force = true) {
  try {
    client.connect();

    if (force) {
      await dropTables();
    }

    await createTables();
    await createInitialUsers();

  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

   

    const users = await getAllUsers();
    console.log("getAllUsers result:", users);

    

    console.log("Done testing database...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

rebuildDB().then(testDB);
