const {
    validaCNPJ,
    normalizaCNPJ,
    aplicaMascaraCNPJ,
    validaEmail,
    aplicaMascaraTelefone,
    validaTelefone,
    validaTelefoneCelular,
    validaNomeResponsavel,
    validaEstado,
    validaMensagem
} = require('./utils');

describe('CT01 - Validar CNPJ válido e inválido', () => {
    test('deve validar CNPJ válido sem formatação', () => {
        expect(validaCNPJ('11222333000181')).toBe(true);
    });

    test('deve validar CNPJ válido com formatação', () => {
        expect(validaCNPJ('11.222.333/0001-81')).toBe(true);
    });

    test('deve rejeitar CNPJ com menos de 14 dígitos', () => {
        expect(validaCNPJ('1122233300018')).toBe(false);
    });

    test('deve rejeitar CNPJ com mais de 14 dígitos', () => {
        expect(validaCNPJ('112223330001811')).toBe(false);
    });

    test('deve rejeitar CNPJ com todos os dígitos iguais', () => {
        expect(validaCNPJ('00000000000000')).toBe(false);
        expect(validaCNPJ('11111111111111')).toBe(false);
    });

    test('deve rejeitar CNPJ com dígitos verificadores inválidos', () => {
        expect(validaCNPJ('11222333000180')).toBe(false);
        expect(validaCNPJ('11222333000182')).toBe(false);
    });

    test('deve rejeitar CNPJ vazio ou nulo', () => {
        expect(validaCNPJ('')).toBe(false);
        expect(validaCNPJ(null)).toBe(false);
    });

    test('deve validar outros CNPJs válidos conhecidos', () => {
        expect(validaCNPJ('34028316000103')).toBe(true); // Apple Computer Brasil
        expect(validaCNPJ('33000167000101')).toBe(true); // Cielo
    });
});

describe('CT02 - Normalizar CNPJ ao colar', () => {
    test('deve remover pontos, barra e hífen do CNPJ formatado', () => {
        expect(normalizaCNPJ('11.222.333/0001-81')).toBe('11222333000181');
    });

    test('deve manter apenas números do CNPJ', () => {
        expect(normalizaCNPJ('11.222.333/0001-81')).toBe('11222333000181');
    });

    test('deve remover caracteres especiais diversos', () => {
        expect(normalizaCNPJ('11@222#333$0001%81')).toBe('11222333000181');
    });

    test('deve aplicar máscara corretamente ao CNPJ', () => {
        expect(aplicaMascaraCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    });

    test('deve aplicar máscara parcial durante digitação', () => {
        expect(aplicaMascaraCNPJ('11')).toBe('11');
        expect(aplicaMascaraCNPJ('112')).toBe('11.2');
        expect(aplicaMascaraCNPJ('11222')).toBe('11.222');
        expect(aplicaMascaraCNPJ('11222333')).toBe('11.222.333');
        expect(aplicaMascaraCNPJ('112223330001')).toBe('11.222.333/0001');
        expect(aplicaMascaraCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    });

    test('deve lidar com CNPJ vazio', () => {
        expect(normalizaCNPJ('')).toBe('');
    });
});

describe('CT03 - Validar e-mail com + e subdomínio', () => {
    test('deve validar e-mail simples', () => {
        expect(validaEmail('usuario@example.com')).toBe(true);
    });

    test('deve validar e-mail com + (plus addressing)', () => {
        expect(validaEmail('usuario+teste@example.com')).toBe(true);
        expect(validaEmail('usuario+123@example.com')).toBe(true);
    });

    test('deve validar e-mail com subdomínio', () => {
        expect(validaEmail('usuario@mail.example.com')).toBe(true);
        expect(validaEmail('usuario@sub.domain.example.com')).toBe(true);
    });

    test('deve validar e-mail com + e subdomínio', () => {
        expect(validaEmail('usuario+tag@mail.example.com')).toBe(true);
    });

    test('deve rejeitar e-mail sem @', () => {
        expect(validaEmail('usuarioexample.com')).toBe(false);
    });

    test('deve rejeitar e-mail sem domínio', () => {
        expect(validaEmail('usuario@')).toBe(false);
    });

    test('deve rejeitar e-mail sem nome de usuário', () => {
        expect(validaEmail('@example.com')).toBe(false);
    });

    test('deve rejeitar e-mail com espaços', () => {
        expect(validaEmail('usuario @example.com')).toBe(false);
        expect(validaEmail('usuario@ example.com')).toBe(false);
    });

    test('deve rejeitar e-mail sem extensão', () => {
        expect(validaEmail('usuario@example')).toBe(false);
    });

    test('deve validar e-mails corporativos comuns', () => {
        expect(validaEmail('nome.sobrenome@empresa.com.br')).toBe(true);
        expect(validaEmail('contato+vendas@suporte.empresa.com')).toBe(true);
    });
});

describe('CT04 - Validar telefone com 9º dígito', () => {
    test('deve validar telefone celular com 11 dígitos (9º dígito)', () => {
        expect(validaTelefoneCelular('11987654321')).toBe(true);
        expect(validaTelefoneCelular('21987654321')).toBe(true);
    });

    test('deve validar telefone celular formatado com 9º dígito', () => {
        expect(validaTelefoneCelular('(11) 98765-4321')).toBe(true);
        expect(validaTelefoneCelular('(21) 98765-4321')).toBe(true);
    });

    test('deve rejeitar telefone celular sem 9º dígito', () => {
        expect(validaTelefoneCelular('1187654321')).toBe(false); // 10 dígitos
    });

    test('deve rejeitar telefone que não começa com 9', () => {
        expect(validaTelefoneCelular('11887654321')).toBe(false); // terceiro dígito é 8
        expect(validaTelefoneCelular('11787654321')).toBe(false); // terceiro dígito é 7
    });

    test('deve validar telefone fixo (10 dígitos)', () => {
        expect(validaTelefone('1133334444')).toBe(true);
        expect(validaTelefone('(11) 3333-4444')).toBe(true);
    });

    test('deve validar telefone celular (11 dígitos)', () => {
        expect(validaTelefone('11987654321')).toBe(true);
        expect(validaTelefone('(11) 98765-4321')).toBe(true);
    });

    test('deve aplicar máscara para telefone fixo', () => {
        expect(aplicaMascaraTelefone('1133334444')).toBe('(11) 3333-4444');
    });

    test('deve aplicar máscara para telefone celular com 9º dígito', () => {
        expect(aplicaMascaraTelefone('11987654321')).toBe('(11) 98765-4321');
    });

    test('deve rejeitar telefone com menos de 10 dígitos', () => {
        expect(validaTelefone('119876543')).toBe(false);
    });

    test('deve rejeitar telefone com mais de 11 dígitos', () => {
        expect(validaTelefone('119876543219')).toBe(false);
    });
});

describe('CT05 - Trim e tamanho mínimo do Nome do Responsável', () => {
    test('deve aceitar nome com mais de 3 caracteres', () => {
        const resultado = validaNomeResponsavel('João Silva');
        expect(resultado.valido).toBe(true);
        expect(resultado.nomeTrimmed).toBe('João Silva');
    });

    test('deve aplicar trim em nome com espaços no início', () => {
        const resultado = validaNomeResponsavel('   João Silva');
        expect(resultado.valido).toBe(true);
        expect(resultado.nomeTrimmed).toBe('João Silva');
    });

    test('deve aplicar trim em nome com espaços no final', () => {
        const resultado = validaNomeResponsavel('João Silva   ');
        expect(resultado.valido).toBe(true);
        expect(resultado.nomeTrimmed).toBe('João Silva');
    });

    test('deve aplicar trim em nome com espaços em ambos os lados', () => {
        const resultado = validaNomeResponsavel('   João Silva   ');
        expect(resultado.valido).toBe(true);
        expect(resultado.nomeTrimmed).toBe('João Silva');
    });

    test('deve rejeitar nome com menos de 3 caracteres após trim', () => {
        const resultado = validaNomeResponsavel('   Jo   ');
        expect(resultado.valido).toBe(false);
        expect(resultado.nomeTrimmed).toBe('Jo');
    });

    test('deve rejeitar nome vazio', () => {
        const resultado = validaNomeResponsavel('');
        expect(resultado.valido).toBe(false);
    });

    test('deve rejeitar nome com apenas espaços', () => {
        const resultado = validaNomeResponsavel('     ');
        expect(resultado.valido).toBe(false);
        expect(resultado.nomeTrimmed).toBe('');
    });

    test('deve aceitar nome com exatamente 3 caracteres', () => {
        const resultado = validaNomeResponsavel('Ana');
        expect(resultado.valido).toBe(true);
        expect(resultado.nomeTrimmed).toBe('Ana');
    });

    test('deve permitir configurar tamanho mínimo personalizado', () => {
        const resultado1 = validaNomeResponsavel('João', 5);
        expect(resultado1.valido).toBe(false);
        
        const resultado2 = validaNomeResponsavel('João Silva', 5);
        expect(resultado2.valido).toBe(true);
    });
});

describe('CT06 - Validar seleção de Estado obrigatória', () => {
    test('deve aceitar estado válido selecionado', () => {
        expect(validaEstado('SP')).toBe(true);
        expect(validaEstado('RJ')).toBe(true);
        expect(validaEstado('MG')).toBe(true);
    });

    test('deve rejeitar estado vazio', () => {
        expect(validaEstado('')).toBe(false);
    });

    test('deve rejeitar estado nulo', () => {
        expect(validaEstado(null)).toBe(false);
    });

    test('deve rejeitar estado indefinido', () => {
        expect(validaEstado(undefined)).toBe(false);
    });

    test('deve aceitar qualquer string não vazia como estado', () => {
        expect(validaEstado('AC')).toBe(true);
        expect(validaEstado('Acre')).toBe(true);
    });
});

describe('CT07 - Validar limites de caracteres para a "Mensagem Adicional"', () => {
    test('deve aceitar mensagem vazia (mínimo 0 caracteres)', () => {
        const resultado = validaMensagem('');
        expect(resultado.valido).toBe(true);
        expect(resultado.tamanho).toBe(0);
    });

    test('deve aceitar mensagem com 1 caractere', () => {
        const resultado = validaMensagem('a');
        expect(resultado.valido).toBe(true);
        expect(resultado.tamanho).toBe(1);
    });

    test('deve aceitar mensagem com 500 caracteres (limite máximo)', () => {
        const mensagem = 'a'.repeat(500);
        const resultado = validaMensagem(mensagem);
        expect(resultado.valido).toBe(true);
        expect(resultado.tamanho).toBe(500);
        expect(resultado.excedeu).toBe(false);
    });

    test('deve rejeitar mensagem com 501 caracteres (acima do limite)', () => {
        const mensagem = 'a'.repeat(501);
        const resultado = validaMensagem(mensagem);
        expect(resultado.valido).toBe(false);
        expect(resultado.tamanho).toBe(501);
        expect(resultado.excedeu).toBe(true);
    });

    test('deve rejeitar mensagem com 1000 caracteres', () => {
        const mensagem = 'a'.repeat(1000);
        const resultado = validaMensagem(mensagem);
        expect(resultado.valido).toBe(false);
        expect(resultado.excedeu).toBe(true);
    });

    test('deve aceitar mensagem com conteúdo normal', () => {
        const mensagem = 'Gostaria de mais informações sobre o programa.';
        const resultado = validaMensagem(mensagem);
        expect(resultado.valido).toBe(true);
        expect(resultado.tamanho).toBe(mensagem.length);
    });

    test('deve permitir configurar limite mínimo personalizado', () => {
        const resultado1 = validaMensagem('oi', 5);
        expect(resultado1.valido).toBe(false);
        expect(resultado1.abaixoMinimo).toBe(true);
        
        const resultado2 = validaMensagem('olá, tudo bem?', 5);
        expect(resultado2.valido).toBe(true);
        expect(resultado2.abaixoMinimo).toBe(false);
    });

    test('deve permitir configurar limite máximo personalizado', () => {
        const mensagem = 'a'.repeat(100);
        const resultado1 = validaMensagem(mensagem, 0, 50);
        expect(resultado1.valido).toBe(false);
        expect(resultado1.excedeu).toBe(true);
        
        const resultado2 = validaMensagem(mensagem, 0, 150);
        expect(resultado2.valido).toBe(true);
        expect(resultado2.excedeu).toBe(false);
    });

    test('deve contar caracteres especiais e quebras de linha', () => {
        const mensagem = 'Linha 1\nLinha 2\nLinha 3';
        const resultado = validaMensagem(mensagem);
        expect(resultado.valido).toBe(true);
        expect(resultado.tamanho).toBe(mensagem.length);
    });
});
