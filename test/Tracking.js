const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tracking Contract", function () {
  let contract;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get the list of signers from Hardhat
    [owner, addr1, addr2] = await ethers.getSigners();

    // Get the contract factory
    const Tracking = await ethers.getContractFactory("Tracking");

    // Deploy the contract
    contract = await Tracking.deploy();

    // Ensure contract was deployed successfully
    expect(contract.address).to.be.properAddress;
  });

  it("should create a shipment", async function () {
    const receiver = addr1.address;
    const pickupTime = 1636130400;
    const distance = 100;
    const price = ethers.utils.parseEther("1.0");

    // Call createShipment function
    await contract.createShipment(receiver, pickupTime, distance, price, { value: price });

    // Check the total number of shipments for the owner
    const shipmentsCount = await contract.getShipmentsCount(owner.address);
    expect(shipmentsCount).to.equal(1);

    // Verify the shipment is added to the typeShipments array
    const shipments = await contract.getAllTransactions();
    expect(shipments.length).to.equal(1);
    expect(shipments[0].sender).to.equal(owner.address);
    expect(shipments[0].receiver).to.equal(receiver);
  });

  it("should start the shipment", async function () {
    const receiver = addr1.address;
    const pickupTime = 1636130400;
    const distance = 100;
    const price = ethers.utils.parseEther("1.0");

    // Create shipment
    await contract.createShipment(receiver, pickupTime, distance, price, { value: price });

    // Start the shipment
    await contract.startShipment(owner.address, receiver, 0);

    const shipments = await contract.getAllTransactions();
    expect(shipments[0].status).to.equal(1); // IN_TRANSIT
  });

  it("should complete the shipment", async function () {
    const receiver = addr1.address;
    const pickupTime = 1636130400;
    const distance = 100;
    const price = ethers.utils.parseEther("1.0");

    // Create shipment
    await contract.createShipment(receiver, pickupTime, distance, price, { value: price });

    // Start and complete the shipment
    await contract.startShipment(owner.address, receiver, 0);
    await contract.completeShipment(owner.address, receiver, 0);

    const shipments = await contract.getAllTransactions();
    expect(shipments[0].status).to.equal(2); // DELIVERED
  });
});
