import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/modal";
import "./navbar.css";

export default function Navbar() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  return (
    <nav>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/2560px-International_Pokémon_logo.svg.png" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li><Link to="/trainer">Trainer</Link></li>
        <li>
          <button onClick={handleOpenModal}>Search</button>
          {showModal && <Modal handleCloseModal={handleCloseModal} />}
        </li>
      </ul>
    </nav>
  );
}