import pool from "../../config";

const createTables = `
  CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   name VARCHAR,
   walletBalance FLOAT
  );
`;
const createDatabaseModel = async () => {
  await pool.query(createTables).then(() => {
    console.log("User model successfully created");
  });
};

createDatabaseModel();
