import React, { useState, useEffect, useContext } from "react";
import {
    Table,
    Form,
    Services,
    Profile,
    GetShipment,
    CompleteShipment,
    StartShipment,
} from "../Components/index";
import { TrackingContext } from "../Context/Tracking";
const index = () => {
    const {
        currentUser,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount
    } = useContext(TrackingContext);
    //State variable
    const [createShipmentModel, setCreateShipmentModel] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModal, setStartModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [getModel, setGetModel] = useState(false);
    //Data State
    const [allShipmentData, setAllShipmentData] = useState([]);
    useEffect(() => {
        // Define an async function inside the useEffect
        const fetchData = async() => {
            try {
                const allData = await getAllShipment(); // Fetch shipment data
                setAllShipmentData(allData); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };

        fetchData(); // Call the async function

    }, []);
    return ( <
        >
        <
        Services setOpenProfile = { setOpenProfile }
        setCompleteModal = { setCompleteModal }
        setGetModel = { setGetModel }
        setStartMoedl = { setStartModal }
        /> <
        Table setCreateShipmentModel = { setCreateShipmentModel }
        allShipmentsdata = { allShipmentData }
        /> <
        Form createShipmentModel = { createShipmentModel }
        createShipment = { createShipment }
        setCreateShipmentModel = { setCreateShipmentModel }
        /> <
        Profile openProfile = { openProfile }
        setOpenProfile = { setOpenProfile }
        currentUser = { currentUser }
        getShipmentsCount = { getShipmentsCount }
        /> <
        CompleteShipment completeModal = { completeModal }
        setCompleteModal = { setCompleteModal }
        completeShipment = { completeShipment }
        /> <
        GetShipment getModel = { getModel }
        setGetModel = { setGetModel }
        getShipment = { getShipment }
        /> <
        StartShipment startModal = { startModal }
        setStartModal = { setStartModal }
        startShipment = { startShipment }
        />

        <
        />
    );
};
export default index;