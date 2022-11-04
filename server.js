const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

function validate_operation_type(operation_type) {
  const valid_operations = ["addition", "subtraction", "multiplication"];
  operation_type = operation_type.toLowerCase();
  return valid_operations.includes(operation_type);
}

function perform_operation(operation_type, x, y) {
  let result;

  switch (operation_type) {
    case "addition":
      result = x + y;
      break;
    case "subtraction":
      result = x - y;
      break;
    case "multiplication":
      result = x * y;
      break;
  }

  return result;
}

app.post(
  "/",
  body("operation_type").custom((value) => {
    is_valid = validate_operation_type(value);
    if (!is_valid) {
      return Promise.reject(
        "Enter a valid operation_type. Valid values are 'addition', 'subtraction', 'multiplication'"
      );
    }
    return is_valid;
  }),
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
