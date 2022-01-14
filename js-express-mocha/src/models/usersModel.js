import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      pattern: '[a-z0-9]{6}-[a-z0-9]{12}-[a-z0-9]{6}',
    },
    name: {
      type: 'string',
      minLength: 3,
    },
    password: { type: 'string' },
  },
  required: [
    'userId',
    'name',
    'password',
  ],
};

export default ajv.compile(schema);
