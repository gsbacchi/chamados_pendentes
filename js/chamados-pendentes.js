// ==========================================
// CENTRAL DE ATENDIMENTOS PENDENTES
// ==========================================


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const lista = document.getElementById("listaChamados");
const salvar = document.getElementById("salvar");
const funcionario = document.getElementById("funcionario");
const carteira = document.getElementById("carteira");
const filial = document.getElementById("filial");
const categoria = document.getElementById("categoria");
const canal = document.getElementById("canal");
const tecnico = document.getElementById("tecnico");
const descricao = document.getElementById("descricao");
const buscar = document.getElementById("buscar");


// ==========================================
// TÉCNICOS POR FILIAL
// ==========================================

const tecnicosPorFilial = {

    "Matriz": [
        "Breno Guimarães",
        "Matheus Ruggiero",
        "Mateus da Silva",
        "Stefany da Cruz",
        "Antonio Moura",
        "Clodoaldo Filho",
        "Renato Angeli",
        "Rhuan Vieira"
    ],

    "Aviação": [
        "Giovana Bacchi",
        "Luiza Carvalho",
        "Felipe Marcelo",
        "Eduardo Henrique"
    ],

    "Savério": [
        "Lunna Rocha",
        "Isaac Zago",
        "Pablo Moraes",
        "Alex Muniz",
        "Eric Pereira"
    ],

    "Marechal": [
        "Silvio Junior",
        "Mateus Isidoro",
        "Igor Moreno"
    ],

    "Aguapei": [
        "Victor Henrique"
    ]

};


// ==========================================
// CARTEIRAS POR FILIAL
// ==========================================

const carteirasPorFilial = {

    "Matriz": [
        "MERCADO PAGO",
        "PRAVALER",
        "LOFT",
        "ITAU"
    ],

    "Aviação": [
        "PAN",
        "CX",
        "MERCADO PAGO",
        "MASSIFICADOS",
        "CL",
        "CA",
        "SOLAR",
        "PLANEJAMENTO",
        "RH",
        "TREINAMENTO",
        "R&S"
    ],

    "Savério": [
        "BV",
        "ADM",
        "BOM PAGADOR",
        "CONTENCIOSO 1",
        "CONTENCIOSO 2",
        "CONTENCIOSO 3",
        "WO",
        "AC",
        "RESTITUIÇÃO",
        "PLANEJAMENTO",
        "RH",
        "R&S",
        "TREINAMENTO"
    ],

    "Marechal": [
        "LOSANGO",
        "COMERCIAL",
        "BF",
        "CI",
        "CI DEJUR",
        "KAVAK",
        "SAUDE",
        "VEICULOS",
        "RH"
    ],

    "Aguapei": [
        "MIS",
        "DIGITAL",
        "CONTROL DESK",
        "MONITORIA",
        "OUVIDORIA",
        "JURIDICO",
        "RH"
    ]

};


// ==========================================
// ALTERAÇÃO DA FILIAL
// CARREGA TÉCNICOS E CARTEIRAS
// ==========================================

filial.addEventListener("change", function () {

    const filialSelecionada = filial.value;


    // ======================================
    // TÉCNICOS
    // ======================================

    tecnico.innerHTML = "";

    const opcaoTecnico = document.createElement("option");

    opcaoTecnico.value = "";

    if (filialSelecionada) {
        opcaoTecnico.textContent = "Selecione o técnico";
    } else {
        opcaoTecnico.textContent = "Primeiro selecione a filial";
    }

    tecnico.appendChild(opcaoTecnico);


    const tecnicos =
        tecnicosPorFilial[filialSelecionada] || [];


    tecnicos.forEach(function (nome) {

        const option = document.createElement("option");

        option.value = nome;
        option.textContent = nome;

        tecnico.appendChild(option);

    });


    // ======================================
    // CARTEIRAS
    // ======================================

    carteira.innerHTML = "";

    const opcaoCarteira = document.createElement("option");

    opcaoCarteira.value = "";

    if (filialSelecionada) {
        opcaoCarteira.textContent = "Selecione a carteira";
    } else {
        opcaoCarteira.textContent = "Primeiro selecione a filial";
    }

    carteira.appendChild(opcaoCarteira);


    const carteiras =
        carteirasPorFilial[filialSelecionada] || [];


    carteiras.forEach(function (nomeCarteira) {

        const option = document.createElement("option");

        option.value = nomeCarteira;
        option.textContent = nomeCarteira;

        carteira.appendChild(option);

    });


    // ======================================
    // ATIVA OS CAMPOS
    // ======================================

    if (filialSelecionada) {

        carteira.disabled = false;
        tecnico.disabled = false;

    } else {

        carteira.disabled = true;
        tecnico.disabled = true;

    }

});


// ==========================================
// RECUPERA OS ATENDIMENTOS SALVOS
// ==========================================

let chamados =
    JSON.parse(
        localStorage.getItem("pendencias")
    ) || [];

// ==========================================
// RENDERIZA AO ABRIR A PÁGINA
// ==========================================

renderizar();


// ==========================================
// SALVAR ATENDIMENTO
// ==========================================

salvar.onclick = function () {

    const atendimento = {

        id: Date.now(),

        funcionario:
            funcionario.value.trim(),

        carteira:
            carteira.value,

        filial:
            filial.value,

        categoria:
            categoria.value,

        canal:
            canal.value,

        tecnico:
            tecnico.value,

        descricao:
            descricao.value.trim(),

        data:
            new Date().toISOString(),

        status:
            "Pendente",

        historico:
            []

    };


    // ======================================
    // VALIDAÇÕES
    // ======================================

    if (atendimento.funcionario === "") {

        alert(
            "Digite o nome do funcionário."
        );

        funcionario.focus();

        return;
    }


    if (atendimento.filial === "") {

        alert(
            "Selecione a filial."
        );

        filial.focus();

        return;
    }


    if (atendimento.carteira === "") {

        alert(
            "Selecione a carteira."
        );

        carteira.focus();

        return;
    }


    if (atendimento.categoria === "") {

        alert(
            "Selecione a categoria."
        );

        categoria.focus();

        return;
    }


    if (atendimento.canal === "") {

        alert(
            "Selecione o canal."
        );

        canal.focus();

        return;
    }


    if (atendimento.tecnico === "") {

        alert(
            "Selecione o técnico responsável."
        );

        tecnico.focus();

        return;
    }


    // ======================================
    // ADICIONA NA LISTA
    // ======================================

    chamados.unshift(atendimento);


    // ======================================
    // SALVA
    // ======================================

    salvarStorage();


    // ======================================
    // LIMPA CAMPOS
    // ======================================

    limparCampos();


    // ======================================
    // ATUALIZA TELA
    // ======================================

    renderizar();

};


// ==========================================
// SALVAR NO LOCAL STORAGE
// ==========================================

function salvarStorage() {

    localStorage.setItem(
        "pendencias",
        JSON.stringify(chamados)
    );

}


// ==========================================
// LIMPAR CAMPOS
// ==========================================

function limparCampos() {

    funcionario.value = "";

    filial.value = "";

    carteira.innerHTML =
        '<option value="">Primeiro selecione a filial</option>';

    carteira.disabled = true;


    categoria.value = "";

    canal.value = "";


    tecnico.innerHTML =
        '<option value="">Primeiro selecione a filial</option>';

    tecnico.disabled = true;


    descricao.value = "";

}


// ==========================================
// RENDERIZAR CARDS
// ==========================================

function renderizar() {

    lista.innerHTML = "";


    const filtro =
        buscar.value
            ?.toLowerCase()
            .trim() || "";


    chamados
        .filter(function (c) {

            const nome =
                c.funcionario
                    ?.toLowerCase() || "";

            const carteiraNome =
                c.carteira
                    ?.toLowerCase() || "";

            const tecnicoNome =
                c.tecnico
                    ?.toLowerCase() || "";

            const filialNome =
                c.filial
                    ?.toLowerCase() || "";


            return (

                nome.includes(filtro) ||

                carteiraNome.includes(filtro) ||

                tecnicoNome.includes(filtro) ||

                filialNome.includes(filtro)

            );

        })


        .forEach(function (c) {


            // ==================================
            // CALCULA TEMPO
            // ==================================

            const horas =
                horasPassadas(c.data);


            // ==================================
            // COR DO CARD
            // ==================================

            let classe = "verde";


            if (horas >= 1) {

                classe = "amarelo";

            }


            if (horas >= 4) {

                classe = "vermelho";

            }


            // ==================================
            // CRIA CARD
            // ==================================

            const card =
                document.createElement("div");


            card.className =
                `card ${classe}`;


            // ==================================
            // CONTEÚDO
            // ==================================

            card.innerHTML = `

                <div class="info">

                    <h3>
                        ${c.funcionario}
                    </h3>

                    <span class="badge">
                        ${c.filial}
                    </span>

                </div>


                <p>
                    <strong>Carteira:</strong>
                    ${c.carteira || "Não informada"}
                </p>


                <p>
                    <strong>Categoria:</strong>
                    ${c.categoria || "Não informada"}
                </p>


                <p>
                    <strong>Canal:</strong>
                    ${c.canal || "Não informado"}
                </p>


                <p>
                    <strong>Técnico responsável:</strong>
                    ${c.tecnico || "Não informado"}
                </p>


                <p>
                    <strong>Status:</strong>
                    ${c.status || "Pendente"}
                </p>


                <p>
                    <strong>Descrição:</strong>
                    ${c.descricao || "Sem descrição"}
                </p>


                <p class="tempo">

                    Tempo aguardando chamado:

                    ${tempoTexto(horas)}

                </p>


                <div class="acoes">


                    <button
                        type="button"
                        class="btnTeams"
                        onclick="cobrar(${c.id})"
                    >
                        💬 Cobrar no Teams
                    </button>

                    <button
                        type="button"
                        class="btnHistorico"
                        onclick="verHistorico(${c.id})"
                    >
                        🕘 Histórico
                    </button>


                    <button
                        type="button"
                        class="btnRecebido"
                        onclick="recebido(${c.id})"
                    >
                        ✓ Chamado Recebido
                    </button>


                    <button
                        type="button"
                        class="btnExcluir"
                        onclick="excluir(${c.id})"
                    >
                        🗑 Excluir
                    </button>


                </div>

            `;


            lista.appendChild(card);

        });


    // ======================================
    // SEM RESULTADOS
    // ======================================

    if (

        chamados.length > 0 &&

        lista.children.length === 0

    ) {

        lista.innerHTML = `

            <div class="card">

                <p>
                    Nenhum atendimento encontrado.
                </p>

            </div>

        `;

    }

}


// ==========================================
// PESQUISA
// ==========================================

buscar.addEventListener(
    "input",
    renderizar
);


// ==========================================
// CALCULAR HORAS PASSADAS
// ==========================================

function horasPassadas(data) {

    return (

        new Date() -
        new Date(data)

    ) / 3600000;

}


// ==========================================
// FORMATAR TEMPO
// ==========================================

function tempoTexto(horas) {


    if (horas < 1) {

        const minutos =
            Math.floor(horas * 60);


        if (minutos <= 0) {

            return "Agora";

        }


        return `${minutos} minutos`;

    }


    const horasInteiras =
        Math.floor(horas);


    return `${horasInteiras} horas`;

}


// ==========================================
// COBRAR PELO TEAMS
// ==========================================

function cobrar(id) {


    const c =
        chamados.find(
            item => item.id === id
        );


    if (!c) {

        return;

    }


    const mensagem =

`Olá, ${c.funcionario}! 👋

Seu atendimento já foi realizado pelo Suporte, porém ainda não identificamos a abertura do chamado no GLPI.

Por gentileza, envie um e-mail para a chave CS - Tecnologia para registrar o atendimento e permitir o encerramento da solicitação.

Carteira: ${c.carteira}
Filial: ${c.filial}
Categoria: ${c.categoria}
Técnico responsável: ${c.tecnico}
Descrição: ${c.descricao}

Obrigado!`;


    if (!c.historico) {

        c.historico = [];

    }


    c.historico.push({

        data:
            new Date()
                .toLocaleString("pt-BR"),

        canal:
            "Teams",

        usuario:
            c.tecnico,

        observacao:
            `Mensagem enviada via Microsoft Teams para ${c.funcionario}.`

    });


    salvarStorage();


    navigator.clipboard
        .writeText(mensagem)

        .then(function () {

            alert(
                "Mensagem copiada! Agora é só colar no Microsoft Teams."
            );

        })

        .catch(function () {

            alert(
                "Não foi possível copiar automaticamente. Tente novamente."
            );

        });

}


// ==========================================
// COBRAR POR E-MAIL
// ==========================================

function cobrarEmail(id) {


    const c =
        chamados.find(
            item => item.id === id
        );


    if (!c) {

        return;

    }


    const emailGestao =
        gestaoCarteiras[c.carteira];


    if (

        !emailGestao ||

        emailGestao.startsWith(
            "EMAIL_REAL"
        )

    ) {

        alert(
            `Ainda não existe um e-mail cadastrado para a carteira "${c.carteira}".`
        );

        return;

    }


    const assunto =
        `[SUPORTE] Pendência de abertura de chamado - ${c.funcionario}`;


    const mensagem =

`Olá, Gestão ${c.carteira}.

O atendimento do colaborador ${c.funcionario} já foi realizado pelo Suporte, porém ainda não identificamos a abertura do chamado correspondente no sistema.

Solicitamos, por gentileza, a abertura do chamado para que o atendimento possa ser registrado e encerrado corretamente.

Dados do atendimento:

Funcionário: ${c.funcionario}

Carteira: ${c.carteira}

Filial: ${c.filial}

Categoria: ${c.categoria}

Canal: ${c.canal}

Técnico responsável: ${c.tecnico}

Descrição: ${c.descricao || "Sem descrição"}

Atenciosamente,

Suporte T.I.`;


    const mailto =

        `mailto:${emailGestao}` +

        `?subject=${encodeURIComponent(assunto)}` +

        `&body=${encodeURIComponent(mensagem)}`;


    if (!c.historico) {

        c.historico = [];

    }


    c.historico.push({

        data:
            new Date()
                .toLocaleString("pt-BR"),

        canal:
            "E-mail",

        usuario:
            c.tecnico,

        observacao:
            `E-mail enviado para a gestão da carteira ${c.carteira} solicitando abertura do chamado GLPI.`

    });


    salvarStorage();


    window.location.href = mailto;

}


// ==========================================
// CHAMADO RECEBIDO
// ==========================================

function recebido(id) {


    const confirmado =
        confirm(
            "Deseja marcar este atendimento como recebido no GLPI?"
        );


    if (!confirmado) {

        return;

    }


    chamados =
        chamados.filter(
            item => item.id !== id
        );


    salvarStorage();

    renderizar();


    alert(
        "Chamado marcado como recebido no GLPI."
    );

}


// ==========================================
// EXCLUIR ATENDIMENTO
// ==========================================

function excluir(id) {


    const confirmado =
        confirm(
            "Deseja excluir este atendimento?"
        );


    if (!confirmado) {

        return;

    }


    chamados =
        chamados.filter(
            item => item.id !== id
        );


    salvarStorage();

    renderizar();

}


// ==========================================
// HISTÓRICO
// ==========================================

function verHistorico(id) {


    const c =
        chamados.find(
            item => item.id === id
        );


    if (!c) {

        return;

    }


    document
        .getElementById("painelHistorico")
        .classList.add("ativo");


    document
        .getElementById("fundoHistorico")
        .classList.add("ativo");


    document
        .getElementById("historicoFuncionario")
        .innerHTML = `

            <strong>
                ${c.funcionario}
            </strong>

            <br>

            Carteira ${c.carteira}
            •
            ${c.filial}

        `;


    const timeline =
        document.getElementById(
            "historicoTimeline"
        );


    timeline.innerHTML = "";


    // ======================================
    // SEM HISTÓRICO
    // ======================================

    if (
        !c.historico ||
        c.historico.length === 0
    ) {

        timeline.innerHTML = `

            <div class="timelineItem">

                <div class="timelineTitulo">

                    <h4>
                        📭 Nenhuma cobrança registrada
                    </h4>

                </div>

                <div class="timelineObs">

                    Este atendimento ainda não recebeu
                    cobranças por Teams ou E-mail.

                </div>

            </div>

        `;

        return;

    }


    // ======================================
    // MOSTRA HISTÓRICO
    // ======================================

    c.historico
        .slice()
        .reverse()
        .forEach(function (item, index) {


            const tipo =
                item.canal === "Teams"
                    ? "teams"
                    : "email";


            const icone =
                item.canal === "Teams"
                    ? "💬"
                    : "📧";


            timeline.innerHTML += `

                <div
                    class="timelineItem ${tipo}"
                >

                    <div
                        class="timelineTitulo"
                    >

                        <h4>

                            ${icone}

                            ${index + 1}ª Cobrança

                            • ${item.canal}

                        </h4>


                        <span
                            class="timelineData"
                        >

                            ${item.data}

                        </span>

                    </div>


                    <div
                        class="timelineObs"
                    >

                        ${item.observacao}

                    </div>


                    <div
                        class="timelineUsuario"
                    >

                        👨‍💻 Técnico responsável:

                        <strong>
                            ${c.tecnico}
                        </strong>

                    </div>

                </div>

            `;

        });

}


// ==========================================
// FECHAR HISTÓRICO
// ==========================================

function fecharHistorico() {


    document
        .getElementById("painelHistorico")
        .classList.remove("ativo");


    document
        .getElementById("fundoHistorico")
        .classList.remove("ativo");

}