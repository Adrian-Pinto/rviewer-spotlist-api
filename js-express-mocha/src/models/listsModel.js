import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    listId: {
      type: 'string',
    },
    sogns: {
      type: 'array',
      contains: [
        { type: 'object' },
      ],
      minContains: 1,
    },
  },
  required: [
    'listId',
  ],
};

export default ajv.compile(schema);
