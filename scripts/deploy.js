const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Tracking = await hre.ethers.getContractFactory("Tracking");

  // Deploy the contract
  const tracking = await Tracking.deploy();

  // Wait for the contract to be mined
  await tracking.deployTransaction.wait();

  // Output the contract address
  console.log("Tracking contract deployed to:", tracking.address);
}

// Handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
