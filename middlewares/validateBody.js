const { HttpError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, `Помилка від Joi або іншої бібліотеки валідації: ${error.message}`));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
