const PUNTOS_POR_ACIERTO = 100;
const DURACION_PASO = 700;

// Cada pregunta tiene su explicación, que se muestra después de responder (acierte o no).
// "correcta" debe ser idéntica a una de las opciones.
const PREGUNTAS = [
	{
		texto: "¿En qué país se encuentra la Torre de Pisa?",
		opciones: ["Italia", "Francia", "Grecia"],
		correcta: "Italia",
		explicacion: "Está en la ciudad de Pisa, en la Toscana italiana. Es el campanario de la catedral: su construcción empezó en 1173 y se inclinó porque el suelo cedió de un lado."
	},
	{
		texto: "¿Quién pintó la Mona Lisa?",
		opciones: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh"],
		correcta: "Leonardo da Vinci",
		explicacion: "Leonardo da Vinci empezó a pintarla hacia 1503. Hoy se exhibe en el Museo del Louvre, en París."
	},
	{
		texto: "¿En qué se inspira la bandera Argentina?",
		opciones: ["El manto de la Virgen María", "El color del cielo y las nubes", "La Casa de Borbón (realeza española)"],
		correcta: "La Casa de Borbón (realeza española)",
		explicacion: "Una de las explicaciones históricas más aceptadas es que Belgrano tomó el celeste y blanco de la Casa de Borbón, la familia real española. La bandera se izó por primera vez en 1812 y el Congreso de Tucumán la adoptó oficialmente en 1816."
	},
	{
		texto: "¿Cuál es el animal más rápido del mundo?",
		opciones: ["Guepardo", "Halcón peregrino", "Pez vela"],
		correcta: "Halcón peregrino",
		explicacion: "El halcón peregrino supera los 300 km/h en picada. El guepardo es el más veloz en tierra firme, con cerca de 100 km/h."
	},
	{
		texto: "¿Cuál es el planeta más grande del sistema solar?",
		opciones: ["Saturno", "Júpiter", "Neptuno"],
		correcta: "Júpiter",
		explicacion: "Su diámetro es unas 11 veces el de la Tierra y en su interior cabrían más de 1.300 planetas como el nuestro."
	},
	{
		texto: "¿Cuál es el gas más abundante en la atmósfera terrestre?",
		opciones: ["Oxígeno", "Nitrógeno", "Argón"],
		correcta: "Nitrógeno",
		explicacion: "El nitrógeno forma cerca del 78 % del aire. Le siguen el oxígeno (alrededor del 21 %) y el argón (menos del 1 %)."
	},
	{
		texto: "¿Cuál se considera uno de los primeros videojuegos de la historia?",
		opciones: ["Pac-Man", "Tennis for Two", "Super Mario Bros."],
		correcta: "Tennis for Two",
		explicacion: "Lo creó el físico William Higinbotham en 1958, en el Laboratorio Nacional de Brookhaven (Estados Unidos). Pac-Man salió en 1980 y Super Mario Bros. en 1985."
	},
	{
		texto: "¿Qué filósofo griego fue maestro de Platón?",
		opciones: ["Aristóteles", "Sócrates", "Heráclito"],
		correcta: "Sócrates",
		explicacion: "Sócrates (470-399 a. C.) fue maestro de Platón, y Platón fue a su vez maestro de Aristóteles."
	},
	{
		texto: "¿Cuál de estas afirmaciones es INCORRECTA?",
		opciones: ["El corazón humano tiene cuatro cavidades", "Los delfines son mamíferos", "Las arañas son insectos"],
		correcta: "Las arañas son insectos",
		explicacion: "Las arañas son arácnidos: tienen 8 patas y el cuerpo en dos partes, mientras que los insectos tienen 6 patas y el cuerpo en tres partes. Las otras dos afirmaciones son verdaderas."
	}
];

// Círculos del sendero, como porcentaje del ancho (x) y del alto (y) de mapa.png.
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
const mapaImg = mapa.querySelector(".mapa-img");
const hud = document.querySelector(".hud");

let nivel = 0;
let puntos = 0;
let respondiendo = false;
let preguntasPartida = []; // las preguntas de la partida actual, en orden aleatorio
let partida = 0; // identifica la partida en curso; permite cancelar esperas y animaciones al salir
let alturaPanelMax = 0; // el panel más alto visto en esta partida (reserva espacio para el mapa)

// Achica el mapa (con su personaje) lo justo para que todo entre en pantalla sin scroll.
// Como el mapa se escala entero (imagen incluida), el personaje siempre queda sobre su círculo.
function ajustarMapa() {
	if (juego.hidden || !mapaImg.naturalWidth) return;

	const panel = !panelFinal.hidden ? panelFinal : panelPregunta;
	if (!panel.hidden) alturaPanelMax = Math.max(alturaPanelMax, panel.offsetHeight);

	const estilo = getComputedStyle(juego);
	const relleno = parseFloat(estilo.paddingTop) + parseFloat(estilo.paddingBottom);
	const hueco = parseFloat(estilo.rowGap) || 0;
	const borde = 8; // 4px de borde a cada lado del mapa

	const altoLibre = juego.clientHeight - relleno - hud.offsetHeight - alturaPanelMax - hueco * 2 - borde;
	const ancho = (altoLibre * mapaImg.naturalWidth) / mapaImg.naturalHeight + borde;

	juego.style.setProperty("--ancho-max", `${Math.max(280, Math.floor(ancho))}px`);
}

window.addEventListener("resize", ajustarMapa);
mapaImg.addEventListener("load", ajustarMapa);

// Devuelve en qué círculo del sendero está el personaje en cada nivel.
// Reparte los niveles a lo largo de todo el camino: el nivel 1 en el primer círculo y el último en el templo.
function indiceDeParada(nivelActual) {
	const ultimoNivel = preguntasPartida.length - 1;
	return Math.round((nivelActual * (WAYPOINTS.length - 1)) / ultimoNivel);
}

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

// Devuelve una copia de la lista en orden aleatorio (algoritmo Fisher-Yates).
function mezclarLista(lista) {
	const mezcla = [...lista];
	for (let indice = mezcla.length - 1; indice > 0; indice--) {
		const aleatorio = Math.floor(Math.random() * (indice + 1));
		[mezcla[indice], mezcla[aleatorio]] = [mezcla[aleatorio], mezcla[indice]];
	}
	return mezcla;
}

// Mezcla las opciones de una pregunta evitando que queden en el orden en que se escribieron.
function mezclarOpciones(opciones) {
	let mezcla;
	do {
		mezcla = mezclarLista(opciones);
	} while (mezcla.every((opcion, indice) => opcion === opciones[indice]));
	return mezcla;
}

// Prepara y muestra la pregunta correspondiente al nivel actual.
function mostrarPregunta() {
	const pregunta = preguntasPartida[nivel];
	respondiendo = false;
	hudNivel.textContent = `Nivel ${nivel + 1} de ${preguntasPartida.length}`;
	textoPregunta.textContent = pregunta.texto;
	feedback.replaceChildren();
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
	ajustarMapa();
}

// Corrige la respuesta, suma puntos si acertó y muestra la explicación con el botón para continuar.
function responder(botonElegido) {
	if (respondiendo) return;
	respondiendo = true;

	const pregunta = preguntasPartida[nivel];
	const botones = [...contenedorOpciones.querySelectorAll(".opcion")];
	for (const boton of botones) boton.disabled = true;

	const acerto = botonElegido.textContent === pregunta.correcta;
	if (acerto) {
		botonElegido.classList.add("correcta");
		puntos += PUNTOS_POR_ACIERTO;
		hudPuntos.textContent = `Puntos: ${puntos}`;
		hudPuntos.classList.remove("pop");
		void hudPuntos.offsetWidth;
		hudPuntos.classList.add("pop");
	} else {
		botonElegido.classList.add("incorrecta");
		const botonCorrecto = botones.find((boton) => boton.textContent === pregunta.correcta);
		botonCorrecto?.classList.add("correcta");
	}

	mostrarResultado(acerto, pregunta, partida);
}

// Muestra si acertó, la explicación de la respuesta correcta y el botón para seguir.
function mostrarResultado(acerto, pregunta, idPartida) {
	const veredicto = document.createElement("p");
	veredicto.className = `veredicto ${acerto ? "correcto" : "incorrecto"}`;
	veredicto.textContent = acerto
		? `¡Correcto! +${PUNTOS_POR_ACIERTO} puntos`
		: `Incorrecto. La respuesta correcta era: ${pregunta.correcta}`;

	const explicacion = document.createElement("p");
	explicacion.className = "explicacion";
	explicacion.textContent = pregunta.explicacion;

	const esUltimoNivel = nivel === preguntasPartida.length - 1;
	const botonSiguiente = document.createElement("button");
	botonSiguiente.type = "button";
	botonSiguiente.className = "btn-continuar";
	botonSiguiente.textContent = esUltimoNivel ? "Ver resultado" : "Siguiente";
	botonSiguiente.addEventListener("click", () => continuar(botonSiguiente, idPartida));

	feedback.replaceChildren(veredicto, explicacion, botonSiguiente);
	botonSiguiente.focus();
	ajustarMapa();
}

// Pasa al siguiente nivel: el explorador camina hasta el próximo círculo, o se muestra el resultado final.
async function continuar(botonSiguiente, idPartida) {
	if (idPartida !== partida) return;
	botonSiguiente.disabled = true;
	panelPregunta.hidden = true;

	if (nivel < preguntasPartida.length - 1) {
		await moverPersonaje(nivel, nivel + 1, idPartida);
		if (idPartida !== partida) return;
		nivel++;
		mostrarPregunta();
	} else {
		nivel++;
		mostrarFinal();
	}
}

// Mueve al explorador pasando por cada círculo intermedio del sendero.
async function moverPersonaje(desdeNivel, hastaNivel, idPartida) {
	personaje.classList.add("caminando");
	const primerWaypoint = indiceDeParada(desdeNivel) + 1;
	const ultimoWaypoint = indiceDeParada(hastaNivel);

	for (let indice = primerWaypoint; indice <= ultimoWaypoint; indice++) {
		colocarPersonaje(indice);
		await esperar(DURACION_PASO);
		if (idPartida !== partida) return;
	}

	personaje.classList.remove("caminando");
}

// Muestra el resultado final según la cantidad de respuestas correctas.
function mostrarFinal() {
	const total = preguntasPartida.length;
	const aciertos = puntos / PUNTOS_POR_ACIERTO;

	if (aciertos === total) {
		tituloFinal.textContent = "¡Expedición perfecta!";
	} else if (aciertos >= Math.ceil(total * 0.6)) {
		tituloFinal.textContent = "¡Muy bien, explorador!";
	} else {
		tituloFinal.textContent = "La expedición recién comienza";
	}

	textoFinal.textContent = `Lograste ${puntos} de ${total * PUNTOS_POR_ACIERTO} puntos`;
	panelFinal.hidden = false;
	ajustarMapa();
}

// Reinicia la partida: preguntas en orden nuevo y explorador al comienzo del mapa.
async function iniciarJuego(esperarAntesDePregunta = true) {
	partida++;
	const idPartida = partida;
	preguntasPartida = mezclarLista(PREGUNTAS);
	nivel = 0;
	puntos = 0;
	alturaPanelMax = 0;
	respondiendo = false;
	hudNivel.textContent = `Nivel 1 de ${preguntasPartida.length}`;
	hudPuntos.textContent = "Puntos: 0";
	hudPuntos.classList.remove("pop");
	personaje.classList.remove("caminando");
	panelPregunta.hidden = true;
	panelFinal.hidden = true;
	document.body.classList.add("jugando");
	bienvenida.hidden = true;
	botonComenzar.hidden = true;
	juego.hidden = false;
	colocarPersonajeSinAnimacion(indiceDeParada(0));

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

// ===== Pantalla de carga =====
const pantallaCarga = document.getElementById("pantalla-carga");
const videoHero = document.querySelector(".hero video");
let cargaOculta = false;

function ocultarPantallaCarga() {
	if (cargaOculta || !pantallaCarga) return;
	cargaOculta = true;
	pantallaCarga.classList.add("oculta");
	setTimeout(() => pantallaCarga.remove(), 1000);
}

if (pantallaCarga) {
	const esperas = [
		new Promise((ok) => {
			if (document.readyState === "complete") ok();
			else window.addEventListener("load", ok, { once: true });
		})
	];

	if (videoHero && videoHero.readyState < 3) {
		esperas.push(new Promise((ok) => videoHero.addEventListener("canplay", ok, { once: true })));
	}

	Promise.all(esperas).then(ocultarPantallaCarga);
	setTimeout(ocultarPantallaCarga, 8000);
}