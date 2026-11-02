const PUNTOS_POR_ACIERTO = 100;
const DURACION_PASO = 700;
const PREGUNTAS = [
	{ texto: "¿En qué país se encuentra la Torre de Pisa?", opciones: ["Italia", "Francia", "Grecia"], correcta: "Italia" },
	{ texto: "¿Quién pintó la Mona Lisa?", opciones: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh"], correcta: "Leonardo da Vinci" },
	{ texto: "¿En qué se inspira la bandera Argentina?", opciones: ["El manto de la Virgen María", "El color del cielo y las nubes", "La Casa de Borbón (realeza española)"], correcta: "La Casa de Borbón (realeza española)" },
	{ texto: "¿Cuál es el animal más rápido del mundo?", opciones: ["Guepardo", "Halcón peregrino", "Pez vela"], correcta: "Halcón peregrino" },
	{ texto: "¿Cuál es el planeta más grande del sistema solar?", opciones: ["Saturno", "Júpiter", "Neptuno"], correcta: "Júpiter" }
];

const WAYPOINTS = [
	{ x: 7.8, y: 43.5 },
	{ x: 30.0, y: 44.9 },
	{ x: 40.7, y: 56.9 },
	{ x: 49.5, y: 40.7 },
	{ x: 62.9, y: 50.7 },
	{ x: 68.0, y: 36.6 },
	{ x: 80.4, y: 55.0 },
	{ x: 88.1, y: 64.4 },
	{ x: 92.9, y: 41.6 }
];
const PARADAS = [0, 2, 3, 5, 7, 8];

const botonComenzar = document.querySelector("#btn-comenzar");
const botonReiniciar = document.querySelector("#btn-reiniciar");
const botonMenu = document.querySelector("#btn-menu");
const botonMenuFinal = document.querySelector("#btn-menu-final");
const bienvenida = document.querySelector("#bienvenida");
const juego = document.querySelector("#juego");
const panelPregunta = document.querySelector("#panel-pregunta");
const panelFinal = document.querySelector("#panel-final");
const textoPregunta = document.querySelector("#pregunta-texto");
const contenedorOpciones = document.querySelector("#opciones");
const feedback = document.querySelector("#feedback");
const hudNivel = document.querySelector("#hud-nivel");
const hudPuntos = document.querySelector("#hud-puntos");
const mapa = document.querySelector("#mapa");
const personaje = mapa.querySelector("#personaje");
const tituloFinal = document.querySelector("#final-titulo");
const textoFinal = document.querySelector("#final-texto");

let nivel = 0;
let puntos = 0;
let respondiendo = false;
let partida = 0; // identifica la partida en curso; permite cancelar esperas y animaciones al salir

// Pausa la transición para ubicar al explorador sin que camine al reiniciar.
function colocarPersonajeSinAnimacion(indiceWaypoint) {
	personaje.style.transition = "none";
	colocarPersonaje(indiceWaypoint);
	personaje.getBoundingClientRect();
	personaje.style.transition = "";
}

// Ubica al personaje usando las coordenadas porcentuales del mapa.
function colocarPersonaje(indiceWaypoint) {
	const waypoint = WAYPOINTS[indiceWaypoint];
	personaje.style.left = `${waypoint.x}%`;
	personaje.style.top = `${waypoint.y}%`;
}

// Mezcla una copia de las opciones con el algoritmo Fisher-Yates.
function mezclarOpciones(opciones) {
	let mezcla;
	do {
		mezcla = [...opciones];
		for (let indice = mezcla.length - 1; indice > 0; indice--) {
			const aleatorio = Math.floor(Math.random() * (indice + 1));
			[mezcla[indice], mezcla[aleatorio]] = [mezcla[aleatorio], mezcla[indice]];
		}
	} while (mezcla.every((opcion, indice) => opcion === opciones[indice]));
	return mezcla;
}

// Prepara y muestra la pregunta correspondiente al nivel actual.
function mostrarPregunta() {
	const pregunta = PREGUNTAS[nivel];
	respondiendo = false;
	hudNivel.textContent = `Nivel ${nivel + 1} de ${PREGUNTAS.length}`;
	textoPregunta.textContent = pregunta.texto;
	feedback.textContent = "";
	contenedorOpciones.replaceChildren();

	for (const opcion of mezclarOpciones(pregunta.opciones)) {
		const boton = document.createElement("button");
		boton.type = "button";
		boton.className = "opcion";
		boton.textContent = opcion;
		boton.addEventListener("click", () => responder(boton));
		contenedorOpciones.append(boton);
	}

	panelPregunta.hidden = false;
}

// Informa el resultado, bloquea respuestas adicionales y avanza una parada.
async function responder(botonElegido) {
	if (respondiendo) return;
	respondiendo = true;
	const idPartida = partida;

	const pregunta = PREGUNTAS[nivel];
	const botones = [...contenedorOpciones.querySelectorAll(".opcion")];
	for (const boton of botones) boton.disabled = true;

	if (botonElegido.textContent === pregunta.correcta) {
		botonElegido.classList.add("correcta");
		puntos += PUNTOS_POR_ACIERTO;
		hudPuntos.textContent = `Puntos: ${puntos}`;
		hudPuntos.classList.remove("pop");
		void hudPuntos.offsetWidth;
		hudPuntos.classList.add("pop");
		feedback.textContent = `¡Correcto! +${PUNTOS_POR_ACIERTO} puntos`;
	} else {
		botonElegido.classList.add("incorrecta");
		const botonCorrecto = botones.find((boton) => boton.textContent === pregunta.correcta);
		botonCorrecto?.classList.add("correcta");
		feedback.textContent = `Incorrecto. La respuesta correcta era: ${pregunta.correcta}`;
	}

	await esperar(1800);
	if (idPartida !== partida) return;
	panelPregunta.hidden = true;
	await moverPersonaje(nivel, nivel + 1, idPartida);
	if (idPartida !== partida) return;
	nivel++;

	if (nivel < PREGUNTAS.length) {
		mostrarPregunta();
	} else {
		mostrarFinal();
	}
}

// Espera mientras el personaje recorre cada círculo intermedio del sendero.
async function moverPersonaje(desdeParada, hastaParada, idPartida) {
	personaje.classList.add("caminando");
	const primerWaypoint = PARADAS[desdeParada] + 1;
	const ultimoWaypoint = PARADAS[hastaParada];

	for (let indice = primerWaypoint; indice <= ultimoWaypoint; indice++) {
		colocarPersonaje(indice);
		await esperar(DURACION_PASO);
		if (idPartida !== partida) return;
	}

	personaje.classList.remove("caminando");
}

// Muestra el resultado final según la cantidad de respuestas correctas.
function mostrarFinal() {
	if (puntos === 500) {
		tituloFinal.textContent = "¡Expedición perfecta!";
	} else if (puntos >= 300) {
		tituloFinal.textContent = "¡Muy bien, explorador!";
	} else {
		tituloFinal.textContent = "La expedición recién comienza";
	}

	textoFinal.textContent = `Lograste ${puntos} de 500 puntos`;
	panelFinal.hidden = false;
}

// Reinicia la partida y coloca al explorador al comienzo del mapa.
async function iniciarJuego(esperarAntesDePregunta = true) {
	partida++;
	const idPartida = partida;
	nivel = 0;
	puntos = 0;
	respondiendo = false;
	hudNivel.textContent = "Nivel 1 de 5";
	hudPuntos.textContent = "Puntos: 0";
	hudPuntos.classList.remove("pop");
	panelPregunta.hidden = true;
	panelFinal.hidden = true;
	document.body.classList.add("jugando");
	bienvenida.hidden = true;
	botonComenzar.hidden = true;
	juego.hidden = false;
	colocarPersonajeSinAnimacion(PARADAS[0]);

	if (esperarAntesDePregunta) await esperar(600);
	if (idPartida !== partida) return;
	mostrarPregunta();
}

// Vuelve a la pantalla inicial y cancela cualquier espera o animación pendiente.
function volverAlMenu() {
	partida++;
	respondiendo = false;
	personaje.classList.remove("caminando");
	panelPregunta.hidden = true;
	panelFinal.hidden = true;
	juego.hidden = true;
	document.body.classList.remove("jugando");
	bienvenida.hidden = false;
	botonComenzar.hidden = false;
}

// Crea una espera reutilizable para las pausas de las animaciones.
function esperar(duracion) {
	return new Promise((resolver) => setTimeout(resolver, duracion));
}

botonComenzar.addEventListener("click", () => iniciarJuego());
botonReiniciar.addEventListener("click", () => iniciarJuego(false));
botonMenu.addEventListener("click", volverAlMenu);
botonMenuFinal.addEventListener("click", volverAlMenu);