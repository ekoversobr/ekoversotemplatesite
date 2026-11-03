# EKO LANDING ADS TEMPLATE 001

Página exclusiva para tráfego pago e captação de leads. Não é site institucional e não inclui menus, vitrine, rodapé ou navegação externa.

## Personalizar por cliente
1. Trocar `assets/logo-placeholder.svg` pelo logotipo do cliente.
2. Trocar `assets/background-placeholder.svg` por fotografia horizontal/landscape otimizada (WebP recomendado).
3. Editar `config.js`: nome, caminhos, WhatsApp de destino e cores.
4. Inserir o GTM específico do cliente no HTML, quando aplicável.
5. Testar em desktop e celular.

## Formulário
Campos: nome e WhatsApp. O botão abre o WhatsApp com a mensagem:
“Olá, tudo bem? Encontrei vocês no Google, preenchi um formulário de agendamento e gostaria de mais informações.”
Nome e telefone digitados são anexados à mensagem.

## Mensuração
O evento `whatsapp_form_submit` é enviado ao dataLayer no envio validado do formulário. Isso registra uma tentativa de encaminhamento, não comprova abertura do WhatsApp, envio da mensagem, agendamento ou venda. Configure e valide o acionador no GTM Preview antes de importar como conversão no Google Ads.

## Privacidade
Este modelo não armazena os dados em banco próprio. Eles são inseridos na mensagem que a pessoa poderá revisar e enviar no WhatsApp. A política de privacidade deve refletir as ferramentas de medição instaladas e as práticas do cliente.