const Ajv = require("ajv");

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
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.log(validate.errors);
  }

  return valid;
}
module.exports = {
    todoSchema,
    todoUpdateSchema,
    validateData,
}