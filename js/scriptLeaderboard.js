let url = "https://memorama-da5ae-default-rtdb.firebaseio.com/";
let Jugadores = [];

consultar();


async function consultar(){
    try{
        const response = await fetch(`${url}/jugadores.json`);
        const jugadores = await response.json();
        setJugadores(jugadores);
        renderTable(Jugadores);
    }catch (error){
        console.error('Error', error);
    }
}

function setJugadores(data) {
    Object.keys(data).forEach(key => {

        Jugadores.push(data[key]);

    });
    console.log(Jugadores);
    acomodarTiempos();
}

function acomodarTiempos() {
    let aux;
    for (let i = 0; i < Jugadores.length - 1; i++) {
        for (let j = 0; j < Jugadores.length - i - 1; j++) {
            if (Jugadores[j].Tiempo > Jugadores[j + 1].Tiempo) {
                aux = Jugadores[j];
                Jugadores[j] = Jugadores[j + 1];
                Jugadores[j + 1] = aux;
            }
        }
    }
    
    console.log(Jugadores);
    
}


function renderTable(){
    let tbody = document.getElementById('tablaJugadores');
    console.log(tbody);
    let rowHTML = '';

    for (let i = 0; i < Jugadores.length; i++) {
        rowHTML += `<tr>
                        <td style="text-align: center;">${Jugadores[i].Usuario}</td>
                        <td style="text-align: center;">${Jugadores[i].Tiempo}</td>
                    </tr>`;
        
    }
    
    console.log(rowHTML);
    tbody.innerHTML = rowHTML;
}