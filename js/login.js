// =====================================================
// PORTAL DE CHAMADOS - GRUPO AVAL / TOLEDO PIZA
// Globo 3D + Login + Efeito Matrix
// =====================================================


// =====================================================
// MOSTRAR / OCULTAR SENHA
// =====================================================

const senha = document.getElementById("pass");
const botaoSenha = document.getElementById("togglePass");

botaoSenha.addEventListener("click", () => {

    senha.type =
        senha.type === "password"
            ? "text"
            : "password";

});


// =====================================================
// GLOBO 3D (CANVAS)
// =====================================================

const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");

let largura;
let altura;
let raio;
let centroX;
let centroY;

const DPR = Math.min(window.devicePixelRatio || 1, 2);


// =====================================================
// AJUSTA TAMANHO DO GLOBO
// =====================================================

function resize() {

    largura = canvas.clientWidth;
    altura = canvas.clientHeight;

    canvas.width = largura * DPR;
    canvas.height = altura * DPR;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Centralização do globo
    centroX = largura * 0.48;
    centroY = altura * 0.50;

    // Globo maior
    raio = Math.min(largura, altura) * 0.38;

}

window.addEventListener("resize", resize);

resize();


let rotacao = 0;
let orbita = 0;


// =====================================================
// DESENHAR GLOBO
// =====================================================

function desenharGlobo() {

    ctx.clearRect(0, 0, largura, altura);


    // =================================================
    // GLOW ATRÁS DO GLOBO
    // =================================================

    const brilho = ctx.createRadialGradient(
        centroX,
        centroY,
        raio * 0.2,
        centroX,
        centroY,
        raio * 1.6
    );

    brilho.addColorStop(
        0,
        "rgba(0,168,255,.20)"
    );

    brilho.addColorStop(
        1,
        "rgba(0,168,255,0)"
    );

    ctx.fillStyle = brilho;

    ctx.beginPath();

    ctx.arc(
        centroX,
        centroY,
        raio * 1.6,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // =================================================
    // CONTORNO DO GLOBO
    // =================================================

    ctx.strokeStyle =
        "rgba(56,189,248,.20)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.arc(
        centroX,
        centroY,
        raio,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    // =================================================
    // ÓRBITAS
    // =================================================

    ctx.save();

    ctx.translate(
        centroX,
        centroY
    );

    ctx.rotate(0.35);

    ctx.strokeStyle =
        "rgba(255,122,0,.35)";

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        raio * 1.45,
        raio * 0.28,
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.rotate(-0.70);

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        raio * 1.55,
        raio * 0.35,
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.restore();


    // =================================================
    // PONTOS LUMINOSOS DA REDE
    // =================================================

    for (let i = 0; i < 420; i++) {

        const angulo =
            (i / 420) *
            Math.PI *
            2 +
            rotacao;


        const x =
            centroX +
            Math.cos(angulo) *
            raio *
            1.18;


        const y =
            centroY +
            Math.sin(angulo * 1.28) *
            raio *
            0.95;


        ctx.beginPath();

        ctx.fillStyle =
            "rgba(56,189,248,.90)";

        ctx.shadowColor =
            "#38BDF8";

        ctx.shadowBlur = 6;


        ctx.arc(
            x,
            y,
            1.8,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    ctx.shadowBlur = 0;


    // =================================================
    // SATÉLITE
    // =================================================

    ctx.beginPath();

    ctx.strokeStyle =
        "#FF8A00";

    ctx.arc(

        centroX +
        Math.cos(orbita) *
        raio *
        1.5,

        centroY +
        Math.sin(orbita) *
        raio *
        0.35,

        3,

        0,

        Math.PI * 2

    );

    ctx.stroke();


    // =================================================
    // MOVIMENTO
    // =================================================

    rotacao += 0.002;

    orbita += 0.015;


    requestAnimationFrame(
        desenharGlobo
    );

}

desenharGlobo();


// =====================================================
// EFEITO MATRIX
// =====================================================

const overlay =
    document.getElementById(
        "matrixOverlay"
    );

const matrixCanvas =
    document.getElementById(
        "matrixCanvas"
    );

const matrixCtx =
    matrixCanvas.getContext("2d");


// =====================================================
// EFEITO MATRIX
// CORES ORIGINAIS DO PORTAL GLPI
// Azul + Ciano + Branco + Laranja
// =====================================================

function iniciarMatrix() {

    matrixCanvas.width =
        window.innerWidth;

    matrixCanvas.height =
        window.innerHeight;


    // Caracteres
    const letras =
        "1110110110011010100010101111010";


    // Tamanho da fonte
    const fonte = 18;


    // Quantidade de colunas
    const colunas =
        Math.floor(
            matrixCanvas.width /
            fonte
        );


    // Posição inicial das gotas
    const gotas =
        Array(colunas).fill(1);


    // =================================================
    // PALETA ORIGINAL DO PORTAL
    // =================================================

    const cores = [

        "#38BDF8", // Azul claro

        "#00A8FF", // Azul neon

        "#89E3FF", // Ciano claro

        "#FFFFFF", // Branco brilho

        "#FF7A00"  // Laranja Toledo Piza

    ];


    // =================================================
    // DESENHAR MATRIX
    // =================================================

    function desenhar() {

        // Fundo transparente com rastro
        matrixCtx.fillStyle =
            "rgba(2,12,30,0.08)";

        matrixCtx.fillRect(
            0,
            0,
            matrixCanvas.width,
            matrixCanvas.height
        );


        matrixCtx.font =
            fonte + "px monospace";


        for (
            let i = 0;
            i < gotas.length;
            i++
        ) {

            // Escolhe caractere
            const letra =
                letras[
                    Math.floor(
                        Math.random() *
                        letras.length
                    )
                ];


            // Escolhe uma das cores
            const cor =
                cores[
                    Math.floor(
                        Math.random() *
                        cores.length
                    )
                ];


            // Cor do caractere
            matrixCtx.fillStyle =
                cor;


            // Cor do brilho
            matrixCtx.shadowColor =
                cor;


            // Intensidade do brilho
            matrixCtx.shadowBlur = 12;


            // Desenha caractere
            matrixCtx.fillText(

                letra,

                i * fonte,

                gotas[i] * fonte

            );


            // Reinicia a gota
            if (
                gotas[i] * fonte >
                    matrixCanvas.height &&
                Math.random() > 0.975
            ) {

                gotas[i] = 0;

            }


            gotas[i]++;

        }


        // Remove o glow
        matrixCtx.shadowBlur = 0;

    }


    // =================================================
    // VELOCIDADE DO MATRIX
    // =================================================

    const animacao =
        setInterval(
            desenhar,
            25
        );


    // =================================================
    // DURAÇÃO DO MATRIX
    // 5 SEGUNDOS
    // =================================================

    setTimeout(() => {

        clearInterval(animacao);

        overlay.classList.remove(
            "ativo"
        );


        // Depois do Matrix,
        // abre a página inicial
        window.location.href =
            "pages/chamados-pendentes.html";


    }, 5000);

}


// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginCard =
    document.querySelector(
        ".login-card"
    );


const campoUsuario =
    document.getElementById(
        "user"
    );


const campoSenha =
    document.getElementById(
        "pass"
    );


const mensagemErro =
    document.getElementById(
        "loginErro"
    );


// =====================================================
// USUÁRIOS PARA TESTE
// =====================================================

const usuarios = [

    {
        usuario: "admin",
        senha: "123456"
    },

    {
        usuario: "giovana",
        senha: "glpi2026"
    },

    {
        usuario: "suporte",
        senha: "aval123"
    }

];


// =====================================================
// PROCESSAMENTO DO LOGIN
// =====================================================

loginForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const usuario =
            campoUsuario.value
                .trim()
                .toLowerCase();


        const senhaDigitada =
            campoSenha.value;


        const loginValido =
            usuarios.find(
                item =>
                    item.usuario === usuario &&
                    item.senha === senhaDigitada
            );


        // Esconde mensagem de erro
        mensagemErro.classList.remove(
            "mostrar"
        );


        // =================================================
        // LOGIN CORRETO
        // =================================================

        if (loginValido) {

            // Animação da caixa
            loginCard.classList.add(
                "desintegrar"
            );


            // Ativa Matrix
            overlay.classList.add(
                "ativo"
            );


            // Inicia Matrix
            iniciarMatrix();


        }


        // =================================================
        // LOGIN INCORRETO
        // =================================================

        else {

            mensagemErro.classList.add(
                "mostrar"
            );


            campoSenha.value = "";


            campoSenha.focus();

        }

    }
);


// =====================================================
// CURSOR GLOW
// =====================================================

const glow =
    document.getElementById(
        "cursorGlow"
    );


if (glow) {

    document.addEventListener(
        "mousemove",
        (e) => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";

        }
    );

}