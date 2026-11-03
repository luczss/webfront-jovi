# 📸 SnapFlow

<p align="center">
  <strong>Transforme momentos em boas fotografias.</strong>
</p>

<p align="center">
  Uma aplicação web interativa que utiliza recursos de câmera e algoritmos de análise de imagem para ajudar a melhorar suas fotografias.
</p>

<p align="center">
  <a href="https://webfront-jovi-kcc2-dqidggdxb-luczss.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_ACESSAR_PROJETO-Vercel-c8ff4d?style=for-the-badge&labelColor=171717" alt="Acessar SnapFlow">
  </a>
  <a href="https://github.com/luczss/webfront-jovi">
    <img src="https://img.shields.io/badge/GitHub-Repositório-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
</p>

---

## 📖 Sobre o projeto

O **SnapFlow** é um projeto desenvolvido como parte do Sprint 4 da disciplina de Web Development e Front-End Design da FIAP.

A proposta é oferecer uma experiência interativa para captura e análise de fotografias, permitindo que o usuário avalie aspectos importantes de uma imagem, como nitidez, exposição e composição.

A aplicação conta com uma câmera integrada ao navegador, sistema de análise visual, galeria de fotografias e uma área de referências para explorar e comparar imagens.

O objetivo é unir tecnologia, usabilidade e fotografia em uma única plataforma.

## ✨ Funcionalidades

- **Página inicial:** apresentação da proposta e dos recursos do SnapFlow.
- **Câmera integrada:** captura de fotografias diretamente pelo navegador.
- **Análise de imagem:** avaliação de nitidez, exposição e composição.
- **Pontuação geral:** resultado percentual baseado nos critérios de análise.
- **Sugestões de captura:** indicadores para auxiliar na qualidade das fotografias.
- **Modo Correria:** captura automática quando a análise identifica condições favoráveis.
- **Galeria pessoal:** armazenamento e organização das fotografias capturadas.
- **Privacidade:** opção de marcar fotografias como privadas, desfocando suas miniaturas.
- **Filtros:** organização das imagens de acordo com as categorias de cena.
- **Fotos de referência:** consulta de imagens externas para análise e inspiração.
- **Sistema de autenticação:** controle de acesso às funcionalidades protegidas.

> **Observação:** a análise de imagem utiliza algoritmos de visão computacional executados no navegador. Não utiliza um modelo de inteligência artificial nem envia as imagens da câmera para servidores.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| React 19 | Construção da interface |
| JavaScript | Lógica e funcionalidades |
| Vite | Ambiente de desenvolvimento e build |
| Tailwind CSS | Estilização da aplicação |
| React Router | Navegação entre páginas |
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização complementar |
| LocalStorage | Armazenamento local das capturas |
| Browser API | Acesso à câmera do dispositivo |
| Lorem Picsum API | Imagens de referência |
| Vercel | Hospedagem e deploy |

## 📂 Estrutura do projeto

```text
webfront-jovi/
│
├── src/
│   ├── components/
│   │   ├── camera/
│   │   ├── gallery/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── CameraPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── ReferencesPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Um editor de código, como [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/luczss/webfront-jovi.git
```

### 2. Entre na pasta do projeto

```bash
cd webfront-jovi
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse a aplicação

Após iniciar o servidor, o Vite disponibilizará um endereço local, geralmente:

```text
http://localhost:5173
```

Abra o endereço no navegador para utilizar o SnapFlow.

## 📜 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza a versão de produção localmente |
| `npm run lint` | Executa a verificação de código com ESLint |

## 🔐 Permissões e armazenamento

Para utilizar todos os recursos da aplicação, é importante considerar:

- **Câmera:** o navegador precisa de permissão para acessar a câmera do dispositivo.
- **Galeria:** as fotografias são armazenadas localmente utilizando LocalStorage.
- **Privacidade:** as imagens não são enviadas para um backend da aplicação.
- **Referências:** as fotografias externas são carregadas por meio da API Lorem Picsum.
- **Autenticação:** o projeto utiliza um sistema de sessão demonstrativa para controlar o acesso às páginas protegidas.

## 👨‍💻 Equipe de desenvolvimento

Projeto desenvolvido por estudantes de Engenharia de Software da FIAP.

| Integrante | RM |
|---|---|
| Eduardo Guzeli Nogueira | 571143 |
| Diego Caio de Ulhôa | 572190 |
| Lucas dos Santos Oliveira | 571718 |

## 🎓 Instituição

**FIAP — Faculdade de Informática e Administração Paulista**

Curso: Engenharia de Software

Disciplina: Web Development + Front-End Design

Projeto: Sprint 4

---

<p align="center">
  Desenvolvido com dedicação pela equipe SnapFlow.
</p>

<p align="center">
  <strong>SnapFlow © 2026</strong>
</p>
