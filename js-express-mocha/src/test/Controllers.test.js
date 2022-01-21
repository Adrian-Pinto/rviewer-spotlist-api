import { readFileSync } from 'fs';
import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../config/lowdbConfig.js';

chai.use(chaiHttp);

db.data = JSON.parse(readFileSync(new URL('./test.db/testDb.json', import.meta.url)));

// todo - Check if utils pass coverage with these tests

describe('Testing endpoints', () => {
  describe('Given: A User call API with incorrect auth', () => {
    it('When: User call end point with unexisting UserId', {
      // Then: Return  status code 401
      //   -: Return 'User not found with this id'
    });
    it('When: User call end point with empty headers.autherization', () => {
      // Then: Return  status code 400
      //    -: Return 'Invalid parameters'
    });
    it('When: User call end point with existing UserId', () => {
      it('But: Incorrect password', () => {
        // Then: Return  status code 400
        //    -: Return 'Invalid parameters'
      });
    });
  });

  describe('Given: A User X call /lists/ end point', () => {
    it('When: GET /lists', () => {
      it('And: Use correct auth', () => {
        // Then: Return status code 200
        //    -: Return all User X Songs lists
      });
    });
    it('When: POST /lists', () => {
      it('And: User have a list with same name', () => {
        // Then: Return status 409
        //    -: Return 'The list already exists'
      });
    });
    it('When: POST /lists', () => {
      it('And: send list pass Schema validation', () => {
        // Then: Return status 200
        //    -: Return 'ok'
        //    -: Now user have a new list
        //    -: New list have a songs
      });
    });
    it('When: POST /lists', () => {
      it('And: User only send list name', () => {
        // Then: Return status 200
        //    -: Return 'ok'
        //    -: Now user have a new list
        //    -: Songs is a empty array
      });
    });
  });

  describe('Given: A User X call /lists/:listId end point', () => {
    it('When: GET /lists/:listId', () => {
      it('And: /:listId exist', () => {
        // Then: Return status 200
        //    -: Return songs list JSON
      });
    });
    it('When: GET /lists/:listId', () => {
      it('And: /:listId not exist', () => {
        // Then: Return status 401
      });
    });
  });

  describe('Given: A User X call songs end point', () => {
    it('When: POST /lists/:listId/songs', () => {
      it('And: /:listId not exist', () => {
        // Then: Response status 409
        //    -: Response 'User does not have this list'
      });
    });
    it('When: POST /lists/:listId/songs', () => {
      it('And: Songs dont pass Schema validation', {
        // Then: Response status 409
        //    -: Response 'User does not have this list'
      });
    });
    it('When: POST /lists/:listId/songs', () => {
      it('And: songs is in songs Database collection', () => {
        it('And: songs is in songs User list', () => {
          // Then: Response status 200
          //    -: Response 'ok'
          //    -: Database collection dont change
          //    -: User.list array dont change
        });
      });
    });
    it('When: POST /lists/:listId/songs', () => {
      it('And: songs is in songs Database collection', () => {
        it('And: songs is not in songs User list', () => {
          // Then: Response status 200
          //    -: Response 'ok'
          //    -: Database collection dont change
          //    -: User.list array increase in number of songs send
        });
      });
    });
    it('When: POST /lists/:listId/songs', () => {
      it('And: songs is not in songs Database collection', () => {
        // Then: Response status 200
        //    -: Response 'ok'
        //    -: User.list array increase in number of songs send
        //    -: Database collection increase in number of songs send
      });
    });
  });
});

describe('chaiHttp', () => {
  it('On use', (done) => {
    chai.request('localhost:3001')
      .get('/api/v1/users/4804ca-a41271d2c29d-7748e5/lists')
      .auth('user', 'unsecuredpassword1234')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
