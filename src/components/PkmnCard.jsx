import React from 'react'
import '../App.css';

function PkmnCard({pokemons, onDelete}) {
  return (
      <div className='container'>
        {pokemons.map((pokemon, index) => (
          <div key={index} className='card'>
            <button className='delete' onClick={()=>onDelete(pokemon.name)}>
              X
            </button>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
  )
}

export default PkmnCard