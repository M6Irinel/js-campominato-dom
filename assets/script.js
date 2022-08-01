
// prendiamo gli elementi dal DOM
const DOM_campo = document.querySelector('.campo');
const DOM_dificult = document.querySelector('.select_difficulty');
const DOM_button_field_campo = document.querySelector('.but_Play');


// SE premiamo il pulsante chiamiamo la funzione genera campo
DOM_button_field_campo.addEventListener('click', fieldGenerator);


// creiamo una funzione per la creazione del campo
function fieldGenerator() {
    
    // una array vuota che vera riempita con l'eventuali elementi
    const piece_Field = [];
    
    // salviamo in una variabile l'oggetto per poterlo richiamare
    let rg = new ResetGame();
    // chiamiamo la funzione remove_element dal oggetto
    rg.remove_element(piece_Field);
    // chiamiamo la cancelazione del campo dal oggetto
    rg.delete;
    
    // creiamo una variabile con il numero per il campo da creare con il valore della dificolta
    const fieldSize = add_difficult();
    
    // calcolare il numero di elementi per quadrato
    const pezziCampoComplete = fieldSize ** 2;

    // creazione del array con numeri random
    const bombs = create_array_number_random(16, 1, pezziCampoComplete);

    // creiamo un for per ogni elemento creato da inserire nel elemento padre del DOM
    for (let i = 0; i < pezziCampoComplete; i++) {
        // salviamo il valore di ritorno della funzione
        piece_Field.push(pieceField(fieldSize));
        // inseriamo il numero dentro al elemento creato
        piece_Field[i].innerHTML = i + 1;
        // appendiamo l'elemento al elemento padre del DOM
        DOM_campo.append(piece_Field[i]);
    }
}


// funzione che crea un elemento per farlo inserire nel elemento padre nel DOM
function pieceField(num) {

    // creiamo l'elemento
    const piece = document.createElement('div');

    // assegnare una classe di default
    piece.className = 'pezzo_campo';

    // aggiungiamo una nuova classe per la schelta del style del border della griglia
    piece.classList.add(DOM_dificult.value);

    // mettiamo una dimensione all'elemento con il css
    piece.style.flexBasis = `calc(100% / ${num})`;

    // assegniamo un ascoltatore di tipo click
    piece.addEventListener('click', piece_click, { once: true });

    // ritorniamo il valore alla funzione
    return piece;
}


// funzione per l'ascoltatore click
function piece_click(params) {

    // aggiungere una nuova classe all'elemento creato
    this.classList.add('active');

    // stampiamo nella console il contenuto dell'elemento creato
    console.log(this.innerHTML);
}


// resetare l'elemento campo
function ResetGame() {

    // rimuovere elementListener dai elementi per faze di prestazione
    this.remove_element = function (ele) {
        for (let i = 0; i < ele.length; i++) {
            ele[i].removeEventListener('click');
        }
    }
    
    // togliamo tutto quello che c'è nel DOM campo
    this.delete = DOM_campo.innerHTML = '';
}


// aggiunta della dificolta
function add_difficult() {
    // usiamo switch per i nostri casi
    switch (DOM_dificult.value) {
        case 'medium':
            return 9;
        case 'hard':
            return 7;
        default:
            return 10;
    }
}


// funzione che crea numeri random
function number_random(min, max) {
    // SE numero massimo e maggiore di min
    if(max < min){
        // numero massimo e = al numero min
        max = min;
    }
    // rittorno valore alla funzione
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// genera una array di x numeri randomici
function create_array_number_random(length_array, num_min, num_max) {
    // una array vuota di default
    const array = [];
    
    // ripeti ciclo fino a quando non e arrivata l'array alla lunghezza scelta da noi
    while (array.length < length_array) {
        
        // salviamo il numero generato
        const num = number_random(num_min, num_max);

        // SE l'array non include il numero generato
        if(!array.includes(num)){
            // pusciamo il numero nel array
            array.push(num);
        }
    }
    // ritorno del array
    return array;
}