import React, { useState } from 'react';
import Dossier from './components/Dossier';

function App() {
  const [vue, setVue] = useState('liste'); // 'liste' | 'detail' | 'editer'
  const [projetSelectionne, setProjetSelectionne] = useState(null);

  const afficherDetail = (projet) => {
    setProjetSelectionne(projet);
    setVue('detail');
  };

  const afficherEdition = (projet) => {
    setProjetSelectionne(projet);
    setVue('editer');
  };

  const retourListe = () => {
    setProjetSelectionne(null);
    setVue('liste');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo" onClick={retourListe} style={{ cursor: 'pointer' }}>
            <span className="logo-dot" />
            <span className="logo-text">Portfolio</span>
          </div>
          <nav className="header-nav">
            <span className="nav-label">Gestion de Projets</span>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Dossier
          vue={vue}
          projetSelectionne={projetSelectionne}
          onAfficherDetail={afficherDetail}
          onAfficherEdition={afficherEdition}
          onRetourListe={retourListe}
        />
      </main>

      <footer className="app-footer">
        <span>© 2024 Portfolio · Propulsé par React &amp; json-server</span>
      </footer>
    </div>
  );
}

export default App;
