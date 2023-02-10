import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import "./trainer.css";

const TrainerForm = () => {
  const [state, setState] = useState(1);
  const [formData, setFormData] = useState({
    trainer: "",
    age: "",
    pokemon: "",
    amount: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState(3);
  };

  const handleEdit = () => {
    setState(2);
  };

  const handleDelete = () => {
    setFormData({
      trainer: "",
      age: "",
      pokemon: "",
      amount: "",
    });
    setState(1);
  };

  return (
    <div className="back">
      <Navbar />
      <div>
        {state === 1 && (
          <div className="state-1">
            <h2>Seems like you dont have a trainer profile registered</h2>
            <button onClick={() => setState(2)}>Register</button>
          </div>
        )}
        {state === 2 && (
          <div className="state-2">
            <form onSubmit={handleSubmit}>
              <h3>Trainer</h3>
              <input
                type="text"
                name="trainer"
                value={formData.trainer}
                onChange={handleChange}
                required
              />
              <h3>Age</h3>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <h3>Favorite pokemon</h3>
              <input
                type="text"
                name="pokemon"
                value={formData.pokemon}
                onChange={handleChange}
                required
              />
              <h3>Pokemon amount</h3>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />

              <button type="submit">
                {formData.amount ? "Save" : "Register"}
              </button>
            </form>
          </div>
        )}
        {state === 3 && (
          <div className="state-3">
            <p>Name: {formData.trainer}</p>
            <p>Age: {formData.age}</p>
            <p>Pokemon favorite: {formData.pokemon}</p>
            <p>Pokemon amount: {formData.amount}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
        {state !== 1 && state !== 2 && state !== 3 && <div>Error</div>}
      </div>
    </div>
  );
};

export default TrainerForm;
