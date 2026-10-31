```javascript
/*
 * Eko Verso Digital — site master v2
 * Mantém o menu, os links de WhatsApp e o formulário.
 * Envia os dados do formulário ao Google Apps Script e prepara
 * a mensagem para o WhatsApp.
 *
 * IMPORTANTE:
 * O envio para o WhatsApp não confirma que a mensagem foi enviada.
 * O envio ao Apps Script também deve ser validado na planilha.
 */

const EKO_CONFIG = {
  whatsappNumber: "5583996224306",
  businessName: "Eko Verso Digital",
  email: "ekoversobr@gmail.com",
  gtmContainerId: "",
  leadsEndpoint:
    "https://script.google.com/macros/s/AKfycbzJNJm4-tVmYKyOWY7lATkGATZ8XHKfFCBg4qBBljhbtheRTkXt2pi4tjdvDLk8zR4O/exec"
};

/* =========================================
   RASTREAMENTO DE INTERAÇÕES
========================================= */

window.dataLayer = window.dataLayer || [];

function trackInteraction(eventName, params = {}) {
  window.dataLayer.push({
    event: eventName,
    ...params
  });
}

/* =========================================
   LINKS DIRETOS PARA WHATSAPP
========================================= */

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const source =
    link.dataset.source ||
    link.dataset.cta ||
    "site";

  const message =
    `Olá! Vim pelo site da ${EKO_CONFIG.businessName} ` +
    `e gostaria de conversar sobre serviços. ` +
    `Origem do contato: ${source}.`;

  link.href =
    `https://wa.me/${EKO_CONFIG.whatsappNumber}` +
    `?text=${encodeURIComponent(message)}`;

  link.addEventListener("click", () => {
    trackInteraction("whatsapp_click", {
      link_text: (link.textContent || "").trim().slice(0, 100),
      link_location: source,
      page_path: window.location.pathname
    });
  });
});

/* =========================================
   BOTÕES E CHAMADAS PARA AÇÃO
========================================= */

document.querySelectorAll("[data-cta]").forEach((element) => {
  if (element.hasAttribute("data-whatsapp-link")) {
    return;
  }

  element.addEventListener("click", () => {
    trackInteraction("cta_click", {
      cta_name: element.dataset.cta,
      page_path: window.location.pathname
    });
  });
});

/* =========================================
   MENU RESPONSIVO
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

/* =========================================
   ATRIBUIÇÃO DE CAMPANHAS
========================================= */

function getCampaignAttribution() {
  const params = new URLSearchParams(window.location.search);

  let saved = {};

  try {
    saved = JSON.parse(
      sessionStorage.getItem("eko_campaign_attribution") || "{}"
    );
  } catch (error) {
    saved = {};
  }

  const attribution = {};

  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "gbraid",
    "wbraid"
  ].forEach((key) => {
    attribution[key] =
      params.get(key) ||
      saved[key] ||
      "";
  });

  const currentParams = {};

  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "gbraid",
    "wbraid"
  ].forEach((key) => {
    if (params.has(key)) {
      currentParams[key] = params.get(key);
    }
  });

  if (Object.keys(currentParams).length > 0) {
    try {
      sessionStorage.setItem(
        "eko_campaign_attribution",
        JSON.stringify({
          ...saved,
          ...currentParams
        })
      );
    } catch (error) {
      // O site continua funcionando se o armazenamento estiver bloqueado.
    }
  }

  return attribution;
}

/* =========================================
   ENVIO PARA O GOOGLE APPS SCRIPT
========================================= */

async function sendLeadToSpreadsheet(lead) {
  const response = await fetch(EKO_CONFIG.leadsEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(lead),
    keepalive: true
  });

  /*
   * Com mode: "no-cors", o navegador não permite ler a resposta.
   * Portanto, chegar aqui significa apenas que a requisição foi
   * concluída do ponto de vista do navegador — não comprova que
   * o Apps Script gravou o lead na planilha.
   */
  return response;
}

/* =========================================
   FORMULÁRIO DE LEADS
========================================= */

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameElement = document.getElementById("name");
    const phoneElement = document.getElementById("phone");
    const businessElement = document.getElementById("business");
    const serviceElement = document.getElementById("service");
    const detailsElement = document.getElementById("details");
    const feedback = document.getElementById("form-feedback");
    const submitButton = form.querySelector('[type="submit"]');

    if (
      !nameElement ||
      !phoneElement ||
      !businessElement ||
      !serviceElement ||
      !detailsElement ||
      !feedback
    ) {
      console.error(
        "Formulário incompleto: verifique os IDs dos campos no HTML."
      );
      return;
    }

    const name = nameElement.value.trim();
    const phone = phoneElement.value.trim();
    const business = businessElement.value.trim();
    const service = serviceElement.value;
    const details = detailsElement.value.trim();

    /* Validação dos campos obrigatórios */

    if (!name || !phone || !business || !service) {
      feedback.textContent =
        "Preencha os campos obrigatórios para continuar.";
      return;
    }

    const digits = phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      feedback.textContent =
        "Confira o número de WhatsApp informado.";
      return;
    }

    /* Evita envios repetidos por cliques sucessivos */

    if (submitButton && submitButton.disabled) {
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    feedback.textContent = "Preparando seu contato...";

    const attribution = getCampaignAttribution();

    const pageUrl = window.location.href;
    const pagePath = window.location.pathname;

    const isSitelink =
      /sitelink/i.test(pagePath) ||
      /servico-\d+/i.test(pagePath);

    const lead = {
      name: name,
      phone: phone,
      business: business,
      service: service,
      details: details,

      page: pageUrl,

      source: isSitelink
        ? "Google Ads - Sitelink"
        : "Site",

      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,

      gclid: attribution.gclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid
    };

    /*
     * Abre uma janela vazia durante o clique do usuário.
     * Isso reduz o risco de o navegador bloquear o WhatsApp
     * depois da espera pela requisição.
     */

    let whatsappWindow = null;

    try {
      whatsappWindow = window.open("about:blank", "_blank");
    } catch (error) {
      whatsappWindow = null;
    }

    /* Prepara a mensagem do WhatsApp */

    const lines = [
      `Olá! Gostaria de conversar com a ${EKO_CONFIG.businessName}.`,
      "",
      `Nome: ${name}`,
      `WhatsApp informado: ${phone}`,
      `Negócio: ${business}`,
      `Serviço de interesse: ${service}`,
      `Página de origem: ${pageUrl}`,
      details ? `Detalhes: ${details}` : null,
      "",
      "Origem: formulário do site Eko Verso Digital."
    ].filter(Boolean);

    const whatsappUrl =
      `https://wa.me/${EKO_CONFIG.whatsappNumber}` +
      `?text=${encodeURIComponent(lines.join("\n"))}`;

    trackInteraction("whatsapp_handoff", {
      form_name: "contact_form",
      service_interest: service,
      page_path: pagePath
    });

    /*
     * Tenta enviar o lead antes de encaminhar para o WhatsApp.
     * Como a resposta é opaca, não é possível confirmar a gravação
     * somente pelo JavaScript do navegador.
     */

    try {
      await sendLeadToSpreadsheet(lead);
    } catch (error) {
      console.error(
        "Não foi possível concluir a requisição ao Apps Script:",
        error
      );
    }

    /* Encaminha para o WhatsApp */

    feedback.textContent =
      "O WhatsApp será aberto para você revisar e enviar a mensagem. " +
      "A gravação do contato deve ser confirmada na planilha.";

    if (whatsappWindow && !whatsappWindow.closed) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      /*
       * Se o navegador bloquear a janela, tenta abrir o WhatsApp
       * na própria aba para não impedir a continuidade do contato.
       */
      window.location.href = whatsappUrl;
    }

    if (submitButton) {
      submitButton.disabled = false;
    }
  });
}

/* =========================================
   ANO ATUAL NO RODAPÉ
========================================= */

document.querySelectorAll("#current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
```
