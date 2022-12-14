
// prendiamo gli elementi dal DOM
const DOM_campo = document.querySelector('.campo');
const DOM_dificult = document.querySelector('.select_difficulty');
const DOM_button_field_campo = document.querySelector('.but_Play');
const DOM_score_view = document.querySelector('.score_view');
const DOM_score_points = document.querySelector('.score_points > span');
const DOM_view_bomb = document.querySelector('.view_bomb');
const DOM_reset_button = document.querySelector('#rigioca_button');
const DOM_view_win = document.querySelector('.view_win');
const DOM_view_citazione = document.querySelector('.citazione');

const citazioni = [
    '" Aia! Non va bene "',
    '" C\'è la farai la prossima volta, FIDATI "',
    '" NON MOLLARE, NON MOLLARE. "',
    '" Ti credo, e difficile "',
    '" Ste bombe, TZTZTZ! "',
    '" DAI DAI DAI "',
    '" Non sei l\'unico che prova a vincere "',
    '" Non ci riesci, vero! "'
];

// una varibile con il numero di bombe nel game
const number_bombs = 16;

// una varibile con il numero diel score
let score_point_game = 0;


// SE premiamo il pulsante chiamiamo la funzione genera campo
DOM_button_field_campo.addEventListener('click', fieldGenerator);


// aggiunta di un event listener per sresetare il game
DOM_reset_button.addEventListener('click', () => {
    // togliamo la vista del game over
    DOM_score_view.style.display = 'none';
    DOM_view_bomb.style.display = 'none';
    DOM_view_win.style.display = 'none';

    // salviamo in una variabile l'oggetto per poterlo richiamare
    const rg = new ResetGame();
    // chiamiamo la cancelazione del campo dal oggetto
    rg.delete_field();
    // resetiamo il punteggio
    rg.score_reset;

    // reset style opacity 0 per il campo
    DOM_campo.style.opacity = 0;
})


// creiamo una funzione per la creazione del campo
function fieldGenerator() {

    // una array vuota che vera riempita con l'eventuali elementi
    const piece_Field = [];

    // salviamo in una variabile l'oggetto per poterlo richiamare
    const rg = new ResetGame();
    // chiamiamo la funzione remove_element dal oggetto
    rg.remove_element(piece_Field);
    // chiamiamo la cancelazione del campo dal oggetto
    rg.delete_field();
    // resetiamo il punteggio
    rg.score_reset;

    // creiamo una variabile con il numero per il campo da creare con il valore della dificolta
    const fieldSize = add_difficult();

    // calcolare il numero di elementi per quadrato
    const pezziCampoComplete = fieldSize ** 2;

    // creazione del array con numeri random
    const bombs = create_array_number_random(number_bombs, 1, pezziCampoComplete);

    // creiamo un for per ogni elemento creato da inserire nel elemento padre del DOM
    for (let i = 0; i < pezziCampoComplete; i++) {
        // salviamo il valore di ritorno della funzione
        piece_Field.push(pieceField(fieldSize));
        // inseriamo il numero dentro al elemento creato
        piece_Field[i].innerHTML = i + 1;

        // SE l'array bomb include il valore i
        if (bombs.includes(i + 1)) {
            // asseganmo lattributo con valore true
            piece_Field[i].setAttribute('bomb', 'true');
        }
        // ALTRIMENTOI:
        else {
            // asseganmo lattributo con valore false
            piece_Field[i].setAttribute('bomb', 'false');
        }

        // appendiamo l'elemento al elemento padre del DOM
        DOM_campo.append(piece_Field[i]);
    }

    // aggiunta style opacity 1 per il campo
    DOM_campo.style.opacity = '1';
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
function piece_click() {

    // aggiungere una nuova classe all'elemento creato
    this.classList.add('active');

    // stampiamo nella console il contenuto dell'elemento creato
    // console.log(this.innerHTML);

    // SE l'attributo bomb e true
    if (this.getAttribute('bomb') === 'true') {

        const eccitazione_num = number_random(0, citazioni.length - 1);
        DOM_view_citazione.innerHTML = citazioni[eccitazione_num];

        look_view_score();

        // assegnamo display flex al view bomb
        DOM_view_bomb.style.display = 'flex';
        view_bomb();
    }

    // SE l'attributo bomb e false
    if (this.getAttribute('bomb') === 'false') {

        // incrementa di 1 il punteggio
        score_point_game++;

        // SE il punteggio e arrivato al limite calcolato
        if (score_point_game == add_difficult() ** 2 - number_bombs) {

            look_view_score();

            // assegnamo display flex al view win
            DOM_view_win.style.display = 'flex';
            view_bomb();
        }
    }

    // inserire nell'elemento DOM score il punteggio
    DOM_score_points.innerHTML = score_point_game;
}


// funzione che attiva l'elemento del score
function look_view_score() {
    // assegnamo display flex al score view
    DOM_score_view.style.display = 'flex';
    // assegnamo anche opacity 0
    DOM_score_view.style.opacity = '0';
    // dopo mezo secondo
    setTimeout(() => {

        // assegnamo anche opacity 1
        DOM_score_view.style.opacity = '1';
    }, 500);
}


// appendere una img al bloco con bomb true
function view_bomb() {
    // prender tutti gli elementi in una variabile
    const all = document.querySelectorAll('[bomb="true"]');

    // un ciclo for per tutti gli elementi
    for (let i = 0; i < all.length; i++) {
        // creaiamo un elemento di tipo img
        const img = document.createElement('img');
        // assegnamo all'elemento creato l'src con il link per l'immagine da prendere
        img.src = './assets/img/bomb_item.png';

        // svuotiamo gli elementi
        all[i].innerHTML = '';
        // appendiamo agli elementi l'elemento creato
        all[i].append(img);
    }
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
    this.delete_field = function () {
        DOM_campo.innerHTML = '';
    }

    // Azzeriamo il punteggio
    this.score_reset = score_point_game = 0;
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
    if (max < min) {
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
        if (!array.includes(num)) {
            // pusciamo il numero nel array
            array.push(num);
        }
    }
    // ritorno del array
    return array;
}