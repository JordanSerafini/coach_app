import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

import NavMenu from "../menu/NavMenu";
import PlaningPage from "../planing/PlaningPage";

const Home: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const {  content, setContent } = globalContext;



  const handleUpdateContent = () => {
    setContent("Planing");
  };

  const handleReservation = () => {
    setContent("Reservation");
  }

  return (
    <div className="w-full h-full flex justify-start items-center ">
      <div className="">
        <NavMenu />
      </div>

      {content === "Home" && (
        <div className="w-full h-full justify-evenly flex">
          <button onClick={handleUpdateContent}>
            Page Planing
          </button>
          <button onClick={handleReservation}>
            Page Reservation
          </button>
        </div>
      )}
      {/* {/* {content === "Dashboard" && <Dashboard />} */}
      {content === "Planing" && < PlaningPage />} 
    </div>
  );
};

export default Home;