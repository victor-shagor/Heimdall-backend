import pool from "../../config";

export const credit = (req, res) => {
  pool.query(
    `UPDATE users SET walletbalance = TRUNC(random() * 1000000 + 1)`,
    (error, results) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong, try again later",
        });
      }
      return res.status(200).send({
        success: true,
        message: "All accounts credited successfully",
      });
    }
  );
};

export const debit = (req, res) => {
  pool.query(
    `UPDATE users SET walletbalance = walletbalance - TRUNC(random() * 1000000 + 1)`,
    (error, results) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong, try again later",
        });
      }
      res.status(200).send({
        success: true,
        message: "All accounts debited successfully",
      });
    }
  );
};

export const filter = (req, res) => {
  const { name, balance } = req.body;
  if (!name && !balance) {
    return res.status(400).send({
      success: false,
      message: "kindly provide name or balance to filter",
    });
  } else if (name && balance) {
    pool.query(
      `SELECT * FROM users WHERE name=$1 AND walletbalance <= $2 ORDER BY name DESC`,
      [name, balance],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: "Something went wrong, try again later",
          });
        }
        return res.status(200).send({
          success: true,
          data: results.rows,
        });
      }
    );
  } else if (name && !balance) {
    pool.query(
      `SELECT * FROM users WHERE name=$1 ORDER BY name DESC`,
      [name],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: "Something went wrong, try again later",
          });
        }
        return res.status(200).send({
          success: true,
          data: results.rows,
        });
      }
    );
  } else if (!name && balance) {
    pool.query(
      `SELECT * FROM users WHERE walletbalance <= $1 ORDER BY walletbalance DESC`,
      [balance],
      (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: "Something went wrong, try again later",
          });
        }
        return res.status(200).send({
          success: true,
          data: results.rows,
        });
      }
    );
  }
};

const isValidNumber = (number) => {
  return /^\d+$/.test(number);
};

export const withdrawal = (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;
  if (!isValidNumber(id) || !isValidNumber(amount)) {
    return res.status(400).send({
      success: false,
      message: `kindly provide a valid id and amount`,
    });
  }
  pool.query(
    `SELECT id, walletbalance from users WHERE id=$1`,
    [parseInt(id)],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong, try again later",
        });
      }
      if (!result.rows[0]) {
        return res.status(404).send({
          success: false,
          message: `Account with id:${id} not found`,
        });
      }
      if (result.rows[0].walletbalance < amount) {
        return res.status(400).send({
          success: false,
          message: `insufficient balance`,
        });
      }

      pool.query(
        `UPDATE users SET walletbalance = walletbalance - $1 WHERE id=$2 returning *`,
        [+amount, id],
        (error, results) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: "Something went wrong, try again later",
            });
          }
          res.status(200).send({
            success: true,
            message: "Withdrawal successful",
            data: results.rows[0],
          });
        }
      );
    }
  );
};

export const newUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      success: false,
      message: "Kindly provide name or email",
    });
  }
  pool.query(
    `INSERT into users (name, walletbalance) VALUES ($1, $2)`,
    [name, 0.0],
    (error, results) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Something went wrong, try again later",
        });
      }
      res.status(201).send({
        success: true,
        message: "user created successfully",
      });
    }
  );
};
