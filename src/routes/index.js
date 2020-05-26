import {
  credit,
  debit,
  filter,
  withdrawal,
  newUser,
} from "../controller.js/index";

const routes = (app) => {
  app.get("/api/v1/", (req, res) => {
    res.status(200).send({
      success: true,
      message: "Welcome to Backend",
    });
  });
  app.patch("/api/v1/credit", credit);
  app.patch("/api/v1/debit", debit);
  app.get("/api/v1/filter", filter);
  app.patch("/api/v1/withdraw/:id", withdrawal);
  app.post("/api/v1/user", newUser);
};

export default routes;
