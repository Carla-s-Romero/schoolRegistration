const {
    validaCNPJ,
    normalizaCNPJ,
    aplicaMascaraCNPJ,
    validaEmail,
    aplicaMascaraTelefone,
    validaNomeResponsavel,
    validaEstado,
    validaMensagem
} = require('./utils');

// CT-001: Validar CNPJ válido e inválido
describe('CT-001 - Validar CNPJ válido e inválido', () => {
    test('Entrada: "45.723.174/0001-10" | Saída esperada: true', () => {
        expect(validaCNPJ('45.723.174/0001-10')).toBe(true);
    });

    test('Entrada: "12.345.678/0001-90" | Saída esperada: false', () => {
        expect(validaCNPJ('12.345.678/0001-90')).toBe(false);
    });
});

// CT-002: Normalizar CNPJ ao colar
describe('CT-002 - Normalizar CNPJ ao colar', () => {
    test('Entrada: " 45.723.174 / 0001-10 " | Saída esperada: "45.723.174/0001-10"', () => {
        const entrada = ' 45.723.174 / 0001-10 ';
        const normalizado = normalizaCNPJ(entrada);
        const formatado = aplicaMascaraCNPJ(normalizado);
        expect(formatado).toBe('45.723.174/0001-10');
    });
});

// CT-003: Validar e-mail com + e subdomínio
describe('CT-003 - Validar e-mail com + e subdomínio', () => {
    test('Entrada: "contato+ksa@exemplo.com.br" | Saída esperada: válido (true)', () => {
        expect(validaEmail('contato+ksa@exemplo.com.br')).toBe(true);
    });
});

// CT-004: Validar telefone com 9º dígito
describe('CT-004 - Validar telefone com 9º dígito', () => {
    test('Entrada: "11912345678" | Saída esperada: "(11) 91234-5678"', () => {
        expect(aplicaMascaraTelefone('11912345678')).toBe('(11) 91234-5678');
    });
});

// CT-005: Trim e tamanho mínimo do Nome do Responsável
describe('CT-005 - Trim e tamanho mínimo do Nome do Responsável', () => {
    test('Entrada: "  Ana " | Saída esperada: "Ana" e >= 2', () => {
        const resultado = validaNomeResponsavel('  Ana ', 2);
        expect(resultado.nomeTrimmed).toBe('Ana');
        expect(resultado.valido).toBe(true);
        expect(resultado.nomeTrimmed.length).toBeGreaterThanOrEqual(2);
    });
});

// CT-006: Validar seleção de Estado obrigatória
describe('CT-006 - Validar seleção de Estado obrigatória', () => {
    test('Entrada: Nenhuma seleção | Saída esperada: false', () => {
        expect(validaEstado('')).toBe(false);
        expect(validaEstado(null)).toBe(false);
        expect(validaEstado(undefined)).toBe(false);
    });
});

// CT-007: Validar limites de caracteres para a "Mensagem Adicional"
describe('CT-007 - Validar limites de caracteres para a "Mensagem Adicional"', () => {
    test('Entrada: Mensagem com 501 caracteres | Saída esperada: false e mensagem de erro', () => {
        const mensagem = 'a'.repeat(501);
        const resultado = validaMensagem(mensagem, 0, 500);
        expect(resultado.valido).toBe(false);
        expect(resultado.excedeu).toBe(true);
        expect(resultado.tamanho).toBe(501);
    });
});
