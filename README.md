# 💻 Chamados Pendentes | Suporte

Sistema web desenvolvido para registrar e acompanhar atendimentos realizados pelo Suporte antes da abertura do chamado oficial no GLPI.

O projeto foi criado para facilitar o controle de pendências, organizar as cobranças aos colaboradores e manter um histórico dos atendimentos que ainda precisam ser registrados no sistema oficial.

## 🚀 Acesse o projeto

**[Clique aqui para acessar o Portal Chamados Pendentes](https://gsbacchi.github.io/chamados_pendentes/)**

## 🎯 Objetivo

Centralizar o registro de atendimentos realizados fora do GLPI, permitindo que o Suporte acompanhe os casos que ainda precisam de abertura de chamado e cobre os colaboradores quando necessário.

## ⚙️ Funcionalidades

- Cadastro de atendimentos pendentes.
- Identificação do funcionário, filial, carteira e técnico responsável.
- Registro da categoria, canal de atendimento, descrição e data.
- Acompanhamento das pendências registradas.
- Histórico de cobranças.
- Geração de mensagem para cobrança pelo Microsoft Teams.
- Organização das informações conforme o fluxo de atendimento do Suporte.

## 🛠️ Tecnologias utilizadas

- HTML5 — estrutura das páginas.
- CSS3 — layout e identidade visual.
- JavaScript — funcionalidades e interações.
- LocalStorage — armazenamento local dos dados no navegador.
- GitHub Pages — publicação e acesso ao sistema pela web.

## 📁 Estrutura do projeto

```text
chamados_pendentes/
├── css/       # Estilos e identidade visual
├── img/       # Imagens e recursos visuais
├── js/        # Scripts e funcionalidades
├── pages/     # Páginas do sistema
├── index.html # Página inicial
└── README.md  # Documentação do projeto
```

## 💾 Armazenamento dos dados

Atualmente, as informações são armazenadas no LocalStorage do navegador. Por isso, os registros ficam separados por navegador e dispositivo e não são sincronizados automaticamente entre usuários.

Limpar os dados do navegador pode apagar os registros salvos. Para uso compartilhado com dados centralizados, será necessário implementar um backend e um banco de dados.

## 🌐 Publicação

O projeto está hospedado no GitHub Pages e pode ser acessado pelo link:

https://gsbacchi.github.io/chamados_pendentes/

## 👩‍💻 Desenvolvimento

**Projeto:** Chamados Pendentes  
**Responsável pelo desenvolvimento:** Giovana Bacchi  
**Área:** Suporte  
**Versão:** 1.0

---

*Projeto desenvolvido para melhorar a organização e o acompanhamento dos atendimentos pendentes do Suporte.*
