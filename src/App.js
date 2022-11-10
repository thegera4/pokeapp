import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PkmnCard from './components/PkmnCard';

function App() {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  function handleOffset(e) {
    setOffset(e.target.value);
  }

  function handleLimit(e) {
    setLimit(e.target.value);
  }

  function handleClick(){
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => {
        setData(response.data.results);
      })
  }

  useEffect(() => {
    if (data) {
      const promises = data?.map(pokemon => axios.get(pokemon.url));
      Promise.all(promises)
      .then(responses => {
        const creatures = responses.map(response => {
          return {
            name: response.data.name,
            sprite: response.data.sprites.front_default
          }
        })
        setPokemons(creatures);
      })
    }
  }, [data])

  function onDelete (index){
    const newPokemons = [...pokemons];
    newPokemons.splice(index, 1);
    setPokemons(newPokemons);
  }

  useEffect(() => {
    //rerender pokemons when they one is deleted
  }, [pokemons])
  return (
    <div className="App">
      <div>
      <div>
        <label htmlFor="offset">Offset: </label>
        <input type="number" name="offset" id="offset" onChange={handleOffset} />
      </div>
      <div>
        <label htmlFor="limit">Limit: </label>
        <input type="number" name="limit" id="limit" onChange={handleLimit}/>
      </div>
      </div>
      <div>
        <button onClick={()=>handleClick()}>
          Get Pokemons
        </button>
      </div>
      <PkmnCard pokemons={pokemons} onDelete={onDelete}/>
    </div>
  );
}

export default App;
