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
        {
          type: 'object',
          properties: {
            artist: {
              type: 'string',
              minLength: 1,
            },
            title: {
              type: 'string',
              minLength: 1,
            },
          },
          required: [
            'artist',
            'title',
          ],
        },
      ],
      minContains: 1,
    },
  },
  required: [
    'listId',
  ],
};

export default ajv.compile(schema);
