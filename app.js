/**
 * app.js
 * Camada de interface- Tela de cadastro (index.html)
 * 
 * Responsa´vel por capturar os dados do formulario e repassar para camada de persistencia (storage.js)
 */

const formChamado = document.getElementById ("form-chamado");
const mensagemStatus = document.getElementById ("mensagem-status");

formChamado.addEventListener("submit", function(evento){evento.preventDefault(); //Impedi o navegador de recarregar a página
    const dadosChamados={
        nome:document.getElementById("nome").value.trim (),
        setor:document.getElementById("setor").value.trim (),
        categoria:document.getElementById("categoria").value.trim (),
        prioridade:document.getElementById("prioridade").value.trim (),
        descricao:document.getElementById("descricao").value.trim (),
    };

    if (!validarDadosChamados(dadosChamados)){
        exibirMensagem("Preencha todos os campos antes de enviar", "Erro");
        return ;
    }
    const chamadoCriado = salvarChamado(dadosChamados);

    exibirMensagem(
        `Chamado #${chamadoCriado.id} registrado com sucesso`, "sucesso"
    );

    formChamado.request();
});

/**
 * Verifica-se todos os campos obrigatorios foram preenchidos
 * @param {object} dados
 * @returns {boolean}
 */

function validarDadosChamados(dados){
    return(
        dados.nome !== "" && 
        dados.setor !== "" && 
        dados.categoria !== "" && 
        dados.prioridade !== "" && 
        dados.descricao !== "" 
    );
}

    /**
     * Exibi uma mensagem de status para o usuario(Sucesso ou Erro)
     * @param {string} texto
     * @param {"sucesso"| "erro"} tipo
     */

        function exibirMensagem(texto, tipo){
            mensagemStatus.textContent = "Mensagem-status" + tipo;
        }