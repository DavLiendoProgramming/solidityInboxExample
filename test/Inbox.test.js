const Web3 = require('web3')
const ganache = require('ganache-cli')
const assert = require('assert')

//Setting up a provider for web3
const web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(web3Provider)

//Getting Compiled contract
const contract  = require('../compile.js')

//Getting the abi interface and the bytecode of the contract
const abi = contract['inbox.sol'].inbox.abi
const bytecode = contract['inbox.sol'].inbox.evm.bytecode.object

let accounts;
let inbox;
const INITIAL_STRING = 'Hello World'
const FINAL_STRING = 'Bye World'

beforeEach(async () => {

    //Get accounts list provided by ganache 
    accounts = await web3.eth.getAccounts()

    //Contract instance
    inbox = await new web3.eth.Contract(abi)    
        .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
        // .estimateGas({from: accounts[0]})
        .send({ from: accounts[0], gas: '1000000'})
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_STRING)
    })
    
    it('can change the message', async () => {
        await inbox.methods.setMessage(FINAL_STRING).send({ from: accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message, FINAL_STRING)
    })
})