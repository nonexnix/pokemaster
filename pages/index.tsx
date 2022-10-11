import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = ({ initialPokemon }: any) => {
  const [pokemon, setPokemon] = useState(initialPokemon);

  useEffect(() => {
    const updatedPokemon = async () => {
      let updatedPokemon = [];
      for (let i = 0; i < pokemon.length; i++) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon[i].name}`
        );
        const { height } = await response.json();
        updatedPokemon.push({
          ...pokemon[i],
          height,
        });
      }
      setPokemon(updatedPokemon);
    };
    updatedPokemon();
  }, []);

  const resizer = (height: number) => {
    const MH = 20 / 100;
    const RH = MH * height * 100;
    return `${RH}%`;
  };

  console.log(pokemon);

  return (
    <div className="grid grid-cols-5  gap-28 p-8 items-center">
      {pokemon.map((pokeman: any, index: number) => (
        <div
          key={pokeman.name}
          style={{
            height: resizer(pokeman.height),
          }}
          className="relative max-">
          <span className="mb-24 mr-10">{pokeman.height}</span>
          <Image src={pokeman.sprite} layout="fill" objectFit="contain" />
        </div>
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=50";

  const response = await fetch(API_URL);
  const { results } = await response.json();

  const spriteUrl = (query?: string) => {
    return `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${query}.gif`;
  };

  return {
    props: {
      initialPokemon: [
        ...results.map((result: any) => {
          return {
            ...result,
            sprite: spriteUrl(result.name),
          };
        }),
      ],
    },
  };
};
