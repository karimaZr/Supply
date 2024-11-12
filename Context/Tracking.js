import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "../Context/Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    const DappName = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async(items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;

        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, "ether"), {
                    value: ethers.utils.parseUnits(price, "ether"),
                }
            );

            await createItem.wait();
            console.log(createItem);
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    };

    const getAllShipment = async() => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            // Get all transactions
            const shipments = await contract.getAllTransactions();
            console.log(shipments);

            // Map over the shipments and format each shipment
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()), // Format price from BigNumber to string
                pickupTime: shipment.pickupTime.toNumber(), // Convert BigNumber to number
                deliveryTime: shipment.deliveryTime.toNumber(), // Convert BigNumber to number
                distance: shipment.distance.toNumber(), // Convert BigNumber to number
                isPaid: shipment.isPaid, // This is a boolean, no need to convert
                status: shipment.status, // Convert BigNumber to number
            }));
            console.log(allShipments);

            return allShipments;
        } catch (error) {
            console.error("Error retrieving shipments:", error);
        }
    };


    const getShipmentsCount = async() => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentsCount = await contract.getShipmentsCount(accounts[0]);

            return shipmentsCount.toNumber();
        } catch (error) {
            console.log("Error getting shipment count:", error);
        }
    };

    const completeShipment = async(completeShip) => {
        console.log(completeShip);
        const { receiver, index } = completeShip;
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index, {
                    gasLimit: 300000,
                }
            );

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("Error completing shipment:", error);
        }
    };

    const getShipment = async(index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = fetchContract(provider);

            const shipment = await contract.getShipment(accounts[0], index * 1);
            const singleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            };

            return singleShipment;
        } catch (error) {
            console.log("Error retrieving shipment:", error);
        }
    };

    const startShipment = async(getProduct) => {
        const { receiver, index } = getProduct;
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index * 1
            );

            await shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("Error starting shipment:", error);
        }
    };

    const checkIfWalletConnected = async() => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log("Wallet not connected");
        }
    };

    const connectWallet = async() => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentUser(accounts[0]);
        } catch (error) {
            console.log("Error connecting wallet");
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return ( <
        TrackingContext.Provider value = {
            {
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                getShipmentsCount,
                startShipment,
                DappName,
                currentUser,
            }
        } >
        { children } <
        /TrackingContext.Provider>
    );
};