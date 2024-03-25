"use client";

import Contacts from "@/components/Contacts";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Educations";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  // État pour stocker la section sélectionnée par l'utilisateur.
  const [selectedSection, setSelectedSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleResize() {
      // Définir isMenuOpen sur false si la largeur de la fenêtre est >= 1280px (taille xl en Tailwind CSS)
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    }

    // Ajouter l'écouteur lors du montage du composant
    window.addEventListener("resize", handleResize);

    // Appeler handleResize au montage au cas où la page est chargée dans un grand écran
    handleResize();

    // Nettoyer l'écouteur lors du démontage du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <p className="bg-[#45b8f8]">
              Bonjour je suis Thomas <br />
              Joueur depuis de nombreuses années, j ai décidé
              <br /> d aller vers la programmation pour atteindre ce but <br />{" "}
              et améliorer mes compétences
            </p>
          </div>
        );
    }
  }

  // Rendu du composant avec une mise en page et l'affichage de la section sélectionnée.
  return (
    <main className="flex flex-col justify-center items-center">
      <button className="xl:hidden" onClick={toggleMenu}>
        Menu
      </button>
      <div className="absolute top-0 left-0 z-50 xl:hidden">
        <Image src="/images/logo.png" alt="Logo" width="75" height="100" />
      </div>
      <nav
        className={`${
          isMenuOpen ? "flex flex-col" : "hidden"
        } xl:flex mb-8 justify-center gap-10 flex-wrap text-lg bg-green-900 w-1/2 border rounded-3xl py-3`}
      >
        <button
          className={`hover:text-amber-500 ${
            selectedSection === "projets" ? "text-amber-500" : "text-white"
          }`}
          onClick={() => setSelectedSection("projets")}
        >
          Projets
        </button>
        <button
          className={`hover:text-amber-500 ${
            selectedSection === "skills" ? "text-amber-500" : "text-white"
          }`}
          onClick={() => setSelectedSection("skills")}
        >
          Compétences
        </button>
        <div className={`${isMenuOpen ? "hidden" : "block"} xl:block`}>
          <Image src="/images/logo.png" alt="Logo" width="75" height="100" />
        </div>
        <button
          className={`hover:text-amber-500 ${
            selectedSection === "education" ? "text-amber-500" : "text-white"
          }`}
          onClick={() => setSelectedSection("education")}
        >
          Formations
        </button>

        <button
          className={`hover:text-amber-500 ${
            selectedSection === "contact" ? "text-amber-500" : "text-white"
          }`}
          onClick={() => setSelectedSection("contact")}
        >
          Contact
        </button>
      </nav>
      <div className="flex flex-wrap items-center">
        <p className="my-10 text-5xl text-amber-500 font-bold">Welcome !</p>
      </div>
      <div className="text-center flex justify-center">{renderSection()}</div>
    </main>
  );
}
