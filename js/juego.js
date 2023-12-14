var personaje = {};
var enemigo = {};
var ronda = 1;

var enemigos1 = [];
var enemigos2 = [];
var enemigos3 = [];
var recompensas = [];
var bloqueo = [0, 0, 1, 1, 2, 5];

var tipos = ["Daño", "Curar", "Escudo"];

function rellenarEnemigos() {
    fetch('php/obtener_enemigos.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(enemigo => {
            if (enemigo.nivel == 1) {
                enemigos1.push(enemigo);
            } else if (enemigo.nivel == 2) {
                enemigos2.push(enemigo);
            } else if (enemigo.nivel == 3) {
                enemigos3.push(enemigo);
            }
                
            
        });; 


        enemigo = enemigos1[num(0, enemigos1.length-1)];
        
        document.getElementById("enemigo").src = "data:image/png;base64,"+enemigo.imagen; 
        document.getElementById("infoEnemigo").innerHTML = enemigo.nombre+" | Nivel:"+enemigo.nivel+"<br>"+"Vida: "+enemigo.vida+" | Ataque: "+enemigo.ataque; 
        
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}

function rellenarRecompensas() {
    fetch('php/obtener_recompensas.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {

        recompensas = data;

    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });  
}

function datosPersonaje() {
    let parametro = 1;
    let ruta = `php/obtener_personaje.php?parametro=${parametro}`; 
    fetch(ruta)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        
        personaje = data; 
        personaje.mano = 3;
        
        document.getElementById("jugador").src = "data:image/png;base64," + personaje.imagen;
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}

function rellenarCartas() {
    let parametro = 1;
    let ruta = `php/obtener_cartas.php?parametro=${parametro}`;
    fetch(ruta)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        personaje.mazo = [];
        data.forEach(carta => {
            for (let index = 0; index < carta.cantidad; index++) {
                let c = {
                    valor: carta.valor,
                    tipo: carta.tipo,
                    imagen: carta.imagen
                }
                personaje.mazo.push(c);
            }   
        });
        
        console.log(personaje)
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}

window.onload = function() {
    //actualizarDatos();
    //repartirCartas();
    rellenarRecompensas();
    rellenarEnemigos();
    datosPersonaje();
    rellenarCartas();
}


function finTurno() {
   ataqueEnemigo();
   repartirCartas(); 
}

function repartirCartas() {
    let cartas = document.getElementById("cartas");
    while(cartas.firstChild){
        cartas.removeChild(cartas.firstChild);
    }

    for (let index = 1; index <= kratos.tamanio_mazo; index++) {
        //Crea un elemento de tipo boton
        var carta = document.createElement('button');

        //Genera el tipo de accion y su valor
        let tipo = tipos[num(0,2)];
        let valor = num(1,3);

        console.log(tipo, valor)
        //Asigna los datos al elemento
        carta.id = index;
        // Asigna una función al evento onclick del botón
        carta.onclick = function() {
            accion(tipo, valor, index);
        };
        carta.textContent = tipo+" ("+valor+")";

        console.log(carta)

        //Mete el elemento en el div
        cartas.appendChild(carta);
    }
    
}

function accion(tipo, valor, id) {
    if(tipo == "Daño"){
        enemigo.vida -= valor;
        if(enemigo.vida < 0){
            enemigo.vida = 0;
        }
    }else if (tipo == "Curar") {
        kratos.vida += valor;
        if (kratos.vida > kratos.vida_maxima){
            kratos.vida = kratos.vida_maxima;
        }
    } else if (tipo == "Escudo"){
        kratos.escudo += valor;
    }
    actualizarDatos();
    let borrar = document.getElementById(id);
    borrar.parentNode.removeChild(borrar);
    resultado();
}

function num(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function actualizarDatos() {
    document.getElementById("stats").textContent = "Nombre: "+kratos.nombre+" | Vida: "+kratos.vida+" | Escudo: "+kratos.escudo;
    document.getElementById("statsEnemigo").textContent = "Nombre: "+enemigo.nombre+" | Vida: "+enemigo.vida;
}

function resultado() {
    if(enemigo.vida <= 0){
        alert("Has ganado");
    } else if(kratos.vida <= 0){
        alert("Has perdido");
    }
}

function ataqueEnemigo() {
   let daño = enemigo.ataque;
   let registro = document.getElementById("registro")
   
   for (let index = 0; index < enemigo.nivel; index++) {
    if(personaje.escudo == 0){
        registro.innerHTML += "<p>"+enemigo.nombre+" hace "+personaje.vida - daño+"</p><br>";
        personaje.vida -= daño;
    } else if (personaje.escudo > 0){
        personaje.escudo -= daño;
        if(personaje.escudo < 0){
            personaje.vida += personaje.escudo;
            personaje.escudo = 0;
        }
    }

    actualizarDatos();
    resultado(); 
   }
    
}