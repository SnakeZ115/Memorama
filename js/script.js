let cartasSeleccionadas = []
let pares = 0;
let maxPares = 0;
let usuario;

function obtenerUsuario() {
    let usuarioInput = document.getElementById('Usuario').value;
    if (usuarioInput === "") {
        usuario = "null";
    } else {
        usuario = usuarioInput;
    }
}

function mostrarVentana2() {
    obtenerUsuario();
    let ventanaUsuario = document.getElementById('ventanaUsuario');
    let ventanaSecundaria = document.getElementById('ventanaSecundaria');
    ventanaUsuario.classList.add('hidden');
    ventanaSecundaria.classList.remove('hidden');
}

function ocultarVentana2() {
    let ventanaSecundaria = document.getElementById('ventanaSecundaria');
    ventanaSecundaria.classList.add('hidden');
}

function mostrarVentanaUsuario() {
    let ventanaPrincipal = document.getElementById('ventanaPrincipal');
    ventanaPrincipal.classList.add('hidden');
    let ventanaUsuario = document.getElementById('ventanaUsuario');
    ventanaUsuario.classList.remove('hidden');
}

function ocultarVentanaUsuario() {
    let ventanaUsuario = document.getElementById('ventanaUsuario');
    ventanaUsuario.classList.add('hidden');
}

function opcionRegresar() {
    let tablero = document.getElementById('tablero');
    let boton = document.getElementById('contenedor-botonRegresar');
    boton.classList.add('hidden');
    tablero.innerHTML = "";
    let cronometroDiv = document.getElementById('cronometro');
    cronometroDiv.classList.add('hidden');
    reiniciarCronometro();
    pararCronometro();
    mostrarVentana2();
}

function girarCarta(index) {
    let carta = document.getElementById('carta'+index);
    let areaCarta = document.getElementById('area-carta'+index);
    if(carta.style.display != "hidden" && areaCarta.style.backgroundColor != "plum") {
        carta.childNodes[1].classList.remove('hidden');
        carta.childNodes[3].classList.add('hidden'); 
        cartasSeleccionadas.push(index);       
    }
    if(cartasSeleccionadas.length == 2){
        comprobarPar(cartasSeleccionadas);
        cartasSeleccionadas = [];
    }
}

function comprobarPar(cartasSeleccionadas) {
    setTimeout(() => {
        let cartaFrente1 = document.getElementById('frente'+cartasSeleccionadas[0]);
        let cartaFrente2 = document.getElementById('frente'+cartasSeleccionadas[1]);
        if (cartaFrente1.innerHTML == cartaFrente2.innerHTML) {
            let carta1 = document.getElementById('area-carta'+cartasSeleccionadas[0]);
            let carta2 = document.getElementById('area-carta'+cartasSeleccionadas[1]);            
            carta1.style.backgroundColor = "plum";
            carta2.style.backgroundColor = "plum";
            pares++;
        } else {
            let cartaTrasera1 = document.getElementById('atras'+cartasSeleccionadas[0]);
            let cartaTrasera2 = document.getElementById('atras'+cartasSeleccionadas[1]);
            cartaFrente1.classList.add("hidden");
            cartaTrasera1.classList.remove("hidden");
            cartaFrente2.classList.add("hidden");
            cartaTrasera2.classList.remove("hidden");
        }        
    }, 1000);
    if(pares === maxPares-1) {
        window.alert("HAS GANADO");
        pararCronometro();
        agregar();
        pares = 0;
    }
}

function ponerCartas(filas, columnas) {
    let numeroCartas = filas * columnas;
    let cartas = [];
    for (let index = 0; index < numeroCartas; index++) {
        cartas.push(` 
        <div id="area-carta${index}" class="area-carta">
            <div id="carta${index}" onclick="girarCarta(${index})">
                <div id="frente${index}" class="carta-frente hidden">
                    ${iconos[0]}
                </div>
                <div id="atras${index}" class="carta-atras">
                    <div class="circulo"></div>
                </div>
            </div>        
        </div>
        `);            
        if(index % 2 == 1){
            iconos.splice(0,1);
        }
    }
    cartas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = cartas.join(" ");
}

function posiblesPares(filas, columnas) {
    maxPares = (filas * columnas)/2;
}

function generarTablero(filas, columnas) {
    ocultarVentana2();
    let tablero = document.getElementById('tablero');
    let boton = document.getElementById('contenedor-botonRegresar');
    let body = document.getElementById('body');
    body.style.height = '120%';
    boton.classList.remove('hidden');
    tablero.classList.remove('hidden');
    tablero.style.display = 'grid';
    tablero.style.gridTemplateColumns = `repeat(${filas}, 1fr)`
    tablero.style.columnGap = '30px';
    tablero.style.rowGap = '30px';
    tablero.style.maxHeight = '70vh';
    posiblesPares(filas,columnas);
    cargarIconos();
    ponerCartas(filas,columnas);
    let cronometroDiv = document.getElementById('cronometro');
    cronometroDiv.classList.remove('hidden');
    cronometro = setInterval(actualizarCronometro,10);
}

function cargarIconos() {
    iconos = [
        '<i class="fa-solid fa-dungeon"></i>',
        '<i class="fa-solid fa-square-full"></i>',
        '<i class="fa-solid fa-dice-six"></i>',
        '<i class="fa-solid fa-ghost"></i>',
        '<i class="fa-solid fa-chess-queen"></i>',
        '<i class="fa-solid fa-headset"></i>',
        '<i class="fa-solid fa-hand-fist"></i>',
        '<i class="fa-solid fa-wand-sparkles"></i>',
        '<i class="fa-solid fa-vr-cardboard"></i>',
        '<i class="fa-solid fa-dice-d6"></i>',
        '<i class="fa-solid fa-hat-wizard"></i>',
        '<i class="fa-solid fa-skull-crossbones"></i>',
        '<i class="fa-solid fa-puzzle-piece"></i>',
        '<i class="fa-solid fa-ring"></i>',
        '<i class="fa-solid fa-chess-rook"></i>',
        '<i class="fa-solid fa-chess-board"></i>',
        '<i class="fa-solid fa-chess-knight"></i>',
        '<i class="fa-solid fa-dice-one"></i>'
    ];
}


// CRONOMETRO
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let cronometro;

let minutosSpan = document.getElementById('minutos');
let segundosSpan = document.getElementById('segundos');
let milisegundosSpan = document.getElementById('milisegundos');

function actualizarCronometro() {

    milisegundos += 1;

    if (milisegundos == 100) {
        milisegundos = 0;
        segundos += 1;
    }

    if (segundos == 60) {
        segundos = 0;
        minutos += 1;
    }

    if (minutos < 10) {
        minutosSpan.textContent = "0" + minutos;
    } else {
        minutosSpan.textContent = minutos;
    }
    
    if (segundos < 10) {
        segundosSpan.textContent = "0" + segundos;
    } else {
        segundosSpan.textContent = segundos;
    }
    
    if (milisegundos < 10) {
        milisegundosSpan.textContent = "0" + milisegundos;
    } else {
        milisegundosSpan.textContent = milisegundos;
    }

}

function pararCronometro() {
    clearInterval(cronometro);
}

function reiniciarCronometro() {
    clearInterval(cronometro);

    minutos = 0;
    segundos = 0;
    milisegundos = 0;

    minutosSpan.textContent = "00";
    segundosSpan.textContent = "00";
    milisegundosSpan.textContent = "00";
}

// Agregar
async function agregar() {
    try {
        let tiempo = `${minutos}:${segundos}:${milisegundos}`;
        let url = "https://memorama-da5ae-default-rtdb.firebaseio.com/";
        let jugador = {
            Usuario: usuario,
            Tiempo: tiempo
        };

        const config = {
            method : 'POST',
            body: JSON.stringify(jugador),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        };
        
        const response = await fetch(`${url}/jugadores.json`,config);
        const jugadores = await response.json;


    } catch (error) {
        console.error(error);
    }


}