(() => {
  "use strict";
  const config = window.LANDING_CONFIG || {};
  const form = document.getElementById("lead-form");
  const nameInput = document.getElementById("lead-name");
  const feedback = document.getElementById("form-feedback");
  if (!form || !nameInput) return;

  const logo = document.getElementById("company-logo");
  if (logo) {
    logo.src = config.logoPath || "assets/logo-placeholder.svg";
    logo.alt = "Logotipo " + (config.companyName || "da empresa");
  }
  document.documentElement.style.setProperty("--brand", config.primaryColor || "#174f9c");
  document.documentElement.style.setProperty("--button", config.buttonColor || "#25D366");
  document.documentElement.style.setProperty("--landing-background", 'url("' + (config.backgroundPath || "assets/background-placeholder.svg") + '")');

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (feedback) feedback.textContent = "";
    const name = nameInput.value.trim();
    const destination = String(config.whatsappDestination || "").replace(/\D/g, "");

    if (name.length < 2) {
      if (feedback) feedback.textContent = "Por favor, informe seu nome completo ou social.";
      nameInput.focus();
      return;
    }
    if (!/^55\d{10,11}$/.test(destination)) {
      if (feedback) feedback.textContent = "O WhatsApp de atendimento ainda precisa ser configurado.";
      return;
    }

    const message = "Olá! Encontrei vocês no Google, me chamo " + name + " e gostaria de mais informações.";
    const whatsappUrl = "https://wa.me/" + destination + "?text=" + encodeURIComponent(message);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_form_submit",
      form_name: "landing_page_ads",
      company_name: config.companyName || "",
      whatsapp_destination: destination
    });

    window.location.assign(whatsappUrl);
  });
})();