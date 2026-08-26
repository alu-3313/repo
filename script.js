// ==========================================
// MODO OSCURO / CLARO
// ==========================================

const botonTema = document.createElement("button");

botonTema.id = "botonTema";
botonTema.textContent = "☀️";
botonTema.title = "Cambiar tema";

document.body.appendChild(botonTema);

botonTema.addEventListener("click", function () {

    document.body.classList.toggle("modo-claro");

    if (document.body.classList.contains("modo-claro")) {
        botonTema.textContent = "🌙";
    } else {
        botonTema.textContent = "☀️";
    }

});


// ==========================================
// ANIMACIÓN DE LOS PERÍODOS
// ==========================================

const periodos = document.querySelectorAll(".periodo");

const observador = new IntersectionObserver(function (entradas) {

    entradas.forEach(function (entrada) {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.15
});

periodos.forEach(function (periodo) {
    observador.observe(periodo);
});


// ==========================================
// INFORMACIÓN EXTRA
// ==========================================

const informacionExtra = {

    grecia: `
        <strong>Dato curioso:</strong><br><br>
        Los Juegos Olímpicos antiguos comenzaron en Olimpia y estaban dedicados
        a Zeus. Durante su celebración se detenían temporalmente algunos conflictos
        entre las ciudades griegas.<br><br>

        <strong>Otro dato:</strong><br><br>
        La democracia ateniense no era igual a la actual: solamente determinados
        ciudadanos podían participar directamente en las decisiones políticas.
    `,

    roma: `
        <strong>Dato curioso:</strong><br><br>
        Los romanos utilizaban una compleja red de caminos para mover soldados,
        mercancías y mensajes. Muchas rutas fueron tan resistentes que algunas
        de sus trazas todavía existen.<br><br>

        <strong>Un legado importante:</strong><br><br>
        El latín, lengua de los romanos, dio origen a idiomas como el español,
        el francés, el italiano, el portugués y el rumano.
    `,

    media: `
        <strong>Dato curioso:</strong><br><br>
        Las universidades medievales se convirtieron en centros fundamentales
        para conservar y estudiar conocimientos de filosofía, medicina, derecho
        y otras disciplinas.<br><br>

        <strong>Un gran cambio:</strong><br><br>
        Durante los últimos siglos de la Edad Media crecieron las ciudades,
        el comercio y una nueva clase social relacionada con comerciantes y artesanos.
    `,

    renacimiento: `
        <strong>Dato curioso:</strong><br><br>
        La imprenta de tipos móviles permitió producir libros en grandes cantidades
        y facilitó que las ideas circularan mucho más rápido por Europa.<br><br>

        <strong>Una nueva mirada:</strong><br><br>
        Los artistas comenzaron a estudiar con mayor atención la anatomía,
        la perspectiva y las proporciones para representar el cuerpo y el espacio
        de manera más realista.
    `,

    moderna: `
        <strong>Dato curioso:</strong><br><br>
        Los viajes oceánicos hicieron que productos, animales, plantas y alimentos
        pasaran entre continentes a una escala desconocida hasta entonces.<br><br>

        <strong>Grandes cambios:</strong><br><br>
        Durante esta etapa también avanzaron la astronomía y la física.
        Las ideas de científicos como Galileo y Newton cambiaron la forma de
        comprender el universo.
    `,

    industrial: `
        <strong>Dato curioso:</strong><br><br>
        El ferrocarril permitió transportar personas y mercancías mucho más rápido
        y conectó ciudades que antes estaban separadas por largos viajes.<br><br>

        <strong>Consecuencia social:</strong><br><br>
        El crecimiento de las fábricas provocó nuevas condiciones laborales
        y contribuyó al surgimiento de movimientos obreros que reclamaban
        mejores salarios y jornadas de trabajo.
    `,

    siglo20: `
        <strong>Dato curioso:</strong><br><br>
        En 1969, la misión Apollo 11 llevó a los primeros seres humanos a la Luna.
        El acontecimiento fue transmitido por televisión a millones de personas.<br><br>

        <strong>Otro cambio enorme:</strong><br><br>
        Durante la segunda mitad del siglo XX surgieron los primeros ordenadores
        personales y las redes que posteriormente darían origen a Internet.
    `,

    actualidad: `
        <strong>Dato curioso:</strong><br><br>
        Los teléfonos inteligentes permiten llevar en un solo dispositivo
        cámara, mapas, música, comunicación y acceso a enormes cantidades
        de información.<br><br>

        <strong>El gran desafío:</strong><br><br>
        La humanidad actualmente intenta aprovechar nuevas tecnologías mientras
        enfrenta problemas como el cambio climático, la desinformación y la
        protección de los datos personales.
    `
};


periodos.forEach(function (periodo) {

    const contenido = periodo.querySelector(".contenido");

    const boton = document.createElement("button");

    boton.className = "descubrir";
    boton.textContent = "Descubrir más +";

    const informacion = document.createElement("div");

    informacion.className = "informacion-extra";

    informacion.innerHTML = informacionExtra[periodo.id];

    contenido.appendChild(boton);
    contenido.appendChild(informacion);

    boton.addEventListener("click", function () {

        informacion.classList.toggle("mostrar");

        if (informacion.classList.contains("mostrar")) {
            boton.textContent = "Ocultar información −";
        } else {
            boton.textContent = "Descubrir más +";
        }

    });

});


// ==========================================
// QUIZ
// ==========================================

const preguntas = [
    {
        pregunta: "¿Dónde surgió una de las primeras formas de democracia directa?",
        opciones: ["Roma", "Atenas", "Egipto", "Persia"],
        correcta: 1
    },

    {
        pregunta: "¿Qué idioma tuvo una gran influencia en el español?",
        opciones: ["Latín", "Griego", "Árabe", "Chino"],
        correcta: 0
    },

    {
        pregunta: "¿Qué invento ayudó enormemente a difundir libros durante el Renacimiento?",
        opciones: ["El teléfono", "La imprenta", "El motor", "La radio"],
        correcta: 1
    },

    {
        pregunta: "¿Qué transformó la producción durante la Revolución Industrial?",
        opciones: ["Las fábricas y las máquinas", "La navegación", "La escritura", "Los castillos"],
        correcta: 0
    },

    {
        pregunta: "¿En qué año llegó Apollo 11 a la Luna?",
        opciones: ["1945", "1957", "1969", "1978"],
        correcta: 2
    }
];

let preguntaActual = 0;
let puntuacion = 0;

const quiz = document.getElementById("quiz");

function mostrarPregunta() {

    const pregunta = preguntas[preguntaActual];

    quiz.innerHTML = `
        <p class="numero-pregunta">
            Pregunta ${preguntaActual + 1} de ${preguntas.length}
        </p>

        <h3>${pregunta.pregunta}</h3>

        <div class="opciones">

            ${pregunta.opciones.map(function (opcion, indice) {

                return `
                    <button
                        class="opcion"
                        data-respuesta="${indice}">
                        ${opcion}
                    </button>
                `;

            }).join("")}

        </div>
    `;

    const botones = document.querySelectorAll(".opcion");

    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const respuesta = Number(boton.dataset.respuesta);

            responder(respuesta, botones);

        });

    });

}

function responder(respuesta, botones) {

    botones.forEach(function (boton) {
        boton.disabled = true;
    });

    const pregunta = preguntas[preguntaActual];

    if (respuesta === pregunta.correcta) {

        puntuacion++;

        botones[respuesta].classList.add("correcta");

    } else {

        botones[respuesta].classList.add("incorrecta");

        botones[pregunta.correcta].classList.add("correcta");

    }

    setTimeout(function () {

        preguntaActual++;

        if (preguntaActual < preguntas.length) {

            mostrarPregunta();

        } else {

            mostrarResultado();

        }

    }, 1000);

}

function mostrarResultado() {

    let mensaje = "";

    if (puntuacion === 5) {
        mensaje = "🏆 ¡Perfecto! Conocés muchísimo de historia.";
    } else if (puntuacion >= 3) {
        mensaje = "👏 ¡Muy bien! Tenés una buena base de historia.";
    } else {
        mensaje = "📚 Buen comienzo. Podés volver a intentarlo.";
    }

    quiz.innerHTML = `
        <div class="resultado">

            <p>RESULTADO FINAL</p>

            <strong>${puntuacion}/5</strong>

            <h3>${mensaje}</h3>

            <button class="reiniciar">
                Volver a intentar
            </button>

        </div>
    `;

    document
        .querySelector(".reiniciar")
        .addEventListener("click", function () {

            preguntaActual = 0;
            puntuacion = 0;

            mostrarPregunta();

        });

}


// Iniciar quiz
mostrarPregunta();

// ==========================================
// NAVEGACIÓN INTERACTIVA DE LA LÍNEA DEL TIEMPO
// ==========================================

const enlacesNavegacion = document.querySelectorAll("nav a");

enlacesNavegacion.forEach(function (enlace) {

    enlace.addEventListener("click", function (evento) {

        evento.preventDefault();

        // Obtiene el ID al que apunta el enlace
        const destinoID = enlace.getAttribute("href");

        const destino = document.querySelector(destinoID);

        if (!destino) {
            return;
        }

        // Quitar el resaltado de otras épocas
        document.querySelectorAll(".periodo").forEach(function (periodo) {
            periodo.classList.remove("resaltado");
        });

        // Desplazarse hasta la época seleccionada
        destino.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Esperar un poco para que termine el desplazamiento
        setTimeout(function () {

            destino.classList.add("resaltado");

            // Quitar el resaltado después de 2 segundos
            setTimeout(function () {
                destino.classList.remove("resaltado");
            }, 2000);

        }, 500);

    });

});