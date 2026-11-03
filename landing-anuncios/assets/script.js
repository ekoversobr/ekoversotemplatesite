(() => {
"use strict";
const config = window.LANDING_CONFIG || {};
const form = document.getElementById("lead-form");
const nameInput = document.getElementById("lead-name");
const phoneInput = document.getElementById("lead-phone");
const feedback = document.getElementById("form-feedback");

document.title = "Agendamento | " + (config.companyName || "Empresa");
document.getElementById("company-name").textContent = config.companyName || "Nome da Empresa";
const logo = document.getElementById("company-logo");
logo.src = config.logoPath || "assets/logo-placeholder.svg";
logo.alt = "Logotipo " + (config.companyName || "da empresa");
document.documentElement.style.setProperty("--brand", config.primaryColor || "#174f9c");
document.documentElement.style.setProperty("--button", config.buttonColor || "#66c5e5");
document.documentElement.style.setProperty("--landing-background", 'url("' + (config.backgroundPath || "assets/background-placeholder.svg") + '")');

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9()+. -]/g, "").slice(0, 20);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "";
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const digits = phone.replace(/[^0-9]/g, "");
  const destination = String(config.whatsappDestination || "").replace(/[^0-9]/g, "");

  if (name.length < 2) {
    feedback.textContent = "Informe seu nome para continuar.";
    nameInput.focus();
    return;
  }
  if (digits.length < 10 || digits.length > 13) {
    feedback.textContent = "Confira seu número de WhatsApp com DDD.";
    phoneInput.focus();
    return;
  }
  if (!/^[0-9]{12,13}$/.test(destination) || destination === "5583999999999") {
    feedback.textContent = "O WhatsApp de atendimento ainda precisa ser configurado.";
    return;
  }

  const message = [
    "Olá, tudo bem? Encontrei vocês no Google, preenchi um formulário de agendamento e gostaria de mais informações.",
    "",
    "Nome: " + name,
    "Meu WhatsApp: " + phone
  ].join(String.fromCharCode(10));

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_form_submit",
    form_name: "landing_page_ads",
    company_name: config.companyName || ""
  });

  window.location.href = "https://wa.me/" + destination + "?text=" + encodeURIComponent(message);
});
})();