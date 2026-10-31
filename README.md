# Eko Verso Digital — Site Master v1

Site estático em HTML, CSS e JavaScript, adaptado do modelo fornecido. Este é o projeto-piloto da Eko Verso Digital e a base para futuras versões personalizáveis para pequenos negócios locais.

## Estrutura
- `index.html` — site institucional e formulário de contato.
- `servicos.html` — visão geral dos serviços.
- `servicos/` — páginas de serviços.
- `campanhas/site-para-clinicas.html` — exemplo de landing page fora do menu principal, marcada como `noindex,follow`.
- `obrigado.html` — página informativa; não é prova de envio de lead.
- `politica-de-privacidade.html` — rascunho que deve ser revisado antes da publicação.
- `assets/css/styles.css` — estilos responsivos.
- `assets/js/script.js` — menu, mensagens de WhatsApp, eventos de interação e captura de parâmetros de campanha em `sessionStorage`.

## Dados da Eko Verso Digital
- WhatsApp: +55 83 99622-4306
- E-mail: ekoversobr@gmail.com
- Projeto: marketing digital, sites, geração de leads, Google Ads e rastreamento de conversões.

## Importante antes de publicar
1. Confirmar domínio, hospedagem e identidade visual final.
2. Revisar textos, serviços e política de privacidade.
3. Criar identificadores exclusivos para GTM, GA4 e Google Ads; inserir somente após configuração e testes.
4. Configurar consentimento de cookies/tecnologias quando aplicável e revisar requisitos legais.
5. Decidir como os formulários serão recebidos e armazenados. Atualmente o formulário apenas prepara uma mensagem e abre o WhatsApp; não armazena leads.
6. Não contar `whatsapp_click` ou `whatsapp_handoff` como lead confirmado. Eles medem interações/início do encaminhamento, não o envio da mensagem.
7. Para medir leads reais, implementar formulário com endpoint/serviço de recebimento ou processo de confirmação adequado.
8. Testar em dispositivos móveis, links, teclado, leitor de tela, parâmetros de campanha e eventos.
9. Não reutilizar IDs de medição entre clientes.

## Eventos preparados
- `whatsapp_click`: clique em link para WhatsApp.
- `whatsapp_handoff`: formulário encaminhou para o WhatsApp.
- `cta_click`: clique em CTA não associado ao WhatsApp.

Os eventos são enviados ao `dataLayer` local. Sem um contêiner GTM instalado e configurado, não são enviados a ferramentas externas. Não existe ainda evento de lead confirmado.

## Atribuição
Os parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid` e `wbraid` são guardados em `sessionStorage` quando estão presentes na URL. Ainda é necessário integrar essa atribuição com o formulário/CRM para associar os parâmetros ao lead real.

## Próximas etapas
1. Revisão visual e textual.
2. Definir domínio e publicação.
3. Escolher mecanismo real de recebimento de leads.
4. Criar e configurar GTM/GA4/Google Ads.
5. Validar tudo com modo de pré-visualização e testes antes de anunciar.
