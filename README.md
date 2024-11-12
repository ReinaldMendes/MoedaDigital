# AgroCoin - Moeda Digital para Incentivo à Economia Local e Sustentável

Este repositório contém o código-fonte completo do **AgroCoin**, uma plataforma de moeda digital voltada para fortalecer o comércio e o agronegócio local, promovendo práticas sustentáveis. O projeto inclui um back-end desenvolvido em Node.js e um front-end em React Native, codificado na plataforma **snack.expo.dev**. Este projeto foi elaborado como um **MVP** (Produto Mínimo Viável) para validar o modelo de negócio.

## 📋 Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
AgroCoin/
├── Front-React-Native/
│   ├── assets/
│   ├── components/
│   ├── screens/
│   ├── .gitignore
│   ├── App.js
│   ├── app.json
│   ├── babel.config.js
│   ├── package.json
│   └── README.md
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routers/
│   ├── services/
│   ├── main.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
```

### Descrição dos Diretórios e Arquivos

#### Diretório do Front-end (React Native)

- **assets/**: Contém os recursos de mídia, como imagens e ícones utilizados na interface.
- **components/**: Inclui componentes reutilizáveis que são usados em diferentes partes do aplicativo.
- **screens/**: Contém as telas do aplicativo (como login, cadastro e transações).
- **App.js**: Arquivo principal do front-end que inicializa o aplicativo React Native.
- **app.json**: Configurações do aplicativo React Native.
- **babel.config.js**: Configurações do Babel para transpilar o código.
- **package.json**: Lista as dependências do projeto front-end.

#### Diretório do Back-end (Node.js - `src`)

- **config/**: Configurações, incluindo o acesso ao banco de dados.
- **controllers/**: Contém a lógica dos endpoints da API.
- **middlewares/**: Middlewares de segurança e validação de dados.
- **models/**: Modelos de dados do MongoDB usados no projeto.
- **routers/**: Configurações de rotas da API.
- **services/**: Serviços auxiliares, incluindo jwt-services para autenticação.
- **main.js**: Arquivo principal para iniciar o servidor da API.

#### Outros Arquivos

- **.env.example**: Exemplo do arquivo de variáveis de ambiente para configuração do projeto.
- **README.md**: Documentação principal do projeto.
- **package-lock.json** e **package.json**: Arquivos que listam as dependências do projeto e controlam as versões dos pacotes instalados.

---

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React Native (codificado na plataforma **snack.expo.dev**)
- **Hospedagem da API**: Render
- **Chatbot Integrado**: Node.js com integração à API do ChatGPT

---

## 🛠️ Desenvolvimento da API

A API do **AgroCoin** foi construída com **Node.js** e **Express**, estruturada para ser modular e escalável. Ela gerencia as operações de transações da moeda digital, autenticação de usuários e carteiras digitais, além de incluir um chatbot desenvolvido em Node.js, que utiliza a API do ChatGPT para responder perguntas em um contexto específico sobre a moeda e seus benefícios.

### Funcionalidades Principais da API

- **Cadastro e Autenticação de Usuários**
- **Gestão de Carteiras Digitais**
- **Transações**
- **Chatbot Contextualizado**: Implementado com a API do ChatGPT, o chatbot interage com os usuários, respondendo perguntas relacionadas ao uso da moeda e benefícios locais.

### Deploy da API

A API foi implantada na plataforma **Render**, e as variáveis de ambiente estão configuradas para garantir a segurança dos dados no ambiente de produção.

---

## 🌐 Desenvolvimento do Front-end

O front-end foi desenvolvido em **React Native** e codificado no **snack.expo.dev**. Ele inclui telas interativas e um design intuitivo para gerenciar transações de moeda digital e acompanhar os benefícios da AgroCoin.

### Passo a Passo para Executar o Front-end

1. Acesse o projeto no **snack.expo.dev** através do link deste repositório.
2. Faça login e carregue o projeto na plataforma.
3. Clique em "Run" para testar o aplicativo ou escaneie o QR Code com o app **Expo Go** para visualizar em um dispositivo móvel.

---

## Como Executar o Projeto

### Pré-requisitos

1. Instale o **Node.js** e o **MongoDB**.
2. Configure as variáveis de ambiente usando o `.env.example` como referência.

### Passo a Passo para o Backend

1. Navegue até o diretório `src`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

Este `README.md` fornece uma visão abrangente da estrutura e das funcionalidades do projeto **AgroCoin**, destacando o chatbot integrado e o objetivo de MVP, o que é ideal para um portfólio no GitHub.
