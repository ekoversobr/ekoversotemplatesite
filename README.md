# Eko Verso Digital — Template Mestre de Landing Pages

Modelo-base para criar landing pages de anúncios para clientes da Eko Verso Digital. Projeto estático em HTML, CSS e JavaScript, publicável no GitHub Pages.

## Regra principal: um cliente, uma configuração de medição

Este repositório é um **template**, não uma conta compartilhada de rastreamento. Antes de publicar uma cópia para um cliente, personalize os arquivos e use identificadores próprios:

- GTM: um contêiner por cliente/site (ou por conjunto de sites quando deliberadamente planejado).
- GA4: propriedade ou fluxo de dados definido para o cliente.
- Google Ads: ID de conversão e rótulo da ação pertencentes à conta de anúncios daquele cliente.
- WhatsApp: número de destino correto.
- Identidade visual: nome, logotipo, cores, textos e política de privacidade.

**Nunca publique os IDs de GTM, GA4 ou Google Ads de um cliente em outro cliente.** Não coloque senhas, tokens, chaves privadas ou credenciais neste repositório.

## Estrutura da landing page

- `landing-anuncios/index.html`: página da campanha.
- `landing-anuncios/config.js`: personalização do cliente.
- `landing-anuncios/assets/script.js`: validação e encaminhamento ao WhatsApp.
- `landing-anuncios/assets/styles.css`: estilos responsivos.

## Instalar o GTM em uma cópia de cliente

1. Crie um contêiner Web no Google Tag Manager para o cliente.
2. Abra `landing-anuncios/index.html`.
3. Substitua o marcador `GTM-COLOQUE_O_ID_DO_CLIENTE` pelo ID do contêiner daquele cliente, tanto no código do `<head>` quanto no `<noscript>`.
4. Não inclua outro snippet GTM na mesma página.
5. Publique e valide com o modo **Visualizar** do GTM/Tag Assistant.

No GTM, configure a tag base de Google/GA4 e os acionadores/eventos necessários. A instalação do snippet, sozinha, não cria conversões: tags e acionadores ainda precisam ser configurados e testados no contêiner.

## Eventos disponíveis no dataLayer

O formulário atual:
- valida o nome;
- dispara `whatsapp_form_submit` quando o usuário clica para continuar;
- abre o WhatsApp com uma mensagem pré-preenchida.

Esse evento representa **encaminhamento para o WhatsApp**, não comprova que a mensagem foi enviada, que houve conversa, agendamento ou venda. Não o trate como venda ou lead comercial confirmado. Prefira medir como interação/contato iniciado; a qualificação e os resultados posteriores devem ser registrados no CRM/planilha.

O evento não envia nome, telefone ou dados clínicos ao Google. Não acrescente informações pessoais ou sensíveis aos parâmetros do dataLayer, URLs ou plataformas de anúncios.

## Personalizar um cliente

Edite somente `landing-anuncios/config.js`:

- `companyName`
- `logoPath`
- `backgroundPath`
- `whatsappDestination` (formato internacional, apenas dígitos, começando por 55)
- `primaryColor`
- `buttonColor`

Revise também título, descrição, texto de privacidade, links e conteúdo da página. A política de privacidade e os avisos devem refletir o tratamento real de dados do cliente.

## Checklist antes de publicar

- [ ] Cópia/repositório do cliente separados do template mestre.
- [ ] WhatsApp conferido e testado em celular.
- [ ] Nome, logotipo, cores e conteúdo conferidos.
- [ ] ID GTM do cliente inserido nos dois pontos do snippet.
- [ ] Nenhum ID de outro cliente presente.
- [ ] Preview do GTM identifica o contêiner correto.
- [ ] Teste do formulário e encaminhamento ao WhatsApp realizado.
- [ ] Evento `whatsapp_form_submit` aparece uma única vez no dataLayer.
- [ ] Tags GA4/Google Ads configuradas e validadas, sem duplicidade.
- [ ] Conversão do Google Ads diferencia clique/encaminhamento de lead confirmado.
- [ ] Parâmetros de campanha testados; nenhum dado pessoal/sensível em URL/eventos.
- [ ] Consentimento, privacidade e retenção avaliados conforme o caso.

## Cliente piloto atual

A página publicada para a Eko Clínica usa o contêiner `GTM-T3CRR3MD`:

`https://ekoversobr.github.io/ekoversotemplatesite/landing-anuncios/`

**Atenção:** este ID é exclusivo da implementação da Eko Clínica. Antes de copiar a landing para outro cliente, substitua-o pelo ID do contêiner daquele cliente.
