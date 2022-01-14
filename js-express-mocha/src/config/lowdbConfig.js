import { LowSync, JSONFileSync } from 'lowdb';

const db = new LowSync(new JSONFileSync('./database/db.json'));

db.read();
db.data ||= {
  users: [],
  lists: [],
  sogns: [],
};
db.write();

export default db;
