import pool from "../../config";

const dropTable = `
DROP TABLE IF EXISTS users CASCADE;

`;

const dropDatabase = async () => {
  await pool.query(dropTable).then(() => {
    console.log("users Table successfully removed from Database");
  });
};

dropDatabase();
