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

  // Mantém apenas parâmetros técnicos de atribuição; nunca capture dados pessoais aqui.
  const allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid"];
  const params = new URLSearchParams(window.location.search);
  const attribution = {};
  allowedParams.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value.slice(0, 500);
  });
  if (Object.keys(attribution).length) {
    try { sessionStorage.setItem("landing_attribution", JSON.stringify(attribution)); } catch (_) {}
  }

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

    const template = config.whatsappMessageTemplate || "Olá! Encontrei vocês e gostaria de mais informações.";
    const message = template.replaceAll("{name}", name).replaceAll("{service}", config.serviceName || "serviço");
    const whatsappUrl = "https://wa.me/" + destination + "?text=" + encodeURIComponent(message);

    // Evento técnico de encaminhamento. Não significa que a mensagem foi enviada,
    // que houve conversa, lead qualificado, agendamento ou venda.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_form_submit",
      form_name: "landing_page_ads",
      service_slug: String(config.serviceSlug || "").slice(0, 80)
    });

    window.location.assign(whatsappUrl);
  });
})();