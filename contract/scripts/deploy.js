const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const treasury = deployer.address; // Use deployer as treasury for demo

  const VoteSmarter = await hre.ethers.getContractFactory("VoteSmarter");
  const contract = await VoteSmarter.deploy(treasury);

  await contract.waitForDeployment();

  console.log("VoteSmarter deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
