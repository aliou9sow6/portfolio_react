import React, { useState, useEffect } from 'react';
import { getProjets, addProjet, deleteProjet } from '../services/api';
import Projet from './Projet';
import AjouterProjet from './AjouterProjet';

function Dossier() {
  const [projets, setProjets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const afficherNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAjouter = async (nouveauProjet) => {
    const projetCree = await addProjet({
      ...nouveauProjet,
      dateCreation: new Date().toISOString().split('T')[0],
    });
    setProjets((prev) => [...prev, projetCree]);
    afficherNotification("Projet ajouté");
  };

  const handleSupprimer = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    await deleteProjet(id);
    setProjets((prev) => prev.filter((p) => p.id !== id));
    afficherNotification("Projet supprimé");
  };

  return (
    <div className="dossier">
      <h1>Mes Projets</h1>

      {notification && <div>{notification}</div>}

      <AjouterProjet onAjouter={handleAjouter} />

      {erreur && <div>{erreur}</div>}

      {chargement ? (
        <p>Chargement...</p>
      ) : projets.length === 0 ? (
        <p>Aucun projet</p>
      ) : (
        <div>
          {projets.map((projet) => (
            <Projet
              key={projet.id}
              projet={projet}
              onSupprimer={handleSupprimer}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dossier;