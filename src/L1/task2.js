const fs = require("node:fs");
const csv = require("csvtojson");

const txtFolderSrc = __dirname + "/txt";
const csvFilePath = "./cvs/nodejs-hw1-ex1.csv";
const txtFilePath = txtFolderSrc + "/result.txt";

const task_2 = () => {
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

module.exports = { task_2 };
