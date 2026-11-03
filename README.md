# Eko Verso Digital — Template Master de Sites & Landing Pages

Repositório-base para implantação de presença digital e campanhas de aquisição em clientes. **Separar sempre a página principal do site institucional das landing pages de cada serviço anunciado.**

## Arquitetura recomendada

### 1. Site principal — presença institucional
- URL raiz do projeto: `/`
- Arquivos: `index.html`, `servicos.html`, `servicos/`, política de privacidade e páginas institucionais.
- Objetivo: apresentar a empresa, explicar soluções, construir confiança e encaminhar para contato ou página de serviço.
- Não deve ser tratado como destino padrão de todo anúncio de serviço quando uma landing específica for mais relevante.

### 2. Landing pages — uma página por serviço principal
- Diretório-modelo: `landing-anuncios/`
- Cada serviço/cliente terá sua própria cópia independente, com página, configuração e identificadores próprios.
- Exemplo de estrutura depois de clonar:
  ```
  campanhas/
    implante-dentario/
      index.html
      config.js
      assets/
    sedacao-consciente/
      index.html
      config.js
      assets/
    odontopediatria/
      index.html
      config.js
      assets/
  ```
- Cada URL deve corresponder a um único serviço, uma promessa/descrição comprovável, uma chamada principal e o WhatsApp/caminho de contato daquele cliente.
- Usar sitelinks para outras páginas úteis, não criar cópias quase idênticas sem conteúdo específico.
- Para cada serviço, definir UTMs e nomear evento/relatório de forma consistente. Manter o mesmo esquema de eventos; segmentar com `page_path`, `page_location` ou parâmetro não sensível `service_slug`.

## Separação por cliente
- Manter o template master neutro, sem IDs reais, dados de contato de clientes ou campanhas ativas.
- Criar clone/repositório de produção para cada cliente.
- Não usar o GTM/GA4/Ads de um cliente em outro.
- A conta de anúncio, o domínio e os dados de leads devem pertencer/controlar o cliente. A agência recebe acesso de gestor.
- Não guardar senhas, tokens, segredos, dados pessoais ou dados clínicos em arquivos, URLs ou dataLayer.

## Rastreamento e significado dos eventos
Eventos mínimos sugeridos:
- `page_view`: visita à página.
- `cta_click`: clique em uma chamada.
- `whatsapp_click`: clique em link direto de WhatsApp.
- `whatsapp_handoff`: formulário validado que prepara/encaminha uma mensagem ao WhatsApp.
- `lead_received`: só pode ser disparado após confirmação de recebimento pelo endpoint/CRM.
- `qualified_lead`, `appointment_scheduled`, `appointment_attended`, `purchase`: resultado comercial, idealmente integrado/importado do CRM e sem dados sensíveis.

**Não tratar clique ou encaminhamento para WhatsApp como mensagem enviada, conversa, lead qualificado, agendamento ou venda.** O formulário da landing atual abre o WhatsApp; não é um CRM e não confirma que a mensagem foi enviada.

## Publicação — checklist
1. Clonar o repositório para um projeto de produção separado do master.
2. Personalizar identidade, conteúdo e página específica do serviço.
3. Definir o WhatsApp e testar em celular e computador.
4. Inserir ID GTM próprio nos dois pontos do snippet (ou remover o snippet e usar outra implementação deliberada, nunca duplicada).
5. Configurar tags, acionadores e variáveis no GTM; o snippet sozinho não cria conversões.
6. Configurar GA4 e conversões Google Ads do próprio cliente.
7. Validar Preview/Tag Assistant, DebugView e teste de formulário/WhatsApp.
8. Confirmar que nenhum ID de outro cliente foi copiado.
9. Revisar política de privacidade, consentimento e coleta de dados.
10. Registrar evidência e liberar a URL para campanhas somente após validação.

## Estado atual do projeto
- O repositório master contém site institucional e a pasta `landing-anuncios`.
- A landing atual na branch `main` contém configurações do piloto Eko Clínica (GTM `GTM-T3CRR3MD`, WhatsApp de teste Eko Verso). **Não usar esta versão publicada como template neutro nem para veicular anúncios de clientes sem separar e substituir as configurações.**
- A página institucional contém WhatsApp e Apps Script ligados à Eko Verso Digital. Antes de clonar, separar e parametrizar esses dados e auditar o destino dos leads.
- A política de privacidade é um rascunho e deve ser revisada para o tratamento real de cada cliente.

## Fluxo de implantação
`Diagnóstico comercial → Site institucional → Landing específica do serviço → GTM/GA4/Ads → QA de eventos → Campanha → CRM/leads → Agendamentos → Comparecimento → Venda/receita → Otimização`

A conversão que importa não é o clique isolado: é o resultado comercial rastreável, com definição, evidência e atribuição.
