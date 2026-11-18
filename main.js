const PUNTOS_POR_ACIERTO = 100;
const DURACION_PASO = 700;
const PREGUNTAS_POR_PARTIDA = 9; // una pregunta por círculo del sendero (WAYPOINTS)

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
	},
	{
		texto: "¿Cuál es la capital de Canadá?",
		opciones: ["Toronto", "Ottawa", "Vancouver"],
		correcta: "Ottawa",
		explicacion: "Ottawa es la capital de Canadá, donde está el gobierno. Toronto es la ciudad más grande, pero no la capital."
	},
	{
		texto: "¿Quién escribió “Cien años de soledad”?",
		opciones: ["Gabriel García Márquez", "Mario Vargas Llosa", "Pablo Neruda"],
		correcta: "Gabriel García Márquez",
		explicacion: "Es una novela del escritor colombiano Gabriel García Márquez (1967). Vargas Llosa es peruano y Neruda era poeta."
	},
	{
		texto: "¿Quién fue el autor de “El Martín Fierro”?",
		opciones: ["Ricardo Güiraldes", "Leopoldo Lugones", "José Hernández"],
		correcta: "José Hernández",
		explicacion: "Martín Fierro es un poema gauchesco argentino escrito por José Hernández. Güiraldes y Lugones escribieron otras obras."
	},
	{
		texto: "¿Qué científico descubrió la penicilina?",
		opciones: ["Louis Pasteur", "Alexander Fleming", "Marie Curie"],
		correcta: "Alexander Fleming",
		explicacion: "En 1928 Fleming notó que un moho mataba bacterias, y así surgió el primer antibiótico. Pasteur y Curie hicieron otros descubrimientos."
	},
	{
		texto: "¿Cuál es la capital de Japón?",
		opciones: ["Osaka", "Kioto", "Tokio"],
		correcta: "Tokio",
		explicacion: "Tokio es la capital actual de Japón. Kioto lo fue hace siglos y Osaka es solo una gran ciudad."
	},
	{
		texto: "¿Qué imperio construyó Machu Picchu?",
		opciones: ["Azteca", "Maya", "Inca"],
		correcta: "Inca",
		explicacion: "Los incas construyeron Machu Picchu en los Andes, en Perú. Aztecas y mayas vivieron en otras regiones de América."
	},
	{
		texto: "¿Quién escribió “El Principito”?",
		opciones: ["Julio Verne", "Antoine de Saint-Exupéry", "Hans Christian Andersen"],
		correcta: "Antoine de Saint-Exupéry",
		explicacion: "El escritor y piloto francés Antoine de Saint-Exupéry lo publicó en 1943. Verne escribió novelas de aventuras y Andersen, cuentos como “El patito feo”."
	},
	{
		texto: "¿Cuál es el símbolo químico del sodio?",
		opciones: ["S", "So", "Na"],
		correcta: "Na",
		explicacion: "Na viene del latín natrium, el nombre antiguo del sodio. La S es el símbolo del azufre."
	},
	{
		texto: "¿Cuál es el hueso más largo del cuerpo humano?",
		opciones: ["Húmero", "Fémur", "Tibia"],
		correcta: "Fémur",
		explicacion: "El fémur está en el muslo y es el hueso más largo y fuerte. El húmero es del brazo y la tibia, de la pierna."
	},
	{
		texto: "¿Quién fue la primera persona en ganar premios Nobel en dos disciplinas científicas distintas?",
		opciones: ["Marie Curie", "Albert Einstein", "Niels Bohr"],
		correcta: "Marie Curie",
		explicacion: "Marie Curie ganó el Nobel de Física (1903) y el de Química (1911). Einstein y Bohr ganaron solo el de Física."
	},
	{
		texto: "¿Quién pintó “Las Meninas”?",
		opciones: ["Goya", "Velázquez", "El Greco"],
		correcta: "Velázquez",
		explicacion: "Diego Velázquez pintó “Las Meninas” en 1656. Goya y El Greco fueron otros grandes pintores españoles, de épocas distintas."
	},
	{
		texto: "¿Cuál es el desierto más grande del mundo?",
		opciones: ["Sahara", "Antártico", "Gobi"],
		correcta: "Antártico",
		explicacion: "Un desierto es una zona con muy pocas precipitaciones, aunque haga frío. La Antártida es el más grande; el Sahara es el mayor desierto cálido."
	},
	{
		texto: "¿En qué provincia se encuentra el Aconcagua, la montaña más alta de América?",
		opciones: ["San Juan", "Mendoza", "Salta"],
		correcta: "Mendoza",
		explicacion: "El Aconcagua está en Mendoza, en la cordillera de los Andes, cerca de Chile, y mide casi 7.000 metros."
	},
	{
		texto: "¿Cuál es la provincia más grande de Argentina?",
		opciones: ["Santa Cruz", "Buenos Aires", "Chubut"],
		correcta: "Buenos Aires",
		explicacion: "Buenos Aires es la más grande por superficie, con unos 307.000 km². Santa Cruz es la segunda y Chubut, más chica."
	},
	{
		texto: "¿Dónde se declaró la Independencia argentina en 1816?",
		opciones: ["Buenos Aires", "San Miguel de Tucumán", "Córdoba"],
		correcta: "San Miguel de Tucumán",
		explicacion: "El Congreso se reunió en San Miguel de Tucumán y declaró la Independencia el 9 de julio de 1816."
	},
	{
		texto: "¿Qué año ganó Argentina su primer Mundial de fútbol?",
		opciones: ["1930", "1978", "1986"],
		correcta: "1978",
		explicacion: "Argentina fue campeona por primera vez en 1978, jugando como local. En 1930 perdió la final y en 1986 ganó su segundo título."
	},
	{
		texto: "¿Quién escribió la novela “Rayuela”?",
		opciones: ["Jorge Luis Borges", "Julio Cortázar", "Ernesto Sabato"],
		correcta: "Julio Cortázar",
		explicacion: "Julio Cortázar la publicó en 1963. Borges es conocido por sus cuentos y Sabato por novelas como “El túnel”."
	},
	{
		texto: "¿Qué provincia es la principal productora de yerba mate de Argentina?",
		opciones: ["Corrientes", "Misiones", "Chaco"],
		correcta: "Misiones",
		explicacion: "Misiones produce la mayor parte de la yerba mate argentina. Corrientes también la cultiva, pero en menor cantidad."
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
	preguntasPartida = mezclarLista(PREGUNTAS).slice(0, PREGUNTAS_POR_PARTIDA);
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
