"use client";

import React, { useState, useEffect } from "react";
export interface Project {
  id: number;
  created_at: Date;
  title: string | null;
  description: string | null;
  gitUrl: string | null;
  webUrl: string | null;
}

export interface Skill {
  id: number;
  titre: string | null;
  imgUrl: string | null;
}

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
  const [projets, setProjets] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [contact, setContact] = useState<Contact[]>([]);

  // État pour stocker la section sélectionnée par l'utilisateur.
  const [selectedSection, setSelectedSection] = useState("");

  // Utilisation de useEffect pour charger les données au montage du composant.
  useEffect(() => {
    async function fetchData() {
      // Récupération des projets depuis l'API et mise à jour de l'état.
      const projects = await fetch("/api/projects", { cache: "force-cache" });
      if (projects.ok) {
        const data: Project[] = await projects.json();
        console.log("data : ", data);
        setProjets(data);
      }

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
      // Récupération des compétences depuis l'API et mise à jour de l'état.
      const skills = await fetch("/api/skills", { cache: "force-cache" });
      if (skills.ok) {
        const data: Skill[] = await skills.json();
        setSkills(data);
      }
    }
    // Appel de la fonction fetchData.
    fetchData();
    // Le tableau de dépendances vide signifie que l'effet s'exécute une fois au montage du composant.
  }, []);

  // Fonction pour rendre la section sélectionnée.
  function renderSection() {
    switch (selectedSection) {
      // Génération du JSX pour la section 'projets'.
      case "projets":
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
      // Génération du JSX pour la section 'skills'.
      case "skills":
        return skills.map((skill) => (
          <div key={skill.id} className="p-4 rounded-lg">
            <img className="w-50 h-20" src={skill.imgUrl ? skill.imgUrl : ""} />
            <p>{skill.titre}</p>
          </div>
        ));
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
