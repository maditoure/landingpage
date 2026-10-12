
const form = document.getElementById("leadForm");
const responseDiv = document.getElementById("formResponse");
const submitBtn = document.getElementById("submitBtn");

// URL du webhook Make
const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/dgkma6fur4om2ae5cnmdi9d11mjajpl2";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Traitement en cours...";
  responseDiv.className = "form-response";
  responseDiv.textContent = "";

  const formData = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    company: document.getElementById("company").value.trim(),
    message: document.getElementById("message").value.trim(),
    createdAt: new Date().toISOString()
  };

  try {
    // Envoyer les données au webhook Make
    const payload = new URLSearchParams({
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      createdAt: formData.createdAt
    });

    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      body: payload
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP : ${res.status}`);
    }

    responseDiv.className = "form-response success";
    responseDiv.textContent =
      "Demande envoyée. Merci pour votre intérêt !";

    form.reset();

  } catch (error) {
    console.error("Erreur d'envoi vers Make :", error);

    responseDiv.className = "form-response error";
    responseDiv.textContent =
      "Échec de l'envoi. Vérifiez la connexion au webhook Make et réessayez.";

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});