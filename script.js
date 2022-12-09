// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: Nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// prendo il pulsante play e il div grid dal DOM
const inputButton = document.getElementById('btn');
const divGridElement = document.querySelector('div.grid');

// creo una funzione che mi restituisca un numero random senza numeri uguali 
function getRandomNumber(min, max){
    if(min === max){
        return max;
    }

    return Math.floor(Math.random() * (max - min + 1) + min); 
}

// rimuovo la classe active al grid
divGridElement.classList.remove('active');

// creo un evento dove aggiungo la classe active al click sul pulsante play
inputButton.addEventListener('click', function(){
    divGridElement.classList.add('active');
})

// creo un array vuoto in cui fare push dei numeri random genrati tramite un cilo while
const bombs = [];

while (bombs.length <= 16){
    const randomNumber = getRandomNumber(1, 100);
    
    if (!bombs.includes(randomNumber)){
        bombs.push(randomNumber)
    }
}

// dichiaro una variabile per lo score che di base è zero
let score = 0;

// creo un ciclo for per le caselle del grid 
for (let i = 1; i <= 100; i++) {
    // creo l'elemento div che sarà la casella del grid
    const newSquare = document.createElement('div');
    // assegno al div la classe square
    newSquare.classList.add('square');
    // appendo nel dom le caselle 
    divGridElement.appendChild(newSquare);
    // scrivo nella casella l'indice per numerarle
    newSquare.innerText = i;
    // creo un evento al click sulle caselle 
    newSquare.addEventListener('click', function(){
        // se la lista bombs include l'indice delle caselle
        if (bombs.includes(i)){
            // aggiungo la classe clicked-boom alla casella 
            newSquare.classList.add('clicked-boom');
            // faccio paritre un alert con il relativo punteggio 
            alert('Hai fatto boom' + ' il tuo punteggio è di: ' + score);
            // ricarico la pagina se clicco su una bomba 
            location.reload();
        } else{
             // altrimenti aggiungo la classe clicked 
            newSquare.classList.add('clicked');
            // eseguo la somma del valore score + 1 in modo che ad ogni click il punteggio venga sommato 
            score = score + 1;
            // se lo la somma dello score raggiunge 84 l'utente ha vinto e mostro lo score 
            if (score === 84){
                alert('Flawless Victory' + ' hai totalizzato: ' + score);
            }
        }
    });
}
