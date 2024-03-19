import { useEffect, useState } from "react";

export interface Project {
  id: number;
  created_at: Date;
  title: string | null;
  description: string | null;
  gitUrl: string | null;
  webUrl: string | null;
}

export default function Projects() {
  const [projets, setProjets] = useState<Project[]>([]);
  useEffect(() => {
    async function fetchData() {
      // Lance une requête fetch pour obtenir les données des projets depuis "/api/projects".
      // L'option 'cache: "force-cache"' permet de privilégier l'utilisation du cache pour accélérer le chargement.
      const projects = await fetch("/api/projects", { cache: "force-cache" });
    
      // Vérifie si la requête a réussi (status HTTP 200-299).
      if (projects.ok) {
        // Convertit la réponse en JSON et suppose que cette réponse correspond à un tableau d'objets de type Project.
        const data: Project[] = await projects.json();
        
        // Affiche les données récupérées dans la console pour débogage ou inspection.
        console.log("data : ", data);
        
        // Met à jour l'état 'projets' avec les données récupérées.
        setProjets(data);
      }
    }
    
    // Utilise l'hook useEffect pour appeler fetchData() une seule fois, juste après que le composant soit monté.
    // Le tableau de dépendances vide [] assure que l'effet s'exécute une seule fois et non à chaque rendu.
      fetchData();
    }, []);

  return projets.map((projet) => (
    <div key={projet.id} className="bg-gray-200 p-4 rounded-lg my-5">
      <a
        href={projet.webUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        {projet.title}
      </a>
    </div>
  ));
}
