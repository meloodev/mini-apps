document.addEventListener('DOMContentLoaded', () => {

    const newGame = document.querySelector('.dice__new');
    const diceRoll = document.querySelector('.dice__roll');
    const diceHold = document.querySelector('.dice__hold');

    const result = document.querySelector('.dice__result i');



    const firstPlayerResult = document.querySelector('.dice__item.one .player__score');
    const firstPlayerCurrentRes = document.querySelector('.dice__item.one .active__score');

    const secondPlayerResult = document.querySelector('.dice__item.two .player__score');
    const secondPlayerCurrentRes = document.querySelector('.dice__item.two .active__score');


    const playerOne = document.querySelector('.dice__item.one');
    const playerTwo = document.querySelector('.dice__item.two');

    const playerOneWin = document.querySelector('.dice__item.one .winner');
    const playerTwoWin = document.querySelector('.dice__item.two .winner');

    function disabledPlayer(val) {
        if (val === 1) {
            playerOne.classList.add('disabled');
            playerTwo.classList.remove('disabled');
        }

        if (val === 2) {
            playerOne.classList.remove('disabled');
            playerTwo.classList.add('disabled');
        }

        if (val === 0) {
            playerOne.classList.remove('disabled');
            playerTwo.classList.remove('disabled');
        }


    }



    const dice = {
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six'
    }

    function generateDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    let cl = '';
    let tmpRes = 0;
    let pl = true;

    let playerOneRes = 0;
    let playerTwoRes = 0;
    let game = true;
    diceRoll.addEventListener('click', () => {
        if (game) {
            const num = generateDice();

            if (result.classList.contains(cl)) {
                result.classList.remove(cl);
            }
            cl = `fa-dice-${dice[num]}`;
            result.classList.add(cl);


            if (num === 1) {
                tmpRes = 0;
                if (pl) {
                    firstPlayerCurrentRes.textContent = tmpRes;
                    pl = false;
                    disabledPlayer(1);
                } else {
                    secondPlayerCurrentRes.textContent = tmpRes;
                    pl = true;
                    disabledPlayer(2);
                }
            } else {
                tmpRes += num;
                if (pl) {
                    firstPlayerCurrentRes.textContent = tmpRes;
                } else {
                    secondPlayerCurrentRes.textContent = tmpRes;
                }
            }
        }
        //console.log(`player1 - ${playerOneRes}  player2 - ${playerTwoRes}`);
    });


    diceHold.addEventListener('click', () => {
        if (game) {
           // console.log(tmpRes);

            if (pl) {
                let resOne = (tmpRes += playerOneRes);
                firstPlayerResult.textContent = resOne;
                playerOneRes = tmpRes;
                firstPlayerCurrentRes.textContent = 0;
                pl = false;
                disabledPlayer(1);
                tmpRes = 0;
                if (resOne >= 100) {
                    game = false;
                    playerOne.style = 'background-color: green;';
                     playerOneWin.style = 'display: block;';
                    disabledPlayer(0);
                    firstPlayerResult.textContent = 100;
                }
               // console.log(resOne);
            }
            else {
                let resTwo = (tmpRes += playerTwoRes);
                secondPlayerResult.textContent = resTwo;
                playerTwoRes = tmpRes;
                secondPlayerCurrentRes.textContent = 0;
                pl = true;
                disabledPlayer(2);
                tmpRes = 0;
               // console.log(resTwo);
                if (resTwo >= 100) {
                    game = false;
                    playerTwo.style = 'background-color: green;';
                    playerTwoWin.style = 'display: block;';
                    disabledPlayer(0);
                    secondPlayerResult.textContent = 100;

                }

            }
        }
    });

    newGame.addEventListener('click', () => {
        game = true;
        disabledPlayer(0);

        tmpRes = 0;
        pl = true;
        playerOneRes = 0;
        playerTwoRes = 0;
        firstPlayerResult.textContent = 0;
        firstPlayerCurrentRes.textContent = 0;
        secondPlayerResult.textContent = 0;
        secondPlayerCurrentRes.textContent = 0;

        result.classList.remove(cl);
        cl = '';
        playerOne.style = 'background-color: #dcaeba;';
        playerTwo.style = 'background-color: #bd7a94;';

        playerOneWin.style = 'display: none;';
        playerTwoWin.style = 'display: none;';

    });

});


