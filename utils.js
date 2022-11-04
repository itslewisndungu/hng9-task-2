const valid_operations = ["addition", "subtraction", "multiplication"];

exports.validate_operation_type = (operation_type) => {
  operation_type = operation_type.toLowerCase();
  const is_valid = valid_operations.includes(operation_type);

  if (!is_valid) {
    return Promise.reject(
      "Enter a valid operation_type. Valid values are 'addition', 'subtraction', 'multiplication'"
    );
  }

  return Promise.resolve(is_valid);
};

exports.perform_operation = (operation_type, x, y) => {
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
};
