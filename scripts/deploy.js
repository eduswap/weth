const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    weth = await ethers.deployContract("WETH", [], {});
    await weth.waitForDeployment();

    console.log("WETH contract deployed to:", await weth.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// Deploying contracts with the account: 0x9E18268FA21a3612309211cbE186eA1B81469d96
// WETH contract deployed to: 0xbd51800607E7C743a0e9b0D89D837058F4f42756