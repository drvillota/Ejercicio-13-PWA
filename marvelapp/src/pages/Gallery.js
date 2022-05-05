import React, { useState, useEffect } from 'react';
import md5 from "md5";
import { Card } from './../components/Card/Card';
import './Gallery.scss';

export const Gallery = () => {
  const apiUrl = "https://gateway.marvel.com/v1/public/characters";
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if(!navigator.onLine){
        if(JSON.parse(localStorage.getItem("characters")) === null) {
            console.log("nada :c");
        } else {
            setCharacters(JSON.parse(localStorage.getItem("characters")));
        }
    } else {
        fetchCharacters();
    }
  }, []);

  const fetchCharacters = async () => {
    const now = Date.now();
    const publicKey = "4396a0225e6749d0276d4087c35b5b8e";
    const privateKey = "a153f33da4504455fc26617018b62a313a726e3e";
    let params = {
      apikey: publicKey,
      ts: now
    };
    params.hash = md5(params.ts + privateKey + publicKey);

    const resp = await fetch(`${apiUrl}?apikey=${params.apikey}&ts=${params.ts}&hash=${params.hash}`);
    const data = await resp.json();

    const characters = data?.data.results.map((resp) => {
        return {
          id: resp.id.toString(),
          name: resp.name,
          url: `${resp.thumbnail.path}.${resp.thumbnail.extension}`,
        };
      });

      setCharacters(characters);
      localStorage.setItem("characters", JSON.stringify(characters));
  };

  return (
    <>
      <div className='gallery'>
        <h1>Marvel heroes</h1>
        <div className='gallery-card-container'>
          {characters.map((elm, index) => (
            <Card
              key={elm.id}
              name={elm.name}
              url={elm.url}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
};
