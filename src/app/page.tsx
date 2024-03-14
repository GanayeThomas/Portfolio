import getProjectsAll from "@/api/getProjects";
import getSkillsAll from "@/api/getSkills";
import getEducationAll from "@/api/getEducation";
import getContactsAll from "@/api/getContacts";

export default async function Home() {
  const projets = await getProjectsAll();
  const skills = await getSkillsAll();
  const education = await getEducationAll();
  const contact = await getContactsAll();

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="text-center">
        <h1>Projet !</h1>
        <div className="flex flex-row justify-center items-center space-x-4 mt-4 flex-wrap">
          {projets.map((projet) => (
            <div key={projet.id} className="bg-gray-200 p-4 rounded-lg">
              <p>{projet.title}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-8">Compétence !</h2>
        <div className="flex flex-row justify-center items-center space-x-4 mt-4 flex-wrap">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-gray-200 p-4 rounded-lg">
              <p>{skill.titre}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-8"> Titres ! </h3>
        <div className="flex flex-row justify-center items-center space-x-4 mt-4 flex-wrap">
          {education.map((education) => (
            <div key={education.id} className="bg-gray-200 p-4 rounded-lg">
              <p>{education.title}</p>
            </div>
          ))}
        </div>
        <h4 className="mt-8"> Contact ! </h4>
        <div className="flex flex-row justify-center space-x-4 mt-4 flex-wrap">
          {contact.map((contact) => (
            <div key={contact.id} className="bg-gray-200 p-4 rounded-lg">
              <p>{contact.titre}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
