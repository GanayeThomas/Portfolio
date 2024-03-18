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
      // Récupération des projets depuis l'API et mise à jour de l'état.
      const projects = await fetch("/api/projects", { cache: "force-cache" });
      if (projects.ok) {
        const data: Project[] = await projects.json();
        console.log("data : ", data);
        setProjets(data);
      }
    }
    fetchData();
  }, []);

  return projets.map((projet) => (
    <div key={projet.id} className="bg-gray-200 p-4 rounded-lg">
      <a
        href={projet.gitUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        {projet.title}
      </a>
    </div>
  ));
}
