// import "@babel/polyfill";
import pool from "../../config";
import faker from "faker";

const seedDatabase = async () => {
  const desiredFakeUsers = 50000;
  for (let i = 0; i < desiredFakeUsers; i++) {
    await pool
      .query(
        `INSERT INTO users (name, walletBalance) VALUES ('${faker.internet.email()}', 0.0)`
      )
      .then(() => {
        console.log("populating...");
      });
  }
};

seedDatabase();
