const fs = require('fs');
const exec = require('child_process').exec;
import path from 'path';
const dir = path.resolve('migrations/elasticsearch/');
const files = fs.readdirSync(dir); // reading files from folders
const { fork } = require('child_process');

files.forEach((file: string) => {
  console.log(file);
  exec(
    `ts-node -e require(${dir}/${file}).up()`,
    (error: any, stdout: any, stderr: any) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    }
  );
});
// const funcs = files.map(function (file: string) {
//   console.log('Hello');
//   return exec.bind(null, `ts-node 'import ${scriptsFolder}${file}/up`);

//   // execute node command
// });
// function getResults(err, data) {
//   if (err) {
//     return console.log(err)
//   }
//   const results = data.map(function(lines){
//     return lines.join('') // joining each script lines
//   })
//   console.log(results)
// }

// // to run your scipts in parallel use
// async.parallel(funcs, getResults)

// // to run your scipts in series use
// async.series(funcs, getResults)
