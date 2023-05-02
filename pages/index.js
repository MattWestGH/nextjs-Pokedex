import { useState, useEffect } from "react";
import Link from "next/link";

function Card(props) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="card col-4 d-flex justify-content-center">
      <img src={props.src} className="card-img-top" alt="..." />
      <div className="card-body">
        <Link href={{ pathname: "pokemon/[id]", query: { id: props.id } }}>
          <h5 className="card-title">{props.title}</h5>
        </Link>
        <p className="card-text">{props.text}</p>
        {likes === 0 ? null : <p className="card-text">Likes: {likes}</p>}
        {likes === 10 ? null : (
          <button
            onClick={() => {
              setLikes(likes + 1);
            }}
            href="#"
            className="btn btn-primary"
          >
            {props.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

function getIDFromPokemon(pokemon) {
  return pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState([0]);
  const [isloading, setIsLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        console.log(json["results"]);
        setPokemonList([...pokemonList, ...json["results"]]);
      });
  }, [offset]);

  return (
    <div classNameName="App">
      <div className="container">
        <div className="row">
          {pokemonList.map((pokemon) => {
            const id = getIDFromPokemon(pokemon);
            return (
              <Card
                key={id}
                id={id}
                title={pokemon["name"]}
                text={`#${getIDFromPokemon(pokemon)}`}
                buttonText="Like"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              />
            );
          })}
        </div>
        {isloading === true ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setOffset(parseInt(offset) + parseInt(limit));
              console.log(offset);
            }}
          >
            More
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
