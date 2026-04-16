import React, { useState } from 'react';

function EditerProjet({ projet, onValider, onAnnuler }) {
  const [champs, setChamps] = useState({
    libelle: projet.libelle || '',
    image: projet.image || '',
    description: projet.description || '',
    technologies: projet.technologies?.join(', ') || '',
    lien: projet.lien || '',
  });
  const [erreurs, setErreurs] = useState({});
  const [envoi, setEnvoi] = useState(false);

  const valider = () => {
    const e = {};
    if (!champs.libelle.trim()) e.libelle = 'Le libellé est obligatoire';
    if (champs.libelle.trim().length > 80) e.libelle = 'Maximum 80 caractères';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChamps((prev) => ({ ...prev, [name]: value }));
    if (erreurs[name]) {
      setErreurs((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = valider();
    if (Object.keys(validation).length > 0) {
      setErreurs(validation);
      return;
    }

    setEnvoi(true);
    try {
      await onValider({
        libelle: champs.libelle.trim(),
        image: champs.image.trim(),
        description: champs.description.trim(),
        technologies: champs.technologies
          ? champs.technologies.split(',').map((tech) => tech.trim()).filter(Boolean)
          : [],
        lien: champs.lien.trim(),
      });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="editer-projet">
      <div className="editer-entete">
        <h1>Modifier le projet</h1>
      </div>

      <form className="editer-form" onSubmit={handleSubmit} noValidate>
        <div className="champ-groupe">
          <label htmlFor="libelle">Libellé <span className="champ-requis">*</span></label>
          <input
            id="libelle"
            name="libelle"
            type="text"
            value={champs.libelle}
            onChange={handleChange}
            className={erreurs.libelle ? 'champ-input champ-erreur' : 'champ-input'}
            maxLength={80}
            autoFocus
          />
          {erreurs.libelle && <span className="erreur-msg">{erreurs.libelle}</span>}
        </div>

        <div className="champ-groupe">
          <label htmlFor="image">URL de l'image</label>
          <input
            id="image"
            name="image"
            type="url"
            value={champs.image}
            onChange={handleChange}
            className="champ-input"
          />
        </div>

        <div className="champ-groupe">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={champs.description}
            onChange={handleChange}
            className="champ-input champ-textarea"
            rows={4}
          />
        </div>

        <div className="champ-groupe">
          <label htmlFor="technologies">Technologies <span className="champ-hint">(séparées par des virgules)</span></label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            value={champs.technologies}
            onChange={handleChange}
            className="champ-input"
          />
        </div>

        <div className="champ-groupe">
          <label htmlFor="lien">Lien du projet</label>
          <input
            id="lien"
            name="lien"
            type="url"
            value={champs.lien}
            onChange={handleChange}
            className="champ-input"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-annuler" onClick={onAnnuler}>
            Annuler
          </button>
          <button type="submit" className="btn btn-valider" disabled={envoi}>
            {envoi ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditerProjet;
