import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    songs: {
      type: 'array',
      items: [
        {
          type: 'object',
        },
      ],
    },
  },
  required: [
    'name',
  ],
};

export default ajv.compile(schema);
