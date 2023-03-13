import fs from "node:fs";
import csv from "csvtojson";

const txtFolderSrc = __dirname + "/txt";
const csvFilePath = "./cvs/nodejs-hw1-ex1.csv";
const txtFilePath = txtFolderSrc + "/result.txt";

const task_3 = () => {
  if (!fs.existsSync(txtFolderSrc)) {
    fs.mkdirSync(txtFolderSrc, 0o744);
  }

  const readStream = fs.createReadStream(csvFilePath);
  const writeStream = fs.createWriteStream(txtFilePath);

  readStream.on("error", (err) => {
    console.log(err);
  });

  writeStream.on("error", (err) => {
    console.log(err);
  });

  readStream.pipe(csv()).pipe(writeStream);
};

export default task_3;
