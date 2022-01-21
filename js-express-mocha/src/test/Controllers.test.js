import { readFileSync } from 'fs';
import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../config/lowdbConfig.js';

chai.use(chaiHttp);

db.data = JSON.parse(readFileSync(new URL('./test.db/testDb.json', import.meta.url)));

// todo - Check if utils pass coverage with these tests

// Escenario: Testing end points

//   Given: A User call API with incorrect auth
//     When: User call end point with unexisting UserId
//       Then: Return  status code 401
//          -: Return 'User not found with this id'

//     When: User call end point with empty headers.autherization
//       Then: Return  status code 400
//          -: Return 'Invalid parameters'

//     When: User call end point with existing UserId
//     But: Incorrect password
//       Then: Return  status code 400
//          -: Return 'Invalid parameters'

//   Given: A User X call /lists/ end point
//     When: GET /lists
//     And: Use correct auth
//       Then: Return status code 200
//          -: Return all User X Songs lists

//     When: POST /lists
//     And: User have a list with same name
//       Then: Return status 409
//          -: Return 'The list already exists'

//     When: POST /lists
//     And: send list pass Schema validation
//       Then: Return status 200
//          -: Return 'ok'
//          -: Now user have a new list
//          -: New list have a songs

//     When: POST /lists
//     And: User only send list name
//       Then: Return status 200
//          -: Return 'ok'
//          -: Now user have a new list
//          -: Songs is a empty array

//   Given: A User X call /lists/:listId end point
//     When: GET /lists/:listId
//     And: /:listId exist
//       Then: Return status 200
//          -: Return songs list JSON
//     When: GET /lists/:listId
//     And: /:listId not exist
//       Then: Return status 401

//   Given: A User X call songs end point
//     When: POST /lists/:listId/songs
//     And: /:listId not exist
//       Then: Response status 409
//          -: Response 'User does not have this list'

//     When: POST /lists/:listId/songs
//     And: Songs dont pass Schema validation
//       Then: Response status 409
//          -: Response 'User does not have this list'

//     When: POST /lists/:listId/songs
//     And: songs is in songs Database collection
//     And: songs is in songs User list
//       Then: Response status 200
//          -: Response 'ok'
//          -: Database collection dont change
//          -: User.list array dont change

//     When: POST /lists/:listId/songs
//     And: songs is in songs Database collection
//     And: songs is not in songs User list
//       Then: Response status 200
//          -: Response 'ok'
//          -: Database collection dont change
//          -: User.list array increase in number of songs send

//     When: POST /lists/:listId/songs
//     And: songs is not in songs Database collection
//       Then: Response status 200
//          -: Response 'ok'
//          -: User.list array increase in number of songs send
//          -: Database collection increase in number of songs send
