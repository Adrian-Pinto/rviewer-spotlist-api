import { readFileSync } from 'fs';
import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import generateId from '../utils/generateId.js';
import db from '../config/lowdbConfig.js';

chai.use(chaiHttp);

db.data = JSON.parse(readFileSync(new URL('./test.db/testDb.json', import.meta.url)));

describe('Testing endpoints', () => {
  const host = 'localhost:3001';
  const jhonSmithPATH = '/api/v1/users/4804ca-a41271d2c29d-7748e5/lists';
  const existingListId = '/5d4968-802cf683af23-ad1c67/';
  const secondListId = '/aa0b1f-3f0a79b53fa3-54e8a8/';
  const unexistingListId = '/000000-111111111111-000000/';

  describe('Given: A User call API with incorrect auth', () => {
    const notJhonPATH = '/api/v1/users/000000-111111111111-000000/lists';

    describe('When: User call end point with unexisting UserId', () => {
      it(`Then: Return status code 401
             -: Return 'User not found with this id (or user is not the one authenticated)'`, (done) => {
        chai.request(host)
          .get(notJhonPATH)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .end((err, res) => {
            expect(res)
              .to.have.status(401)
              .to.have.property('text').to.be.equal('User not found with this id (or user is not the one authenticated)');
            done();
          });
      });
    });
    describe('When: User call end point with empty headers.authorization', () => {
      it(`Then: Return status code 400
             -: Return 'Invalid parameters'`, (done) => {
        chai.request(host)
          .get(jhonSmithPATH)
          .end((err, res) => {
            expect(res)
              .to.have.status(400)
              .to.have.property('text').to.be.equal('Invalid parameters');
            done();
          });
      });
    });
    describe(`When: User call end point with existing UserId
      But: Incorrect password send`, () => {
      it(`Then: Return status code 400
             -: Return 'Invalid password'`, (done) => {
        chai.request(host)
          .get(jhonSmithPATH)
          .auth('Jhon Smith', 'incorrect')
          .end((err, res) => {
            expect(res)
              .to.have.status(400)
              .to.have.property('text').to.be.equal('Invalid password');
            done();
          });
      });
    });
  });

  describe('Given: A User Jhon Smith call /lists/ end point', () => {
    describe(`When: GET /lists
      And: Use correct auth`, () => {
      it(`Then: Return status code 200
             -: Return all User Jhon Smith Songs lists`, (done) => {
        chai.request(host)
          .get(jhonSmithPATH)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .end((err, res) => {
            expect(res)
              .to.have.status(200)
              .to.have.property('body').to.have.property('lists');
            done();
          });
      });
    });

    describe(`When: POST /lists
      And: User have a list with same name`, () => {
      it(`Then: Return status 409
             -: Return 'The list already exists'`, (done) => {
        chai.request(host)
          .post(jhonSmithPATH)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({ name: 'test_list' })
          .end((err, res) => {
            expect(res)
              .to.have.status(409)
              .to.have.property('text').to.be.equal('the list already exists');
            done();
          });
      });
    });

    describe(`When: POST /lists
      And: send a list pass Schema validation`, () => {
      it(`Then: Return status 200
             -: Now user have a new list
             -: New list have a songs`, (done) => {
        chai.request(host)
          .post(jhonSmithPATH)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            name: generateId(),
            songs: [
              {
                artist: 'Kyary Pamyu Pamyu',
                title: 'PONPONPON',
              },
            ],
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(200);
            expect(db.data.users[0].lists.length)
              .to.be.equal(3);
            expect(res.body.songs.length)
              .to.be.above(0);
            done();
          });
      });
    });

    describe(`When: POST /lists
      And: User only send list name`, () => {
      it(`Then: Return status 200
             -: Now user have a new list
             -: Songs is a empty array`, (done) => {
        chai.request(host)
          .post(jhonSmithPATH)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            name: generateId(),
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(200);
            expect(db.data.users[0].lists.length)
              .to.be.equal(4);
            expect(res.body.songs.length)
              .to.equal(0);
            done();
          });
      });
    });
  });

  describe('Given: A User Jhon Smith call /lists/:listId end point', () => {
    describe(`When: GET /lists/:listId
      And: /:listId exist`, () => {
      it(`Then: Return status 200
             -: Return songs list JSON`, (done) => {
        chai.request(host)
          .get(jhonSmithPATH + existingListId)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .end((err, res) => {
            expect(res)
              .to.have.status(200)
              .to.have.property('body').to.have.property('songs');
            done();
          });
      });
    });
    describe(`When: GET /lists/:listId
      And: /:listId not exist`, () => {
      it('Then: Return status 401', (done) => {
        chai.request(host)
          .get(jhonSmithPATH + unexistingListId)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .end((err, res) => {
            expect(res)
              .to.have.status(401);
            done();
          });
      });
    });
  });

  describe('Given: A User Jhon Smith call songs end point', () => {
    describe(`When: POST /lists/:listId/songs
      And: /:listId not exist`, () => {
      it(`Then: Response status 409
             -: Response 'user does not have this list'`, (done) => {
        chai.request(host)
          .post(`${jhonSmithPATH + unexistingListId}songs`)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            artist: 'Kyary Pamyu Pamyu',
            title: 'PONPONPON',
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(409)
              .to.have.property('text').to.be.equal('user does not have this list');
            done();
          });
      });
    });
    describe(`When: POST /lists/:listId/songs
      And: Songs dont pass Schema validation`, () => {
      it(`Then: Response status 409
             -: Response 'User does not have this list'`, (done) => {
        chai.request(host)
          .post(`${jhonSmithPATH + existingListId}songs`)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            artist: 'Kyary Pamyu Pamyu',
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(409)
              .to.have.property('text').to.be.equal('user does not have this list');
            done();
          });
      });
    });
    describe(`When: POST /lists/:listId/songs
      And: songs is in songs Database collection
      And: songs is in songs User list`, () => {
      it(`Then: Response status 200
             -: Response 'ok'
             -: Songs database collection dont change
             -: User.list array dont change`, (done) => {
        chai.request(host)
          .post(`${jhonSmithPATH + existingListId}songs`)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            artist: 'Kyary Pamyu Pamyu',
            title: 'PONPONPON',
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(200)
              .to.have.property('text').to.be.equal('OK');
            expect(db.data.lists[0].songs.length).to.equal(2);
            expect(db.data.songs.length).to.equal(2);
            done();
          });
      });
    });
    describe(`When: POST /lists/:listId/songs
      And: songs is in songs Database collection
      And: songs is not in songs User list`, () => {
      it(`Then: Response status 200
             -: Response 'ok'
             -: Songs database collection dont change
             -: User.list array increase in number of songs send`, (done) => {
        chai.request(host)
          .post(`${jhonSmithPATH + secondListId}songs`)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            artist: 'Kyary Pamyu Pamyu',
            title: 'PONPONPON',
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(200)
              .to.have.property('text').to.be.equal('OK');
            expect(db.data.lists[1].songs.length).to.equal(2);
            expect(db.data.songs.length).to.equal(2);
            done();
          });
      });
    });
    describe(`When: POST /lists/:listId/songs
      And: songs is not in songs Database collection`, () => {
      it(`Then: Response status 200
             -: Response 'ok'
             -: User.list array increase in number of songs send
             -: Database collection increase in number of songs send`, (done) => {
        chai.request(host)
          .post(`${jhonSmithPATH + existingListId}songs`)
          .auth('Jhon Smith', 'unsecuredpassword1234')
          .send({
            artist: 'Raven’s Jig',
            title: 'Petit Chat Clandestin',
          })
          .end((err, res) => {
            expect(res)
              .to.have.status(200)
              .to.have.property('text').to.be.equal('OK');
            expect(db.data.lists[0].songs.length).to.equal(3);
            expect(db.data.songs.length).to.equal(3);
            done();
          });
      });
    });
  });
});
