// Função de validação de CNPJ
function validaCNPJ(cnpj) {
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var c = String(cnpj).replace(/[^\d]/g, '');
    
    if(c.length !== 14)
        return false;

    if(/0{14}/.test(c))
        return false;

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    return true;
}

// Função para normalizar CNPJ (remover formatação)
function normalizaCNPJ(cnpj) {
    return String(cnpj).replace(/[^\d]/g, '');
}

// Função para aplicar máscara de CNPJ
function aplicaMascaraCNPJ(value) {
    let v = value.replace(/\D/g, '');
    
    if (v.length <= 14) {
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    return v;
}

// Função de validação de e-mail
function validaEmail(email) {
    const emailRegex = /^[^\s@]+(\+[^\s@]+)?@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para aplicar máscara de telefone
function aplicaMascaraTelefone(value) {
    let v = value.replace(/\D/g, '');
    
    if (v.length <= 11) {
        if (v.length <= 10) {
            v = v.replace(/^(\d{2})(\d)/, '($1) $2');
            v = v.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            v = v.replace(/^(\d{2})(\d)/, '($1) $2');
            v = v.replace(/(\d{5})(\d)/, '$1-$2');
        }
    }
    
    return v;
}

// Função para validar nome com trim
function validaNomeResponsavel(nome, tamanhoMinimo = 3) {
    const nomeTrimmed = nome.trim();
    return {
        valido: nomeTrimmed.length >= tamanhoMinimo,
        nomeTrimmed: nomeTrimmed
    };
}

// Função para validar seleção de estado
function validaEstado(estado) {
    return estado !== '' && estado !== null && estado !== undefined;
}

// Função para validar limites de caracteres da mensagem
function validaMensagem(mensagem, minCaracteres = 0, maxCaracteres = 500) {
    const tamanho = mensagem.length;
    return {
        valido: tamanho >= minCaracteres && tamanho <= maxCaracteres,
        tamanho: tamanho,
        excedeu: tamanho > maxCaracteres,
        abaixoMinimo: tamanho < minCaracteres
    };
}

// Exportar funções para uso no script principal e nos testes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validaCNPJ,
        normalizaCNPJ,
        aplicaMascaraCNPJ,
        validaEmail,
        aplicaMascaraTelefone,
        validaNomeResponsavel,
        validaEstado,
        validaMensagem
    };
}
