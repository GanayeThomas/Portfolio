import { useEffect, useState } from "react";

export interface Education {
  id: number;
  title: string | null;
}

export default function Education() {
  // Déclaration des états pour stocker les données de l'API.
  const [education, setEducation] = useState<Education[]>([]);

  // Utilisation de useEffect pour charger les données au montage du composant.
  useEffect(() => {
    async function fetchData() {
      // Récupération des formations depuis l'API et mise à jour de l'état.
      const educations = await fetch("/api/educations", {
        cache: "force-cache",
      });
      if (educations.ok) {
        const data: Education[] = await educations.json();
        setEducation(data);
      }
    }
    fetchData();
    // Le tableau de dépendances vide signifie que l'effet s'exécute une fois au montage du composant.
  }, []);
  
  return education.map((education) => (
    <div key={education.id} className="p-4 rounded-lg">
      <p>{education.title}</p>
    </div>
  ));
}
