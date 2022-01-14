import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
    },
    password: { type: 'string' },
  },
  required: [
    'name',
    'password',
  ],
};

export default ajv.compile(schema);
