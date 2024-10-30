import React, { useState } from 'react'; // Import hooku useState pro práci se stavem

const AddEntity = () => {
  // Stavy pro jméno a popis entity
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Funkce pro zpracování odeslání formuláře
  const handleSubmit = (e) => {
    e.preventDefault(); // Zamezení defaultnímu chování formuláře (reload stránky)
    console.log('New entity added:', { name, description }); // Zde by se normálně odeslala data do backendu
  };

  return (
    <div className="form-container">
      <h2>Add Entity</h2>
      <form onSubmit={handleSubmit}>
        {/* Pole pro zadání názvu entity */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Zpracování změny vstupu
          />
        </label>
        {/* Pole pro zadání popisu entity */}
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Zpracování změny vstupu
          ></textarea>
        </label>
        {/* Tlačítko pro odeslání formuláře */}
        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
};

export default AddEntity;
