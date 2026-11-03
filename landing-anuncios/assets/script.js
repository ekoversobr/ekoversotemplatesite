(() => {
"use strict";
const config = window.LANDING_CONFIG || {};
const form = document.getElementById("lead-form");
const nameInput = document.getElementById("lead-name");
const feedback = document.getElementById("form-feedback");

document.title = "Contato | " + (config.companyName || "Empresa");
document.getElementById("company-name").textContent = config.companyName || "Nome da Empresa";
const logo = document.getElementById("company-logo");
logo.src = config.logoPath || "assets/logo-placeholder.svg";
logo.alt = "Logotipo " + (config.companyName || "da empresa");
document.documentElement.style.setProperty("--brand", config.primaryColor || "#174f9c");
document.documentElement.style.setProperty("--button", config.buttonColor || "#25D366");
document.documentElement.style.setProperty("--landing-background", 'url("' + (config.backgroundPath || "assets/background-placeholder.svg") + '")');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "";
  const name = nameInput.value.trim();
  const destination = String(config.whatsappDestination || "").replace(/[^0-9]/g, "");

  if (name.length < 2) {
    feedback.textContent = "Conte pra gente como podemos chamar você.";
    nameInput.focus();
    return;
  }
  if (!/^[0-9]{12,13}$/.test(destination) || destination === "5583999999999") {
    feedback.textContent = "O WhatsApp de atendimento ainda precisa ser configurado.";
    return;
  }

  const message = "Olá! Encontrei vocês no Google, me chamo " + name + " e gostaria de mais informações." ;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_form_submit",
    form_name: "landing_page_ads",
    company_name: config.companyName || ""
  });

  window.location.href = "https://wa.me/" + destination + "?text=" + encodeURIComponent(message);
});
})();