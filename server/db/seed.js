require("dotenv").config();

const {
  client,
  getAllEvents,
  getAllUsers,
  createUser,
  createEvent,
  getAllGroup,
  createGroup,
  createUG,
  getAllUserGroup,
  getAllInvitations,
  createInvitations,
  getAllComments,
  createComment,
} = require("./index");

// async function dropType() {

//   try {
//     console.log("Starting to drop types...");

//     await client.query(`
//   DROP TYPE IF EXISTS s_status cascade;

//   `);

// } catch (error) {
//   console.error(error);
//   throw error;
// }
// }

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS comment ;
  `);

    //   await client.query(`
    //   DROP TABLE IF EXISTS invitations ;
    // `);

    await client.query(`
  DROP TABLE IF EXISTS user_group;
`);

    await client.query(`
    DROP TABLE IF EXISTS event cascade;
  `);

    await client.query(`
  DROP TABLE IF EXISTS groups cascade;
`);

    await client.query(`
    DROP TABLE IF EXISTS users cascade;
  `);

    console.log("Done dropping tables...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function createTypes() {
//   try{
//     await client.query(`
//     CREATE TYPE s_status AS ENUM ('pending', 'open', 'accepted', 'rejected');

//   `)
//   console.log("Done making types...");
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
//   }

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL
      
      );
  `);

    await client.query(`
  CREATE TABLE groups(
    id SERIAL PRIMARY KEY,
    "user_id" integer REFERENCES users(id),
    group_name varchar(255) NOT NULL UNIQUE,
    description varchar(500) NOT NULL


    );
  `);

    await client.query(`
  CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    "user_id" integer REFERENCES users(id),
    "group_id" integer REFERENCES groups(id),
    title character varying(255) NOT NULL,
    description text NOT NULL,
    iscomfirmed boolean DEFAULT false,
    date text NOT NULL,
    time text NOT NULL,
    location text NOT NULL
    
);
`);

    await client.query(`
CREATE TABLE user_group ( 
  "user_id" integer References users(id),
  "group_id" integer REFERENCES groups(id)


);

`);

    //   await client.query(`
    //   CREATE TABLE invitations (
    //     "group_id" integer REFERENCES groups(id),
    //     "inviter_id" integer REFERENCES users(id),
    //     "invitee_id" integer REFERENCES users(id)

    // );

    //   `);

    await client.query(`
    CREATE TABLE comment (
      id SERIAL PRIMARY KEY,
      message text NOT NULL,
      "user_id" integer REFERENCES users(id),
      "event_id" integer REFERENCES event(event_id)
      

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
      name: "Patty",
      username: "o2boy",
      password: "pretty59",
      email: "o2boyo2@aol.com",
    });

    await createUser({
      name: "Pat",
      username: "trac",
      password: "music64",
      email: "trachkid@aol.com",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createExampleGroup() {
  try {
    await createGroup({
      group_name: "PV party planners",
      user_id: 1,
    });

    await createGroup({
      group_name: "PV ROCK PEOPLE",
      user_id: 1,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function createExampleEvent() {
  try {
    await createEvent({
      user_id: 1,
      group_id: 1,
      title: "P.V.s Grad",
      description: "Party for P.v. grad from FullStack",
      isComfirmed: false,
      date: "07-25-2020",
      time: "11:00:00",
      location: "My House",
    });

    await createEvent({
      user_id: 2,
      group_id: 2,
      title: "Thank YOU",
      description: "Party for P.v. grad from FullStack",
      isComfirmed: false,
      date: "07-25-2020",
      time: "11:00:00",
      location: "My House",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createExampleUserGroup() {
  try {
    await createUG({
      user_id: 1,
      group_id: 1,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createExampleInvitations() {
  try {
    await createInvitations({
      group_id: 1,
      inviter_id: 1,
      invitee_id: 1,
      status: "pending",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createUserComments() {
  try {
    await createComment({
      message: "Does everyone agree with this time?",
      user_id: 1,
      event_id: 1,
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
      // await dropType();
      await dropTables();
    }
    // await createTypes();
    await createTables();
    // await createInitialUsers();
    // await createExampleGroup();
    // await createExampleEvent();
    // await createExampleUserGroup();
    // await createExampleInvitations();
    // await createUserComments();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const create_users = await getAllUsers();
    console.log("getAllUsers result:", create_users);

    const create_event = await getAllEvents();
    console.log("EVENTS:", create_event);

    const create_group = await getAllGroup();
    console.log("GROUPS: ", create_group);

    const create_usergg = await getAllUserGroup();
    console.log("User's Group", create_usergg);

    const create_invites = await getAllInvitations();
    console.log("Invites", create_invites);

    const create_comments = await getAllComments();
    console.log("COMMENTS", create_comments);

    console.log("Done testing database...");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

rebuildDB();
// .then(testDB);
