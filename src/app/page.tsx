"use client";

import Contacts from "@/components/Contacts";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Educations";
import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  // État pour stocker la section sélectionnée par l'utilisateur.
  const [selectedSection, setSelectedSection] = useState("");

  // Fonction pour rendre la section sélectionnée.
  function renderSection() {
    switch (selectedSection) {
      // Projects.
      case "projets":
        return <Projects />;
      // Skills
      case "skills":
        return <Skills />;
      // Education
      case "education":
        return <Education />;
      // Contact
      case "contact":
        return <Contacts />;
      default:
        return (
          <div>
            <p>
              Bonjour je suis Thomas <br />
              Joueur depuis de nombreuses années, j'ai
              décidé d'aller vers la programmation pour atteindre ce but <br />
              et améliorer mes compétences
            </p>
          </div>
        );
        
    }
  }

  // Rendu du composant avec une mise en page et l'affichage de la section sélectionnée.
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap items-center">
        <Image src="/images/logo.png" alt="Logo" width="75" height="100" />
        <p className="my-10 text-3xl text-amber-500">Welcome !</p>
      </div>
      <div className="text-center">
        <nav className="mb-8 flex justify-center gap-4 flex-wrap text-lg">
          <button onClick={() => setSelectedSection("projets")}>Projets</button>
          <button onClick={() => setSelectedSection("skills")}>
            Compétences
          </button>
          <button onClick={() => setSelectedSection("education")}>
            Formations
          </button>
          <button onClick={() => setSelectedSection("contact")}>Contact</button>
        </nav>
        {renderSection()}
      </div>
    </main>
  );
}
