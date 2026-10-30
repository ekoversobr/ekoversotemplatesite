// TEMPLATE: substitua pelos dados específicos de cada cliente antes de publicar.
const SITE_CONFIG = {
  whatsappNumber: "5500000000000", // Formato internacional: código do país + DDD + número, somente dígitos.
  businessName: "Nome da Clínica",
  phoneDisplay: "(00) 00000-0000",
  address: "Cadastre aqui o endereço completo",
  hours: "Cadastre aqui os horários de atendimento"
};

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const message = `Olá! Vim pelo site da ${SITE_CONFIG.businessName} e gostaria de solicitar informações e orçamento.`;
  link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
});

document.querySelectorAll("[data-phone-display]").forEach((el) => el.textContent = SITE_CONFIG.phoneDisplay);
document.querySelectorAll("[data-address]").forEach((el) => el.textContent = SITE_CONFIG.address);
document.querySelectorAll("[data-hours]").forEach((el) => el.textContent = SITE_CONFIG.hours);

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

const dropdown = document.querySelector(".nav-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdown.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const feedback = document.getElementById("form-feedback");

    if (!name || !phone || !service) {
      feedback.textContent = "Preencha seu nome, telefone e o serviço desejado.";
      return;
    }

    if (!/^\d{12,13}$/.test(SITE_CONFIG.whatsappNumber)) {
      feedback.textContent = "Este site ainda está em configuração. Entre em contato com o responsável pelo site.";
      return;
    }

    const lines = [
      `Olá! Gostaria de falar com a ${SITE_CONFIG.businessName}.`,
      "",
      `Nome: ${name}`,
      `Meu telefone: ${phone}`,
      email ? `E-mail: ${email}` : null,
      `Solicitação: ${service}`,
      "",
      "Vim pelo site e gostaria de mais informações."
    ].filter(Boolean);

    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    feedback.textContent = "Abrindo o WhatsApp para você revisar e enviar a mensagem…";
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
