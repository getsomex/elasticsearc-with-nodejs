import fs from 'fs';
const userInputFileName = process.argv.slice(2)[0];
if (!userInputFileName) {
  throw new Error('Please specify file name');
}
const dir = './migrations/elasticsearch';
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; //months from 1-12
const day = date.getDate();
const hour = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const miliSeconds = date.getMilliseconds();
const timeStamp = `${year}${month}${day}${hour}${minutes}${seconds}${miliSeconds}`;

const migrationDefaultText = `/**
* Create Elasticsearch migration files😀
*/
import esClient from '../../src/connections/elasticsearch';
// create
esClient.indices.create();
// rollback
esClient.indices.delete();
`;

if (!fs.existsSync(dir)) {
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (!err) {
      fs.writeFile(
        `${dir}/${timeStamp}-${userInputFileName}.ts`,
        migrationDefaultText,
        (err) => {
          console.log(err);
        }
      );
    }
  });
} else
  [
    fs.writeFile(
      `${dir}/${timeStamp}-${userInputFileName}.ts`,
      migrationDefaultText,
      (err) => {
        console.log(err);
      }
    ),
  ];
