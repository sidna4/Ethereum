const assert = require("assert");
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: ['Hi there!] })
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  // Run a test and make an assertion
  it("deploys a contract", () => {
    // console.log(inbox);
    // assert.strictEqual(car.park(), "stopped");
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    // Calls the "message" method in the Inbox
    const message = await inbox.methods.message().call();

    assert.strictEqual(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("New Message").send({ from: accounts[0] });

    const message = await inbox.methods.message().call();

    assert.strictEqual(message, "New Message");
  });
});
