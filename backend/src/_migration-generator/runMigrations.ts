const fs = require('fs');
import path from 'path';
const dir = path.resolve('migrations/elasticsearch/');
const files: string[] = fs.readdirSync(dir); // reading files from folders
const UP = 'up';
const ROLLBACK = 'rollback';
const arg = process.argv.slice(2)[0];
if (!arg) {
  throw new Error('provide argument either up or rollback');
}

if (arg == UP) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    import(`${dir}/${file}`).then((val) => {
      val.up();
    });
  }
}
if (arg == ROLLBACK) {
  for (let i = files.length - 1; i >= 0; i--) {
    const file = files[i];
    import(`${dir}/${file}`).then((val) => {
      val.down();
    });
  }
}
