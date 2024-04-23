const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const todoSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 256},
    description: { type: "string" },
    userId: { type: "string" },
  },
  required: ["title", "description", "userId"],
  additionalProperties: false,
};
const userSchema = {
  type: "object",
  properties: {
    email: { type:"string", format: "email"},
    password: { type:"string", minLength: 6}
  }, 
  required:['email', 'password'],
  additionalProperties: false
}
const todoUpdateSchema = {
    properties: {
        title: { type: "string", maxLength: 256},
        description: { type: "string" },
        userId: { type: "string" },
      },
      additionalProperties: false, 
}
function validateData(schema, data) {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw new Error('AJV Validation failed:' + ajv.errorsText(validate.errors))  }

  return valid;
}
module.exports = {
    todoSchema,
    userSchema,
    todoUpdateSchema,
    validateData,
}