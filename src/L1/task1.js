const { stdin, stdout } = require("node:process");
const Transform = require("stream").Transform;

var revert = new Transform({
  decodeStrings: false,
});

revert._transform = function (chunk, encoding, done) {
  done(null, chunk.toString().split("").reverse().join("").concat("\n"));
};

const task_1 = () => {
  stdin.pipe(revert).pipe(stdout);
};

module.exports = { task_1 };
