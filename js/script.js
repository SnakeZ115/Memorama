let cartasSeleccionadas = []
let pares = 0;
let maxPares = 0;

function mostrarVentana2() {
    let ventanaPrincipal = document.getElementById('ventanaPrincipal');
    let ventanaSecundaria = document.getElementById('ventanaSecundaria');
    ventanaPrincipal.classList.add('hidden');
    ventanaSecundaria.classList.remove('hidden');
}

function ocultarVentana2() {
    let ventanaSecundaria = document.getElementById('ventanaSecundaria');
    ventanaSecundaria.classList.add('hidden');
}

function opcionRegresar() {
    let tablero = document.getElementById('tablero');
    let boton = document.getElementById('contenedor-botonRegresar');
    boton.classList.add('hidden');
    tablero.innerHTML = "";
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
    boton.classList.remove('hidden');
    tablero.classList.remove('hidden');
    tablero.style.display = 'grid';
    tablero.style.gridTemplateColumns = `repeat(${filas}, 1fr)`
    tablero.style.columnGap = '30px';
    tablero.style.rowGap = '30px';
    tablero.style.maxHeight = '90vh';
    posiblesPares(filas,columnas);
    cargarIconos();
    ponerCartas(filas,columnas);
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