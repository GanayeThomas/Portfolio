  "use client";

  import { useState } from "react";
  import emailjs from "@emailjs/browser";

  const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const sendEmail = (e) => {
      e.preventDefault();
      const { user_name, user_email, message } = e.target.elements;
      let formErrors = {};

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
            process.env.NEXT_PUBLIC_SERVICE_ID,
            process.env.NEXT_PUBLIC_TEMPLATE_ID,  
            e.currentTarget,
            process.env.NEXT_PUBLIC_KEY
          )
          .then(() => {
            setIsSubmitting(false);
            e.target.reset();
            setErrors({}); // Réinitialiser les erreurs
            alert("Votre message a été envoyé avec succès!");
          })
          .catch((error) => {
            alert("Une erreur s'est produite. Veuillez réessayer." + error);
            setIsSubmitting(false);
          });
      }
      console.log(errors)

    };

    return (
      <form
        onSubmit={sendEmail}
        className="flex flex-col gap-4 items-center mt-5"
      >
        <div>
          <input
            type="text"
            name="user_name"
            className="border border-gray-500 w-[250px] px-4 py-2 rounded-md"
            placeholder="Nom"
          />
          {errors.user_name && <p style={{ color: "red" }}>{errors.user_name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="user_email"
            className="border border-gray-500 w-[250px] px-4 py-2 rounded-md"
            placeholder="Email"
          />
          {errors.user_email && (
            <p style={{ color: "red" }}>{errors.user_email}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Message"
            name="message"
            className="border border-gray-500 w-[400px] px-4 py-2 rounded-md"
          ></textarea>
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>

        <input
          type="submit"
          value="Envoyer"
          disabled={isSubmitting}
          className="border border-black cursor-pointer px-4 py-2 rounded-md"
        />
      </form>
    );
  };

  export default ContactForm;
