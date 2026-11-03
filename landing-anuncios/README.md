# Landing pages de anúncios — template mestre

Esta pasta é o modelo de uma landing page curta, orientada a uma ação principal. Ela é diferente do site institucional e das páginas informativas de serviços.

## Uma landing por serviço anunciado

Duplique a pasta completa para cada serviço principal do cliente. Exemplo:
```
campanhas/
  implante-dentario/
    index.html
    config.js
    assets/
      script.js
      styles.css
      logo-placeholder.svg
      background-placeholder.svg
  sedacao-consciente/
    index.html
    config.js
    assets/
      script.js
      styles.css
      logo-placeholder.svg
      background-placeholder.svg
```

Cada pasta/URL deve conter uma oferta e um serviço bem definidos. Não clonar páginas idênticas mudando apenas o título: adaptar texto, serviço, região, diferenciais comprováveis, perguntas frequentes quando úteis e chamada de ação.

## Personalização

Edite `config.js` na cópia de produção:
- `companyName`: nome público do cliente.
- `logoPath`, `backgroundPath`: arquivos da identidade visual.
- `whatsappDestination`: número internacional apenas com dígitos (ex.: 55 + DDD + número).
- `whatsappMessageTemplate`: mensagem que será pré-preenchida; use `{name}` e `{service}`.
- `serviceName`: nome amigável do serviço.
- `serviceSlug`: identificador curto e sem dados pessoais, útil para relatórios.
- `primaryColor`, `buttonColor`: cores da marca.

## GTM, GA4 e Google Ads

O HTML contém duas ocorrências do marcador `GTM-COLOQUE_O_ID_DO_CLIENTE`. Substitua pelo ID do contêiner próprio do cliente na cópia, uma vez em cada ponto. Não misture ID entre clientes e não instale outro snippet do GTM na mesma página.

O evento `form_start` é acionado na primeira interação com o campo de nome. O evento `whatsapp_form_submit` é acionado após validação do formulário e antes do redirecionamento. O evento significa **pedido de encaminhamento ao WhatsApp**, não comprova que a pessoa enviou a mensagem ou iniciou uma conversa.

No GTM, crie os acionadores para esses eventos e valide com Preview/Tag Assistant. Só depois conecte GA4 e Google Ads. Não usar `whatsapp_form_submit` como compra/venda. A conversão primária deve refletir a meta de negócio e a capacidade real de confirmação; cliques de intenção podem ser secundários.

## Privacidade e qualidade

O formulário desta landing solicita apenas nome e abre o WhatsApp com mensagem pré-preenchida. Não armazena o lead em banco ou CRM. Não enviar nome, telefone, detalhes pessoais ou dados de saúde para GTM/GA4/Google Ads. O cliente deve revisar política de privacidade e consentimento conforme a implantação real.

## Antes de ativar anúncios

- [ ] Duplicar pasta para um serviço/cliente específico.
- [ ] Personalizar nome, serviço, logo, cores e textos.
- [ ] Conferir WhatsApp e mensagem em dispositivo móvel.
- [ ] Substituir o ID GTM nos dois pontos.
- [ ] Confirmar ausência de IDs de outros clientes.
- [ ] Validar `form_start` e `whatsapp_form_submit` no Tag Assistant.
- [ ] Validar GA4 e a ação de conversão Google Ads, evitando duplicidade.
- [ ] Usar URL final exclusiva e parâmetros UTM com nomenclatura consistente.
- [ ] Testar carregamento, acessibilidade, formulário e mensagem.
- [ ] Registrar a evidência no checklist de implantação.
