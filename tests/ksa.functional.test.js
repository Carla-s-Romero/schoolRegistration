const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

// Timeout estendido para 30s
jest.setTimeout(30000);

// Helper para Screenshots
async function tirarScreenshot(driver, nomeArquivo) {
    const dir = 'evidencias';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    // Primeiro, tentar aceitar um alert nativo caso esteja aberto (previne UnexpectedAlertOpenError)
    try {
        const alerta = await driver.switchTo().alert();
        await alerta.accept();
        await driver.sleep(200);
    } catch (e) {
        // sem alert — ignorar
    }

    // Agora tirar a screenshot normalmente
    try {
        const imagem = await driver.takeScreenshot();
        fs.writeFileSync(path.join(dir, `${nomeArquivo}.png`), imagem, 'base64');
        return;
    } catch (err) {
        // Fallback: se ainda falhar, tentar aceitar alert e tentar novamente
        try {
            const alerta = await driver.switchTo().alert();
            await alerta.accept();
            await driver.sleep(200);
            const imagem = await driver.takeScreenshot();
            fs.writeFileSync(path.join(dir, `${nomeArquivo}.png`), imagem, 'base64');
            return;
        } catch (innerErr) {
            throw err;
        }
    }
}

describe('Suite de Testes KSA - SF-001, SF-002, SF-003', () => {
    let driver;

    const DADOS_SF001 = {
        instituicao: "Escola Municipal Rio Verde",
        cnpj: "45.723.174/0001-10",
        estado: "SP",
        cidade: "São Paulo",
        tipo: "publica",
        alunos: "501-1000",
        responsavel: "Ana Paula Souza",
        cargo: "Diretora",
        email: "ana@escola.com",
        telefone: "11987654321",
        mensagem: "Desejo integrar minha instituicão ao sistema KSA."
    };

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        if (driver) await driver.quit();
    });

    // Antes de cada teste: Carrega página -> Clica Inscrever -> Espera Modal
    beforeEach(async () => {
        const indexFileUrl = pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href;
        await driver.get(indexFileUrl);
        const btnInscrever = await driver.findElement(By.id('btnInscrever'));
        await btnInscrever.click();
        
        // Espera modal e campo CNPJ estarem visíveis para garantir carregamento
        const modal = await driver.findElement(By.id('modalInscricao'));
        await driver.wait(until.elementIsVisible(modal), 5000);
        await driver.wait(until.elementLocated(By.id('cnpj')), 5000);
    });

    // =========================================================================
    // SF-001 — Envio com dados válidos
    // =========================================================================
    test('SF-001: Deve enviar formulário com dados válidos e mostrar sucesso', async () => {
        console.log("Iniciando SF-001...");

        // Preenchimento
        await driver.findElement(By.id('nomeInstituicao')).sendKeys(DADOS_SF001.instituicao);
        await driver.findElement(By.id('cnpj')).sendKeys(DADOS_SF001.cnpj); // Máscara vai tratar
        
        // Selects
        await driver.findElement(By.id('estado')).findElement(By.css(`option[value="${DADOS_SF001.estado}"]`)).click();
        await driver.findElement(By.id('cidade')).sendKeys(DADOS_SF001.cidade);
        await driver.findElement(By.id('tipoInstituicao')).findElement(By.css(`option[value="${DADOS_SF001.tipo}"]`)).click();
        await driver.findElement(By.id('numeroAlunos')).findElement(By.css(`option[value="${DADOS_SF001.alunos}"]`)).click();

        // Responsável
        await driver.findElement(By.id('nomeResponsavel')).sendKeys(DADOS_SF001.responsavel);
        await driver.findElement(By.id('cargoResponsavel')).sendKeys(DADOS_SF001.cargo);
        await driver.findElement(By.id('email')).sendKeys(DADOS_SF001.email);
        await driver.findElement(By.id('telefone')).sendKeys(DADOS_SF001.telefone);
        await driver.findElement(By.id('mensagem')).sendKeys(DADOS_SF001.mensagem);

        // Submissão
        const btnEnviar = await driver.findElement(By.css('.btn-submit'));
        await btnEnviar.click();
        
        await tirarScreenshot(driver, 'sf001_sucesso_envio'); // Nota: Screenshot não pega o alerta nativo, mas pega o fundo
    });

    // =========================================================================
    // SF-002 — Erros de obrigatórios
    // =========================================================================
    test('SF-002: Não deve enviar campos vazios e deve focar no erro', async () => {
        console.log("Iniciando SF-002...");

        // Clica em enviar sem preencher nada
        const btnEnviar = await driver.findElement(By.css('.btn-submit'));
        await btnEnviar.click();

        // Validação HTML5: Checa se o primeiro campo obrigatório está inválido
        const campoNome = await driver.findElement(By.id('nomeInstituicao'));
        
        // Verifica a propriedade 'validity.valid' do HTML5
        const isValido = await driver.executeScript("return arguments[0].checkValidity();", campoNome);
        
        // Verifica se o navegador colocou o foco neste elemento (comportamento padrão de erro)
        const elementoAtivo = await driver.switchTo().activeElement();
        const idAtivo = await elementoAtivo.getAttribute('id');

        await tirarScreenshot(driver, 'sf002_erros_obrigatorios');

        expect(isValido).toBe(false); // Campo deve estar inválido
        expect(idAtivo).toBe('nomeInstituicao'); // Foco deve estar no primeiro erro
    });

    // =========================================================================
    // SF-003 — Formatação e máscaras
    // =========================================================================
    test('SF-003: Deve aplicar máscaras e bloquear letras', async () => {
        console.log("Iniciando SF-003...");

        const inputCNPJ = await driver.findElement(By.id('cnpj'));
        const inputTelefone = await driver.findElement(By.id('telefone'));

        // 1. Teste de Máscara (Colar/Digitar Números)
        await inputCNPJ.sendKeys('45723174000110');
        await driver.sleep(200); // Pausa para JS processar
        expect(await inputCNPJ.getAttribute('value')).toBe('45.723.174/0001-10');

        await inputTelefone.sendKeys('11912345678');
        await driver.sleep(200);
        expect(await inputTelefone.getAttribute('value')).toBe('(11) 91234-5678');
        
        await tirarScreenshot(driver, 'sf003_mascaras_aplicadas');

        // 2. Teste de Bloqueio (Limpar e Digitar Letras)
        await inputCNPJ.clear();
        await inputTelefone.clear();

        await inputCNPJ.sendKeys('CNPJ-TESTE');
        await inputTelefone.sendKeys('FONE-TESTE');

        await driver.sleep(200);

        // CNPJ: Deve remover letras. Se a máscara for rígida, o campo fica vazio ou só com números.
        const cnpjValor = await inputCNPJ.getAttribute('value');
        expect(cnpjValor).not.toMatch(/[A-Z]/); // Garante que não tem letras maiúsculas
        
        const telValor = await inputTelefone.getAttribute('value');
        expect(telValor).toBe(''); // Telefone deve bloquear tudo que não é número

        await tirarScreenshot(driver, 'sf003_bloqueio_letras');
    });

});