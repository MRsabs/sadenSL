import levelup from 'levelup';
import leveldown from 'leveldown';
import * as Path from 'path';

// eslint-disable-next-line no-unused-vars
const db = levelup(leveldown(Path.join(process.cwd(), 'levelDB')));

// eslint-disable-next-line func-names
// (async function () {
//   await db.put('test', 'ahmed');
//   const data = await db.get('test');
//   console.log(data);
// })();
