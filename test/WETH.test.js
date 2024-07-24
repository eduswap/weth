const { expect } = require("chai");

describe("WETH contract", function () {
    let weth;
    let owner;

    beforeEach(async function () {
        const WETH = await ethers.getContractFactory("WETH");
        [owner] = await ethers.getSigners();
        weth = await WETH.deploy();
    });

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await weth.balanceOf(owner.address);
            expect(await weth.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should deposit correctly", async function () {
            await weth.deposit({ value: ethers.parseEther("1.0") });
            expect(await weth.balanceOf(owner.address)).to.equal(ethers.parseEther("1.0"));
        });

        it("Should withdraw correctly", async function () {
            await weth.deposit({ value: ethers.parseEther("1.0") });
            await weth.withdraw(ethers.parseEther("1.0"));
            expect(await weth.balanceOf(owner.address)).to.equal(ethers.parseEther("0.0"));
        });
    });
});