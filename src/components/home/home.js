import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./home.css";
import Navbar from "../navbar/navbar";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleclick =() =>{
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = offset + 1; i < offset + 31; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setPokemons((prevPokemons) => [
          ...prevPokemons,
          ...res.filter(r => !prevPokemons.map(p => p.data.id).includes(r.data.id))
        ]);
      })
      .then(() => setOffset(offset + 30))
      .catch(() => setHasMore(false));
  };

  return (
    <div className="container-home back ">
      <Navbar />
      <InfiniteScroll
        dataLength={pokemons.length}
        next={getPokemons}
        hasMore={hasMore}
        loader={<h4>Carregando...</h4>}
        className="container-home back animate__animated animate__fadeInUp"
      >
        {pokemons.map((pokemon) => {
          const number = pokemon.data.id.toString().padStart(3, "0");
          return (
            <div key={pokemon.data.id} className="container-poke">
              <div className="container-link">
                <img
                  src={pokemon.data.sprites.other.dream_world.front_default}
                  alt=""
                />
                <div className="infos">
                  <Link to={`/details/${pokemon.data.id}`}>
                    <h2>{`#${number} ${pokemon.data.name}`}</h2>
                  </Link>
                  <div className="container">
                    {pokemon.data.types.map((type) => {
                      return (
                        <div
                          key={type.type.name}
                          className={`${type.type.name} tipo-pokemon`}
                        >
                          <p>{type.type.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
      <button className="button-top" onClick={handleclick}><img src="https://w7.pngwing.com/pngs/196/558/png-transparent-computer-icons-up-arrow-straight-arrow-angle-triangle-logo-thumbnail.png" alt="" /></button>
    </div>
  );
}
