// ==========================================
// 1. MODO OSCURO / CLARO
// ==========================================

const botonTema = document.createElement("button");

botonTema.id = "botonTema";
botonTema.innerHTML = "☀️";
botonTema.title = "Cambiar tema";

document.body.appendChild(botonTema);

botonTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-claro");

    if (document.body.classList.contains("modo-claro")) {
        botonTema.innerHTML = "🌙";
    } else {
        botonTema.innerHTML = "☀️";
    }
});


// ==========================================
// 2. ANIMACIÓN DE LA LÍNEA DEL TIEMPO
// ==========================================

const periodos = document.querySelectorAll(".periodo");

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.2
    }
);

periodos.forEach((periodo) => {
    observador.observe(periodo);
});


// ==========================================
// 3. BOTONES "DESCUBRIR MÁS"
// ==========================================

const informacionExtra = {
    grecia: `
        <strong>¿Sabías que?</strong><br><br>
        En la Antigua Grecia surgieron algunas de las bases de la filosofía
        occidental. Sócrates, Platón y Aristóteles fueron figuras fundamentales.
        Además, los antiguos griegos organizaron los primeros Juegos Olímpicos.
    `,

    roma: `
        <strong>¿Sabías que?</strong><br><br>
        El Imperio Romano llegó a controlar enormes territorios alrededor del
        Mediterráneo. Muchas carreteras, leyes y edificios romanos influyeron
        en las sociedades posteriores.
    `,

    media: `
        <strong>¿Sabías que?</strong><br><br>
        Durante la Edad Media se fundaron universidades que todavía existen
        actualmente. También se construyeron grandes catedrales y crecieron
        importantes rutas comerciales.
    `,

    renacimiento: `
        <strong>¿Sabías que?</strong><br><br>
        Leonardo da Vinci fue artista, inventor, científico e investigador.
        El Renacimiento impulsó una nueva visión del ser humano y del
        conocimiento.
    `,

    moderna: `
        <strong>¿Sabías que?</strong><br><br>
        Las exploraciones marítimas cambiaron la relación entre continentes.
        También se produjo una enorme expansión del comercio y de los imperios.
    `,

    industrial: `
        <strong>¿Sabías que?</strong><br><br>
        La Revolución Industrial comenzó en Gran Bretaña y posteriormente
        se expandió a otras regiones. Las máquinas cambiaron la producción,
        el transporte y la vida cotidiana.
    `,

    siglo20: `
        <strong>¿Sabías que?</strong><br><br>
        En el siglo XX ocurrieron dos guerras mundiales, llegó el ser humano
        a la Luna y aparecieron tecnologías como la televisión, los ordenadores
        y las primeras redes que dieron origen a Internet.
    `,

    actualidad: `
        <strong>¿Sabías que?</strong><br><br>
        El siglo XXI está marcado por la digitalización, Internet, la inteligencia
        artificial, la biotecnología y nuevos avances en la exploración espacial.
    `
};


periodos.forEach((periodo) => {

    const boton = document.createElement("button");

    boton.className = "descubrir";

    boton.textContent = "Descubrir más +";

    const ventana = document.createElement("div");

    ventana.className = "informacion-extra";

    const id = periodo.id;

    ventana.innerHTML = informacionExtra[id];

    periodo.querySelector(".contenido").appendChild(boton);

    periodo.querySelector(".contenido").appendChild(ventana);

    boton.addEventListener("click", () => {

        ventana.classList.toggle("mostrar");

        if (ventana.classList.contains("mostrar")) {
            boton.textContent = "Ocultar información −";
        } else {
            boton.textContent = "Descubrir más +";
        }

    });

});


// ==========================================
// 4. QUIZ DE HISTORIA
// ==========================================

const preguntas = [
    {
        pregunta: "¿Dónde surgió la democracia en la Antigüedad?",
        opciones: ["Roma", "Grecia", "Egipto", "China"],
        correcta: 1
    },

    {
        pregunta: "¿Qué civilización construyó el Coliseo?",
        opciones: ["Grecia", "Egipto", "Roma", "Persia"],
        correcta: 2
    },

    {
        pregunta: "¿Qué movimiento cultural tuvo a Leonardo da Vinci como protagonista?",
        opciones: ["Renacimiento", "Romanticismo", "Ilustración", "Barroco"],
        correcta: 0
    },

    {
        pregunta: "¿Qué revolución cambió la producción mediante máquinas y fábricas?",
        opciones: [
            "Revolución Francesa",
            "Revolución Industrial",
            "Revolución Neolítica",
            "Revolución Digital"
        ],
        correcta: 1
    },

    {
        pregunta: "¿En qué siglo llegó el ser humano a la Luna?",
        opciones: ["Siglo XVIII", "Siglo XIX", "Siglo XX", "Siglo XXI"],
        correcta: 2
    }
];

let preguntaActual = 0;
let puntuacion = 0;

function mostrarQuiz() {

    const contenedor = document.getElementById("quiz");

    const pregunta = preguntas[preguntaActual];

    contenedor.innerHTML = `
        <p class="numero-pregunta">
            Pregunta ${preguntaActual + 1} de ${preguntas.length}
        </p>

        <h3>${pregunta.pregunta}</h3>

        <div class="opciones">
            ${pregunta.opciones.map((opcion, indice) => `
                <button class="opcion" onclick="responder(${indice})">
                    ${opcion}
                </button>
            `).join("")}
        </div>
    `;
}

function responder(indice) {

    const pregunta = preguntas[preguntaActual];

    const botones = document.querySelectorAll(".opcion");

    botones.forEach((boton) => {
        boton.disabled = true;
    });

    if (indice === pregunta.correcta) {

        puntuacion++;

        botones[indice].classList.add("correcta");

    } else {

        botones[indice].classList.add("incorrecta");

        botones[pregunta.correcta].classList.add("correcta");
    }

    setTimeout(() => {

        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            mostrarQuiz();
        } else {
            mostrarResultado();
        }

    }, 900);
}


function mostrarResultado() {

    const contenedor = document.getElementById("quiz");

    let mensaje;

    if (puntuacion === preguntas.length) {
        mensaje = "🏆 ¡Perfecto! Sos un experto en historia.";
    } else if (puntuacion >= 3) {
        mensaje = "👏 ¡Muy bien! Tenés buenos conocimientos de historia.";
    } else {
        mensaje = "📚 Buen comienzo. Siempre hay algo nuevo que aprender.";
    }

    contenedor.innerHTML = `
        <div class="resultado">
            <p>RESULTADO FINAL</p>

            <strong>${puntuacion}/${preguntas.length}</strong>

            <h3>${mensaje}</h3>

            <button class="reiniciar" onclick="reiniciarQuiz()">
                Volver a intentar
            </button>
        </div>
    `;
}


function reiniciarQuiz() {

    preguntaActual = 0;
    puntuacion = 0;

    mostrarQuiz();
}