import { useState } from "react";
const ShipmentModal = ({ getModel, setGetModel, getShipment }) => {
    const [index, setIndex] = useState(0);
    const [singleShipmentData, setSingleShipmentData] = useState();

    // Fonction pour récupérer les données de livraison
    const getShipmentData = async () => {
        const getData = await getShipment(index);
        setSingleShipmentData(getData);
        console.log(getData);
    };

    // Fonction pour convertir le timestamp en format de date lisible
    const convertTime = (time) => {
        const newTime = new Date(time);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(newTime);
    };

    return getModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            {/* Fond sombre */}
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setGetModel(false)}
            ></div>

            {/* Contenu de la modal */}
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                            onClick={() => setGetModel(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">
                            Product Tracking Details
                        </h4>

                        {/* Formulaire pour saisir l'ID */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input
                                    type="number"
                                    placeholder="ID"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => setIndex(e.target.value)}
                                />
                                <button
                                    onClick={getShipmentData}
                                    className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                                >
                                    Get details
                                </button>
                            </div>
                        </form>

                        {/* Affichage des détails du colis */}
                        {singleShipmentData ? (
                            <div className="text-left mt-5">
                                <p>Sender: {singleShipmentData.sender.slice(0, 25)}...</p>
                                <p>Receiver: {singleShipmentData.receiver.slice(0, 25)}...</p>
                                <p>Pickup Time: {convertTime(singleShipmentData.pickupTime)}</p>
                                <p>Delivery Time: {convertTime(singleShipmentData.deliveryTime)}</p>
                                <p>Distance: {singleShipmentData.distance}</p>
                                <p>Price: {singleShipmentData.price}</p>
                                <p>Status: {singleShipmentData.status}</p>
                            </div>
                        ) : (
                            <p className="mt-5 text-gray-500">No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ShipmentModal;