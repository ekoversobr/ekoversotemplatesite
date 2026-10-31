/*
 * Eko Verso Digital — site master v1
 * Importante: o clique no WhatsApp é uma interação, não um lead confirmado.
 * Não disparar generate_lead/form_submit_success neste formulário, pois ele apenas
 * prepara uma mensagem para WhatsApp e não confirma envio nem armazena o lead.
 */
const EKO_CONFIG = {
  whatsappNumber: "5583996224306",
  businessName: "Eko Verso Digital",
  email: "ekoversobr@gmail.com",
  gtmContainerId: "" // Inserir somente após criar e validar um contêiner exclusivo.
};

window.dataLayer = window.dataLayer || [];
function trackInteraction(eventName, params = {}) {
  // Eventos locais de interação só entram no dataLayer; sem GTM ativo não são enviados.
  window.dataLayer.push({ event: eventName, ...params });
}

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const source = link.dataset.source || link.dataset.cta || "site";
  const message = `Olá! Vim pelo site da ${EKO_CONFIG.businessName} e gostaria de conversar sobre serviços. Origem do contato: ${source}.`;
  link.href = `https://wa.me/${EKO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.addEventListener("click", () => {
    trackInteraction("whatsapp_click", {
      link_text: (link.textContent || "").trim().slice(0, 100),
      link_location: source,
      page_path: window.location.pathname
    });
  });
});

document.querySelectorAll("[data-cta]").forEach((el) => {
  if (el.hasAttribute("data-whatsapp-link")) return;
  el.addEventListener("click", () => {
    trackInteraction("cta_click", {
      cta_name: el.dataset.cta,
      page_path: window.location.pathname
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }));
}

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const business = document.getElementById("business").value.trim();
    const service = document.getElementById("service").value;
    const details = document.getElementById("details").value.trim();
    const feedback = document.getElementById("form-feedback");

    if (!name || !phone || !business || !service) {
      feedback.textContent = "Preencha os campos obrigatórios para continuar.";
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      feedback.textContent = "Confira o número de WhatsApp informado.";
      return;
    }

    const lines = [
      `Olá! Gostaria de conversar com a ${EKO_CONFIG.businessName}.`,
      "",
      `Nome: ${name}`,
      `WhatsApp informado: ${phone}`,
      `Negócio: ${business}`,
      `Serviço de interesse: ${service}`,
      details ? `Detalhes: ${details}` : null,
      "",
      "Origem: formulário do site Eko Verso Digital."
    ].filter(Boolean);
    const url = `https://wa.me/${EKO_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

    trackInteraction("whatsapp_handoff", {
      form_name: "contact_form",
      service_interest: service,
      page_path: window.location.pathname
    });
    feedback.textContent = "O WhatsApp será aberto para você revisar e enviar a mensagem. O contato só será confirmado após o envio.";
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  });
}

document.querySelectorAll("#current-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Preservação básica dos parâmetros de campanha para facilitar futuras integrações.
// Não armazena dados pessoais nem envia parâmetros a terceiros por conta própria.
const params = new URLSearchParams(window.location.search);
const attribution = {};
["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid"].forEach((key) => {
  if (params.has(key)) attribution[key] = params.get(key);
});

if (Object.keys(attribution).length) {
  try {
    sessionStorage.setItem("eko_campaign_attribution", JSON.stringify(attribution));
  } catch (_) {}
}
