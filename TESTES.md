# Testes Unitários - School Registration

Este projeto contém testes unitários completos usando Jest para validar as funcionalidades do sistema de registro escolar.

## 📋 Casos de Teste Implementados

### CT01 - Validar CNPJ válido e inválido
- ✅ Validação de CNPJ com e sem formatação
- ✅ Rejeição de CNPJs com tamanho incorreto
- ✅ Rejeição de CNPJs com todos os dígitos iguais
- ✅ Validação de dígitos verificadores

### CT02 - Normalizar CNPJ ao colar
- ✅ Remoção de caracteres especiais (pontos, barras, hífens)
- ✅ Aplicação de máscara durante digitação
- ✅ Formatação completa do CNPJ

### CT03 - Validar e-mail com + e subdomínio
- ✅ Validação de e-mails simples
- ✅ Suporte a plus addressing (usuario+tag@domain.com)
- ✅ Suporte a subdomínios (usuario@mail.example.com)
- ✅ Combinação de + e subdomínios

### CT04 - Validar telefone com 9º dígito
- ✅ Validação de telefone celular (11 dígitos)
- ✅ Validação de telefone fixo (10 dígitos)
- ✅ Verificação do 9º dígito em celulares
- ✅ Aplicação de máscara para telefones

### CT05 - Trim e tamanho mínimo do Nome do Responsável
- ✅ Remoção de espaços em branco (trim)
- ✅ Validação de tamanho mínimo (3 caracteres)
- ✅ Tamanho mínimo configurável

### CT06 - Validar seleção de Estado obrigatória
- ✅ Rejeição de valores vazios, nulos ou indefinidos
- ✅ Aceitação de seleções válidas

### CT07 - Validar limites de caracteres para a "Mensagem Adicional"
- ✅ Validação de tamanho mínimo e máximo
- ✅ Limite padrão de 500 caracteres
- ✅ Limites configuráveis
- ✅ Contagem de caracteres especiais e quebras de linha

## 🚀 Como Executar os Testes

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
npm install
```

### Executar todos os testes
```bash
npm test
```

### Executar testes com cobertura
```bash
npm run test:coverage
# ou
npx jest --coverage
```

### Executar testes em modo watch (desenvolvimento)
```bash
npm run test:watch
# ou
npx jest --watch
```

### Executar apenas testes específicos
```bash
# Por exemplo, apenas testes de CNPJ (CT01)
npx jest --testNamePattern="CT01"

# Apenas testes de E-mail (CT03)
npx jest --testNamePattern="CT03"

# Ou especificar o nome completo do describe
npx jest --testNamePattern="CT01 - Validar CNPJ"

# Executar um teste específico pelo nome
npx jest --testNamePattern="deve validar CNPJ válido"
```

## 📊 Estrutura dos Arquivos

```
LP KSA/
├── src/
│   ├── utils.js          # Funções utilitárias e validações
│   └── utils.test.js     # Testes unitários
├── jest.config.js        # Configuração do Jest
├── package.json          # Dependências e scripts
└── TESTES.md            # Esta documentação
```

## 🧪 Exemplo de Saída

```
PASS  src/utils.test.js
  CT01 - Validar CNPJ válido e inválido
    ✓ deve validar CNPJ válido sem formatação
    ✓ deve validar CNPJ válido com formatação
    ✓ deve rejeitar CNPJ com menos de 14 dígitos
    ...

Test Suites: 1 passed, 1 total
Tests:       60 passed, 60 total
Snapshots:   0 total
Time:        2.5s
```

## 📝 Funções Testadas

- `validaCNPJ(cnpj)` - Valida CNPJ
- `normalizaCNPJ(cnpj)` - Remove formatação do CNPJ
- `aplicaMascaraCNPJ(value)` - Aplica máscara no CNPJ
- `validaEmail(email)` - Valida e-mail
- `aplicaMascaraTelefone(value)` - Aplica máscara no telefone
- `validaTelefone(telefone)` - Valida telefone
- `validaTelefoneCelular(telefone)` - Valida telefone celular com 9º dígito
- `validaNomeResponsavel(nome, tamanhoMinimo)` - Valida nome com trim
- `validaEstado(estado)` - Valida seleção de estado
- `validaMensagem(mensagem, min, max)` - Valida limites de caracteres

## 🔧 Configuração do Jest

O Jest está configurado para:
- Ambiente Node.js
- Cobertura de código automática
- Modo verbose (saída detalhada)
- Coleta de cobertura apenas de arquivos não-teste

## 📈 Cobertura de Código

Para gerar relatório de cobertura:
```bash
npm run test:coverage
# ou
npx jest --coverage
```

O relatório será gerado na pasta `coverage/` e mostrará:
- Linhas cobertas
- Funções cobertas
- Branches cobertas
- Statements cobertas

## 🐛 Debugging

Para debugar testes:
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📚 Recursos Adicionais

- [Documentação do Jest](https://jestjs.io/docs/getting-started)
- [Matchers do Jest](https://jestjs.io/docs/expect)
- [Cobertura de Código](https://jestjs.io/docs/configuration#collectcoverage-boolean)

## ✨ Contribuindo

Ao adicionar novos testes:
1. Siga o padrão de nomenclatura: `CT## - Descrição`
2. Agrupe testes relacionados usando `describe()`
3. Use nomes descritivos para os casos de teste
4. Inclua casos de borda e valores extremos
5. Mantenha a cobertura de código acima de 80%

## 🎯 Exemplos de Comandos Úteis

### Executar todos os casos de teste (CT)
```bash
npx jest --testNamePattern="CT01"  # Apenas CNPJ
npx jest --testNamePattern="CT02"  # Apenas normalização CNPJ
npx jest --testNamePattern="CT03"  # Apenas e-mail
npx jest --testNamePattern="CT04"  # Apenas telefone
npx jest --testNamePattern="CT05"  # Apenas nome responsável
npx jest --testNamePattern="CT06"  # Apenas estado
npx jest --testNamePattern="CT07"  # Apenas mensagem
```

### Executar múltiplos casos de teste
```bash
# Executar CT01 e CT02
npx jest --testNamePattern="CT01|CT02"

# Executar todos os testes de validação
npx jest --testNamePattern="validar"
```

### Ver detalhes completos dos testes
```bash
npx jest --verbose
```
