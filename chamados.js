/**
 *Chamados.js
 *camada de interface - Tela de listagem (chamados.html)
 *
 *Responsável
 *e permitir a alteração  */
const containerLista = document.getElementById("lista-chamadas");
const mensagemVazia = document.getElementById("filtro-status");
const STATUS_DISPONIVEIS = ("Aberto", "Em Andamento", "Resolvido");

//Redenriza a lista assim que a pagina carrega

document.addEventListener("DOMContentLoaded", renderizarLista);

//Sempre que o filtro mudar, renderiza a lista de novo

filtrarPorstatus.addEventListener("change", renderizarLista);

/**
 * Busca chamadas (já filtrados) e desenha os cartões na tela
 */

function renderizarLista(){
    const statusSelecionado = filtrarPorstatus.value;
    const chamados = filtroPorStatus(statusSelecionado);

    containerLista.innerHTML = "";

    if(chamados.lenght === 0){
        mensagemVazia.hidden = false;
        return;
    }

    mensagemVazia.hidden = true;

    //Mostra os chamados mais recente primeiro
    const chamadosOrdenados = [...chamados].reverse();

    chamadosOrdenados.forEach(chamado => {
        containerLista.appendChild(criarCartaoChamado(chamado));
        
    });

}




/**
 * Ceia o elemento HTML (cartão) que representa um cartão
 * @param {object} chamadoCriado
 * @returns {HTMLElement}
 */

function criarCartaoChamado(chamado){
    const cartao = document.createElement("article");
    cartao.className = "cartao-chamado";

    const dataformatada = formatarData(chamado.dataCriacao);
    const classePrioridade = "prioridade" + chamado.prioridade.toloweCase();

    cartao.innerHTML = `
    <div class="cartao-chamado-topo">
        <span class="numero-chamado">#${chamado.id}</span>
        <span class="badge-prioridade ${classePrioridade}">${chamado.prioridade}</span>
    </div>

    <h2 class="titulo-chamado">${chamado.categoria}</h2>
    <p class="descricao-chamado">${chamado.descricao}</p>



    <div class="detalhes-chamado">
        <span><strong>Solicitante:</strong> ${chamado.nome}</span>
        <span><strong>Setor:</strong>${chamado.setor}<   
    </div>
    <div class="rodape-chamado">
        <label class="rotulo-statusd" for="status-${chamado.id}">status</label>
        <select class="select-status" id="status-${chamado.id}"data-id "${chamado.id}"></select>
        ${STATUS_DISPONIVEIS.nap(
            (status)=>
            `<option value="$(status)" ${status===chamada.status ? "selected" : ""}>${status}></option>
            `

        ).join("")}
        </select>
</div>
;
`
const seletorStatus = cartao.querySelector(".select-status");
seletorStatus.addEventListener("change", aoMudarStatus);

return cartao;


}


/**
*Chamado quando o usuário troca o status pelo <select> do cartão
*@param {Event} evento

 */


function aoMudarStatus(evento){
    const id = Number(evento.target.dataset.id);
    const novoStatus = evento.target.value;

    const sucesso = atualListasStatus(id, novoStatus);
    if(!sucesso){
        alert("Não foi possível atualizar o status desse chamado");
        return;
    }
    renderizarLista();
}

/**
 * Formata uma data ISO (dataCriacao) para o padrao dd/mm/yyyy HH:mm.
 * @param {string} dataIso
 * @returns {string}
 * 
 */

function formatarData(dataIso){
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth()+1).padStart(2, "0");
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()+1).padStart(2, "0");

    return '${dia}/${mes}/${ano} ${horas}:${minutos}';
}