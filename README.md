# schoolRegistration# KSA - Klick System Academic

Landing page responsiva para divulgação do KSA (Klick System Academic), uma solução focada em modernizar a comunicação e a gestão acadêmica de instituições de ensino.

A aplicação apresenta o produto, seus recursos, benefícios, planos e um formulário de solicitação de implementação para escolas e faculdades.

---

## ✨ Funcionalidades

- **Header fixo com navegação suave**
  - Menu com navegação por âncoras.
  - Efeito de sombra ao rolar a página.

- **Seções institucionais**
  - Comunicação: explicação dos problemas de comunicação atuais e como o KSA resolve.
  - Dispositivos: destaque para a responsividade (desktop e mobile).
  - Depoimentos: cards com falas de coordenador, professora, aluno e coordenadora pedagógica.
  - Planos: cards de planos Free, Master e Premium.

- **Modal de inscrição**
  - Botão “Inscrever-se” que abre um modal com formulário.
  - Máscara e validação de **CNPJ**.
  - Máscara de **telefone**.
  - Validação básica de **e‑mail**.
  - Validação de campos obrigatórios pelo navegador.
  - Simulação de envio (log no console e `alert` de sucesso).

- **Animações e UX**
  - Animação de entrada para cards em seções de recursos/benefícios/depoimentos.
  - Bloqueio de scroll ao abrir o modal.
  - Prevenção de envio acidental do formulário com tecla Enter (exceto em `textarea`).

---

## Tecnologias utilizadas

- **HTML5** ([index.html](cci:7://file:///c:/Users/carla/Downloads/schoolRegistration/index.html:0:0-0:0))
- **CSS3** ([styles.css](cci:7://file:///c:/Users/carla/Downloads/schoolRegistration/styles.css:0:0-0:0))
- **JavaScript vanilla** ([script.js](cci:7://file:///c:/Users/carla/Downloads/schoolRegistration/script.js:0:0-0:0))
- **Google Fonts** (Inter)
- **Jest** (configurado em [package.json](cci:7://file:///c:/Users/carla/Downloads/schoolRegistration/package.json:0:0-0:0) para testes unitários em JS)

---

## 📁 Estrutura do projeto

```text
schoolRegistration/
├── index.html        # Estrutura da página
├── styles.css        # Estilos e responsividade
├── script.js         # Lógica do modal, máscaras e validações
├── src/
│   └── image/        # Imagens utilizadas na landing page
├── package.json      # Configuração do projeto e scripts de teste
├── jest.config.js    # Configuração do Jest
└── README.md         # Documentação do projeto
```

## 🚀 Como executar o projeto

1. Clonar o repositório

```bash 
git clone https://github.com/Carla-s-Romero/schoolRegistration.git
cd schoolRegistration
```

Abrir no navegador
- Abra o arquivo 
index.html
 diretamente em um navegador
ou
- Sirva o projeto com alguma extensão/servidor local (ex.: Live Server do VS Code).

Não há dependências de build; é um projeto front‑end estático.

## 🧪 Testes (Jest)
O projeto já está configurado com Jest como dependência de desenvolvimento.

Para instalar as dependências:
```bash 
npm install
```

Para rodar os testes:

```bash
npm test
```

## 📜 Licença
Este projeto está licenciado sob os termos da licença MIT