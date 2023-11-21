// alert("helo world");
// views - coisas visuais
// values - não visuais que ficam rodando.

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        //timerId: null,
        timerId: setInterval(randomSquare, 1000),
        // mesma coisa que no moveenmy
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over O seu resultado foi: " + state.values.result);
    }
}

function playSound() {
    // podemos colocar uma variavel e na função e chama-la aqui
    // let audio = new Audio("./src/audios/${audioName}.mp4a"); 
    let audio = new Audio("./src/audios/hit.mp4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

//function moveEnemy() {
//    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
//}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            //alert("clicou");
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
                // podemos colocar "hit" 
            }
        });
    });
}

// função de inicio para chamar as funções iniciais.  
function initialize() {
    // retirei, pois não tenho mais a função
    // moveEnemy();
    addListenerHitBox();
}

initialize();