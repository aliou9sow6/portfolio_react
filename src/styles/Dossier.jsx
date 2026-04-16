import React, { useState, useEffect } from 'react';
import { getProjets } from '../services/api';
import Projet from './Projet';

function Dossier() {
  const [projets, setProjets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    chargerProjets();
  }, []);

  const chargerProjets = async () => {
    try {
      setChargement(true);
      setErreur(null);
      const data = await getProjets();
      setProjets(data);
    } catch (err) {
      setErreur('Impossible de charger les projets.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="dossier">
      <h1>Mes Projets</h1>

      {erreur && <div>{erreur}</div>}

      {chargement ? (
        <p>Chargement...</p>
      ) : projets.length === 0 ? (
        <p>Aucun projet</p>
      ) : (
        <div>
          {projets.map((projet) => (
            <Projet key={projet.id} projet={projet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dossier;