import { useEffect, useState } from "react";

export interface Contact {
  id: number;
  created_at: Date;
  titre: string | null;
  coord: string | null;
}

export default function Contacts() {
  const [contact, setContact] = useState<Contact[]>([]);
    // useEffect est utilisé ici pour exécuter du code au montage du composant.
  // La fonction fetchData est définie et exécutée dans useEffect.
  useEffect(() => {
    // Définition de la fonction fetchData comme asynchrone pour utiliser await.
    async function fetchData() {
      // Appel à fetch pour obtenir les données des contacts depuis "/api/contacts".
      // L'option { cache: "force-cache" } est utilisée pour forcer l'utilisation du cache.
      const contacts = await fetch("/api/contacts", { cache: "force-cache" });
      
      // Vérification si la requête a réussi avec contacts.ok.
      if (contacts.ok) {
        // Conversion de la réponse en JSON et stockage dans `data`.
        const data: Contact[] = await contacts.json();

        // Mise à jour de l'état `contact` avec les données reçues.
        setContact(data);
      }
    }
    // Appel de la fonction fetchData.
    fetchData();
  }, []); // Le tableau vide comme deuxième argument signifie que l'effet s'exécute une fois au montage du composant.

  // Rendu des contacts. Pour chaque contact dans l'état `contact`, un div est rendu.
  return contact.map((contact) => (
    <div key={contact.id} className="bg-gray-200 p-4 rounded-lg my-5">
      <a
        href={contact.coord ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        {contact.titre}
      </a>
    </div>
  ));
};