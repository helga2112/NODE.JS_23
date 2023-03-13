import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

var revert = new Transform({
  decodeStrings: false,
});

revert._transform = function (chunk, encoding, done) {
  done(null, chunk.toString().split("").reverse().join("").concat("\n"));
};

function task1() {
  stdin.pipe(revert).pipe(stdout);
}

export default task1;
