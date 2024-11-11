// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Obtient le contrat à déployer
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy();

  // Attendre la finalisation du déploiement
  await tracking.waitForDeployment();

  // Affiche l'adresse du contrat déployé
  console.log("Tracking contract deployed to:", tracking.target);
}

// Gérer les erreurs
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
