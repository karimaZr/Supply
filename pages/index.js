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
  const { currentUser,
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
  const [startModal, setStratModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  //Data State
  const [allshipmentsData, setallShipmentData] = useState();
  useEffect(() => {
    const getCampaingsData = getAllShipment();
    return async () => {
      const allData = await getCampaingsData;
      setallShipmentData(allData);
    };
  }
    , []);
  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStratMoedl={setStratModal}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allshipmentsData={allshipmentsData}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStratModal={setStratModal}
        startShipment={startShipment}
      />

    </>
  );
};
export default index;