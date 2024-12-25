import GlobalContext from "../../context/GlobalContext";
import { useContext, useState } from "react";

// Importation des icônes
import { FaHome, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function NavMenu() {
  const context = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!context) {
    return null;
  }

  const { content, setContent } = context;

  // Liste des items du menu
  const menuItems = [
    { label: "Home", icon: <FaHome />, value: "Home" },
    { label: "Dashboard", icon: <MdDashboard />, value: "Dashboard" },
    { label: "Planing", icon: <FaCog />, value: "Planing" },
  ];

  return (
    <div
      className={`transition-all bg-gray-800 duration-300 ${
        isOpen ? "max-w-56 min-w-56" : "min-w-16"
      } bg-mainColor h-screen flex flex-col items-center`}
    >
      {/* Bouton pour plier/déplier */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none h-10 flex items-center justify-center w-full text-2xl"
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Logo */}
      {isOpen && (
        <div className="h-1.5/10 w-8/10 mt-4">
          <img
            src="/coach.jpeg"
            alt="coach Logo"
            className="object-contain rounded-lg"
          />
        </div>
      )}

      {/* Contenu du menu */}
      <div className="flex flex-col gap-8 w-full items-center justify-start mt-8 ">
        {isOpen
          ? menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setContent(item.value)}
                className={`${
                  content === item.value
                    ? "border border-gray-700 text-white bg-gray-700 rounded-xl italic tracking-widest"
                    : "text-white hover:bg-gray-700 rounded-xl"
                } flex items-center p-2 gap-2 w-9/10 justify-start pl-10`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))
          : menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setContent(item.value)}
                className={`${
                  content === item.value
                    ? "border rounded-full border-white text-white bg-gray-600"
                    : "text-white hover:bg-gray-600 rounded-full"
                } p-2 flex items-center justify-center`}
              >
                {item.icon}
              </button>
            ))}
      </div>
    </div>
  );
}

export default NavMenu;