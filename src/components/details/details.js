import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./details.css";
import 'animate.css'

export default function Details() {
  const [pokemons, setPokemons] = useState([]);
  const [showDiv, setShowDiv] = useState("pokInfo");

  const statusMax = {
    hp: 255,
    attack: 165,
    defense: 184,
    "special-attack": 170,
    "special-defense": 154,
    speed: 200,
  };

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data);
      });
  }, [id]);
  return (
    <div className="background">
      <Navbar />
      <div className="container- back">
        <div className="container-deta">
          <div className="container-poke-img">
            <img
              className="principal"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={pokemons.name}
            />
            <div className="poke-sprites">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={pokemons.name}
              />
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
                alt={pokemons.name}
              />
            </div>
          </div>

          <div className="buttons">
            <button
              className={`button ${showDiv === "pokInfo" ? "active" : ""}`}
              onClick={() => setShowDiv("pokInfo")}
            >
              Informações
            </button>

            <button
              className={`button ${showDiv === "status" ? "active" : ""}`}
              onClick={() => setShowDiv("status")}
            >
              Status
            </button>

            <button
              className={`button ${showDiv === "moves" ? "active" : ""}`}
              onClick={() => setShowDiv("moves")}
            >
              Moves
            </button>
          </div>

          {showDiv === "pokInfo" && (
            <div className="poke-infos animate__animated animate__flipInX">
              <div className="data">
                <h3>Name: </h3> {pokemons && <p>{pokemons.name}</p>}
              </div>
              <div className="data">
                <h3>Weigeth: </h3> <p>{pokemons.weight}kg</p>
              </div>
              <div className="data">
                <h3>Heigeth: </h3> <p>{pokemons.height} m</p>
              </div>
              <div className="abilitys">
                <h3>Ability: </h3>{" "}
                {pokemons.abilities &&
                  pokemons.abilities.map((abilitie) => {
                    return (
                      <div className="abilitie" key={abilitie.ability.name}>
                        <p>{abilitie.ability.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {showDiv === "status" && (
            <div className="status animate__animated animate__flipInX">
              <h3>Status:</h3>
              {pokemons.stats &&
                pokemons.stats.map((stat) => {
                  return (
                    <div className="stat" key={stat.stat.name}>
                      <p>
                        {stat.stat.name}: {stat.base_stat}
                      </p>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{
                            width: `${
                              (stat.base_stat / statusMax[stat.stat.name]) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {showDiv === "moves" && (
            <div className="moves animate__animated animate__fadeInUp">
              {pokemons.moves &&
                pokemons.moves.map((move) => {
                  return (
                    <div className="move" key={move.move.name}>
                      <p>{move.move.name}</p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
