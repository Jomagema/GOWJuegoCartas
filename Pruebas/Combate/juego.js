var kratos = {
    nombre: "Kratos",
    vida_maxima: 10,
    vida: 10,
    escudo: 0,
    tamanio_mazo: 3
}

var enemigo = {
    nombre: "Draugr",
    vida_maxima: 10,
    vida: 10,
}

var tipos = ["Daño", "Curar", "Escudo"];

window.onload = function() {
    actualizarDatos();
    repartirCartas();
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
   let daño = num(1, 3);
   
    if(kratos.escudo == 0){
        kratos.vida -= daño;
    } else if (kratos.escudo > 0){
        kratos.escudo -= daño;
        if(kratos.escudo < 0){
            kratos.vida += kratos.escudo;
            kratos.escudo = 0;
        }
    }
    actualizarDatos();
    resultado();
}