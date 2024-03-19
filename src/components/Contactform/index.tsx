import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

interface FormErrors {
  user_name?: string;
  user_email?: string;
  message?: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const user_name = form.elements.namedItem("user_name") as HTMLInputElement;
    const user_email = form.elements.namedItem("user_email") as HTMLInputElement;
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;

    let formErrors: FormErrors = {};

    if (!user_name.value.trim()) {
      formErrors.user_name = "Le nom est requis.";
    }

    if (!user_email.value.trim()) {
      formErrors.user_email = "L'email est requis.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user_email.value)) {
        formErrors.user_email = "L'adresse e-mail n'est pas valide.";
      }
    }

    if (!message.value.trim()) {
      formErrors.message = "Le message est requis.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      emailjs
        .sendForm(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          form,
          "YOUR_USER_ID"
        )
        .then(() => {
          setIsSubmitting(false);
          form.reset();
          setErrors({});
          alert("Votre message a été envoyé avec succès!");
        })
        .catch((error) => {
          console.error("Erreur d'envoi de l'email: ", error);
          alert("Une erreur s'est produite. Veuillez réessayer.");
          setIsSubmitting(false);
        });
    }
  };

  return (
    <form onSubmit={sendEmail} className="flex flex-col gap-4 items-center mt-5">
      <div>
        <input type="text" name="user_name" className="border border-gray-500 w-[250px] px-4 py-2 rounded-md" placeholder="Nom" />
        {errors.user_name && <p style={{ color: "red" }}>{errors.user_name}</p>}
      </div>
      <div>
        <input type="email" name="user_email" className="border border-gray-500 w-[250px] px-4 py-2 rounded-md" placeholder="Email" />
        {errors.user_email && <p style={{ color: "red" }}>{errors.user_email}</p>}
      </div>
      <div>
        <textarea placeholder="Message" name="message" className="border border-gray-500 w-[400px] px-4 py-2 rounded-md"></textarea>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
      </div>
      <input type="submit" value="Envoyer" disabled={isSubmitting} className="border border-gray-500 cursor-pointer px-4 py-2 rounded-md" />
    </form>
  );
};

export default ContactForm;