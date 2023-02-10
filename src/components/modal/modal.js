// Modal.js
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./modal.css";

function Modal({ handleCloseModal }) {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

 

  const handleSearch = async () => {
    setPokemonData(null);
    setErrorMessage("");
    if (pokemonName) {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonData(res.data);
      } catch (err) {
        setErrorMessage("Pokemon not found");
      }
    } else {
      setErrorMessage("Please enter a valid pokemon name");
    }
  };
  return (
    <div className="modal-overlay animate__bounce">
      <div className="modal">
        <button className="button-closer" onClick={handleCloseModal}>
          X
        </button>
        <div className="modal-content">
          <div className="bar">
            <input
              type="text"
              className="search"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              placeholder="Enter Pokemon Name"
            />
            <button className="search button-search" onClick={handleSearch}>
              <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/07/Ferramenta-Lupa-PNG.png" alt="" />
            </button>
          </div>
          {pokemonData && (
            
              <div className="pokemon-data">
                <div className="gradient">
                <Link onClick={handleCloseModal} to={`/details/${pokemonData.id}`}>
                <img src={pokemonData.sprites.other.dream_world.front_default} alt="Pokemon" /></Link>

                <p className="pok-name">{pokemonData.name}</p>
                {pokemonData.types.map((type) => {
                  return (
                    <div
                      key={type.type.name}
                      className={`${type.type.name} type-pokemon`}
                    >
                      <p>{type.type.name}</p>
                    </div>
                  );
                })}
                </div>
              </div>
          )}
          {errorMessage && <p className="error-message">{errorMessage} </p>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
