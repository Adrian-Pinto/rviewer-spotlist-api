import { LowSync, JSONFileSync, MemorySync } from 'lowdb';

const isTestEnv = !!process.argv.find((argv) => argv === '--NODE_ENV=test')?.split('=')[1];

const db = isTestEnv
  ? new LowSync(new MemorySync())
  : new LowSync(new JSONFileSync('./database/db.json'));

db.read();
db.data ||= {
  users: [],
  lists: [],
  songs: [],
};
db.write();

export default db;
