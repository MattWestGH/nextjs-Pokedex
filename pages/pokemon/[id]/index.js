import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        setPokemon(json);
      }),
      [router.isReady];
  });

  return (
    <div className="container">
      {isloading === true ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      {pokemon ? (
        <div className="card">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            className="card-img-top"
            style={{ height: "500px", width: "500px" }}
          ></img>
          <div className="card-body">
            <h5 className="card-title">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h5>
            <p className="card-text">Weight: {pokemon.weight}lbs</p>
            <p className="card-text">Height: {pokemon.height}'</p>
          </div>
        </div>
      ) : null}
      <Link href="/">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
}
