"use client";

import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import React, { useState, useEffect } from "react";

export interface Education {
  id: number;
  title: string | null;
}

export interface Contact {
  id: number;
  created_at: Date;
  titre: string | null;
  coord: string | null;
}

export default function Home() {
  // Déclaration des états pour stocker les données de l'API.
  const [education, setEducation] = useState<Education[]>([]);
  const [contact, setContact] = useState<Contact[]>([]);

  // État pour stocker la section sélectionnée par l'utilisateur.
  const [selectedSection, setSelectedSection] = useState("");

  // Utilisation de useEffect pour charger les données au montage du composant.
  useEffect(() => {
    async function fetchData() {

      // Récupération des contacts depuis l'API et mise à jour de l'état.
      const contacts = await fetch("/api/contacts", { cache: "force-cache" });
      if (contacts.ok) {
        const data: Contact[] = await contacts.json();
        console.log("data : ", data);
        setContact(data);
      }
      // Récupération des formations depuis l'API et mise à jour de l'état.
      const educations = await fetch("/api/educations", {cache: "force-cache"});
      if (educations.ok) {
        const data: Education[] = await educations.json();
        setEducation(data);
      }
    }
    // Appel de la fonction fetchData.
    fetchData();
    // Le tableau de dépendances vide signifie que l'effet s'exécute une fois au montage du composant.
  }, []);

  // Fonction pour rendre la section sélectionnée.
  function renderSection() {
    switch (selectedSection) {
      // Projects.
      case "projets":
        return <Projects />
      // Génération du JSX pour la section 'skills'.
      case "skills":
        return <Skills />
      // Génération du JSX pour la section 'education'.
      case "education":
        return education.map((education) => (
          <div key={education.id} className="p-4 rounded-lg">
            <p>{education.title}</p>
          </div>
        ));
      // Génération du JSX pour la section 'contact'.
      case "contact":
        return contact.map((contact) => (
          <div key={contact.id} className="bg-gray-200 p-4 rounded-lg">
            <a
              href={contact.titre ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.titre}
            </a>
          </div>
        ));
      // Gestion du cas où la section n'est pas trouvée.
      default:
        return <p>Section non trouvée.</p>;
    }
  }

  // Rendu du composant avec une mise en page et l'affichage de la section sélectionnée.
  return (
    <main className="flex flex-col justify-center items-center">
      <div>
        <p className="mb-10 text-3xl text-amber-500">Welcome !</p>
      </div>
      <div className="text-center">
        <nav className="mb-8 flex justify-center gap-4 flex-wrap">
          <button onClick={() => {console.log('Projets sélectionné'); setSelectedSection("projets"); }}>Projets</button>
          <button onClick={() => {console.log('skill selectionné'); setSelectedSection("skills")}}>Compétences</button>
          <button onClick={() => {console.log('education selectionné');setSelectedSection("education")}}>Formations</button>
          <button onClick={() => {console.log('contact selectionné');setSelectedSection("contact")}}>Contact</button>
        </nav>
        {renderSection()} 
      </div>
    </main>
  );
}
