const express = require("express");
const { body, validationResult } = require("express-validator");

const {validate_operation_type, perform_operation} = require ('./utils')
const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post(
  "/",
  body("operation_type").custom(validate_operation_type),
  body("x").isDecimal(),
  body("y").isDecimal(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    operation_type = req.body["operation_type"];
    x = req.body["x"];
    y = req.body["y"];
    const result = perform_operation(operation_type, x, y);

    const response = {
      slackUsername: "lewiclancy",
      result,
      operation_type,
    };

    return res.status(200).json(response);
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
