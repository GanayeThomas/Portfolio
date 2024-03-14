'use client'
import React, { useState, useEffect } from 'react';

export default function Home() {

  interface Project {
    id: bigint;
    created_at: Date;
    title: string | null;
    description: string | null;
    gitUrl: string | null;
    webUrl: string | null;
  }
  
  interface Skill {
    id: bigint;
    titre: string | null;
    imgUrl: string | null;
  }
  
  interface Education {
    id: bigint;
    title: string | null;
  }
  
  interface Contact {
    id: bigint;
    titre: string | null;
  }

  const [projets, setProjets] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [contact, setContact] = useState<Contact[]>([]);
  
  const [selectedSection, setSelectedSection] = useState('projets');


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/projects", {cache: "force-cache"});
      if(response.ok) {
        const data: Project[] = await response.json();
        setProjets(data);
      }
      const response2 = await fetch("/api/contacts", {cache: "force-cache"});
      if(response2.ok) {
        const data: Contact[] = await response2.json();
        setContact(data);
      }
      const response3 = await fetch("/api/educations", {cache: "force-cache"});
      if(response3.ok) {
        const data: Education[] = await response3.json();
        setEducation(data);
      }
      const response4 = await fetch("/api/skills", {cache: "force-cache"});
      if(response4.ok) {
        const data: Skill[] = await response4.json();
        setSkills(data);
      }
    }
    fetchData();
  }, []);

  function renderSection() {
    switch (selectedSection) {
      case 'projets':
        return projets.map((projet) => (
          <div key={projet.id} className="bg-gray-200 p-4 rounded-lg">
            <a href={projet.gitUrl ?? undefined} target="_blank" rel="noopener noreferrer">
              {projet.title}
            </a>
          </div>
        ));
      case 'skills':
        return skills.map((skill) => (
          <div key={skill.id} className="p-4 rounded-lg">
            <img className='w-50 h-20' src={skill.imgUrl ? skill.imgUrl : ""}/>
            <p>{skill.titre}</p>
          </div>
        ));
      case 'education':
        return education.map((education) => (
          <div key={education.id} className="p-4 rounded-lg">
            <p>{education.title}</p>
          </div>
        ));
      case 'contact':
        return contact.map((contact) => (
          <div key={contact.id} className="bg-gray-200 p-4 rounded-lg">
            <a href={contact.titre ?? undefined} target="_blank" rel="noopener noreferrer">
              {contact.titre}
            </a>
          </div>
        ));
      default:
        return <p>Section non trouvée.</p>;
    }
  }

  // Rendu du composant
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          <button onClick={() => setSelectedSection('projets')}>projets</button>
          <button onClick={() => setSelectedSection('skills')}>skills</button>
          <button onClick={() => setSelectedSection('education')}>education</button>
          <button onClick={() => setSelectedSection('contact')}>contact</button>
        </div>
        {renderSection()}
      </div>
    </main>
  );
}
