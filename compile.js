const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// console.log("Input: ", input, "\n", "Output: ", output);

// ABI - Application Binary Interface
// bytecode - The contract
exports.abi = output.contracts["Inbox.sol"]["Inbox"].abi;
exports.bytecode = output.contracts["Inbox.sol"]["Inbox"].evm.bytecode.object;
