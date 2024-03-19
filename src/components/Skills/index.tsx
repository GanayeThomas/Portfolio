import { useState, useEffect } from "react";

export interface Skill {
  id: number;
  titre: string | null;
  imgUrl: string | null;
}
export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchData() {
      const skills = await fetch("/api/skills", { cache: "force-cache" });
      if (skills.ok) {
        const data: Skill[] = await skills.json();
        setSkills(data);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap items-center">
      {skills.map((skill) => (
        <div key={skill.id} className="p-4 rounded-lg">
          <img className="w-50 h-20" src={skill.imgUrl ? skill.imgUrl : ""}/>
          <p>{skill.titre}</p>
        </div>
      ))}
    </div>
  );
}