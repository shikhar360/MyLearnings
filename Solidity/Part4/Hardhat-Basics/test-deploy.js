const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage function", function () {
    let simpleStoragefactory, simpleStorage
    beforeEach(async function () {
        // runs async function before each testing
        simpleStoragefactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStoragefactory.deploy()
    })
    // it() takes two arguments string and async function

    it("Should start with a fav number 0", async function () {
        const fav = await simpleStorage.retrieve()
        const expectedfav = 0

        assert.equal(fav.toString(), expectedfav) // it is like checker ,, checking the value

        // expect(fav.toString()).to.equal(expectedFav)           // both do same things
    })

    it("Should update when we call store", async function () {
        const expectedStore = 69
        const stored = await simpleStorage.store(expectedStore)
        await stored.wait(1)

        const current = await simpleStorage.retrieve()
        assert.equal(current.toString(), expectedStore)
    })
})

// in terminal you have to write `` yarn hardhat test ``
// if you  write `` yarn hardhat test --grep store `` it will search  all the it(s) message and if finds store keyword thenit will run only that (it)
// alternatively you can add .only keyword to only run the needed it like
// `` it.only('message' , asunc function(){})
