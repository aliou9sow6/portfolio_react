
import '../styles/Team.css';

function Team() {
  const membres = [
    {
      nom: "Anna Keita",
      role: "Sys",
      photo: "/assets/team/anna-keita.jpeg",
      description: "Spécialiste en systèmes d'information"
    },
    {
      nom: "Ibrahim DIALLO",
      role: "SysAdmin",
      photo: "/assets/team/ibrahim-diallo.jpg",
      description: "Administrateur système expérimenté"
    },
    {
      nom: "Bamba Lab",
      role: "Systeme & Reseaux",
      photo: "/assets/team/bamba-lab.jpg",
      description: "Expert en systèmes et réseaux"
    },
    {
      nom: "Khadija PENE",
      role: "Chef de projet",
      photo: "/assets/team/khadija-pene.jpg",
      description: "Chef de projet passionnée"
    },
    {
      nom: "Aliou SOW",
      role: "Developpeur",
      photo: "/assets/team/aliou-sow.jpg",
      description: "Développeur full-stack"
    }
  ];

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center">
        Notre équipe
      </h2>
      <p className="text-center text-secondary text-lg mb-12 max-w-2xl mx-auto font-dm-sans">
        Nous sommes une équipe de passionnés de développement web et systèmes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {membres.map((membre, index) => (
          <div key={index} className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 border border-gray-100">
            <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
              <img
                src={membre.photo}
                alt={membre.nom}
                className="w-full h-full stretch"
                onError={(e) => {
                  e.target.src = `https://placehold.co/200x200/667eea/ffffff?text=${encodeURIComponent(membre.nom.split(' ')[0])}`;
                }} /*Permet d'afficher une image de remplacement si l'image principale ne charge pas */
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-2 font-syne">
                {membre.nom}
              </h3>
              <p className="text-accent font-medium text-sm uppercase tracking-wide mb-3 font-dm-sans">
                {membre.role}
              </p>
              <p className="text-secondary text-sm leading-relaxed font-dm-sans">
                {membre.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;