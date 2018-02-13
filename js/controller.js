    "use strict";


    let entryField = document.getElementById('input-city-name');
    let playingField = document.querySelector('.playing-field');
    let playingFieldForm = document.forms[0];
    let okButton = document.getElementById('btnOk');
    let surrenderButton = document.getElementById('btnSurrender');
    let user = document.querySelector('.user');
    let userCities = document.querySelector('.user__cities');
    let computer = document.querySelector('.computer');
    let computerCities = document.querySelector('.computer__cities');
    let modalUserCities = document.querySelector('.modal__user-cities');
    let modalComputerCities = document.querySelector('.modal__computer-cities');
    let listOfCities = [];
    let listOfUsedCities = [];
    let blockForNewCity;
    let isUser;
    let userScore = 0;
    let computerScore = 0;
    let unusedLetters = 'йыъь';

    const   READYSTATE_COMPLETE = 4,
            METHOD = 'GET',
            PATH_TO_THE_LIST_WITH_CITIES = 'cities.json';

    document.getElementById('start-game__button').addEventListener('click', determineWhoGoesFirst);
    playingFieldForm.addEventListener('click', onClick);

    getListWithCities();

    /*
        Получаю список городов в самом начале и c начала каждой игры.
        Выбрал этот способ, так как, на мой взгляд, менее затратно по ресурсам получать полный отсортированный список городов,
        чем получать по одному в ходе игры.
    */
    function getListWithCities() {
        let xhr = new XMLHttpRequest();

        xhr.open(METHOD, PATH_TO_THE_LIST_WITH_CITIES);

        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== READYSTATE_COMPLETE) return;

            if (xhr.status !== 200) {
                console.log(`Ошибка ${xhr.status} : ${xhr.statusText}`)
            } else {
                try {
                    let citiesList = JSON.parse(xhr.responseText);
                    for ( let city of citiesList ) {
                        listOfCities.push(city.toLowerCase());
                    }
                    listOfCities.sort(() => { return Math.random() - 0.5; })
                }
                catch (e) {
                    console.log(`Некорректный ответ: ${e.message}`);
                }
            }
        }
    }


    function determineWhoGoesFirst() {
        isUser = Math.round(Math.random());

        isUser ? alert("Вы ходите первым") : alert("Первым ходит компьютер");

        startGame(isUser);
    }

    function onClick(event) {
        event.preventDefault();
        let target = event.target;

        if (target === okButton) {
            let inputFieldValue = entryField.value.toLowerCase().trim();
            checkInputFieldValue(inputFieldValue);
        }
        else if (target === surrenderButton) {
            surrenderUser();
        }

    }

    function startGame(isUser) {
        document.querySelector('.start-game').style.display = 'none';
        playingField.style.display = '';

        getListWithCities();

        isUser ? user.classList.add('move') : computerTurn();

    }

    function surrenderUser() {
        let surrenderUser = confirm('Вы уверены, что хотите сдаться?');

        if (surrenderUser) {
            document.querySelector('.computer-score').innerHTML = `${++computerScore}`;
            showCities(true);
        }
    }

    function clearField() {

        while (modalUserCities.firstChild) {
            modalUserCities.removeChild( modalUserCities.firstChild )
        }
        while (modalComputerCities.firstChild) {
            modalComputerCities.removeChild( modalComputerCities.firstChild )
        }
        listOfUsedCities = [];

        document.querySelector('.start-game').style.display = '';
        playingField.style.display = 'none';
        computer.classList.remove('move');
        user.classList.remove('move');

        removeMark();
    }

    function showCities(isUser) {

        while(userCities.firstChild) {
            modalUserCities.appendChild(userCities.firstChild);
        }

        while(computerCities.firstChild) {
            modalComputerCities.appendChild(computerCities.firstChild);
        }

        if (isUser) {
            document.querySelector('.loser').innerHTML = "Вы проиграли";
        }
        else {
            document.querySelector('.loser').innerHTML = "Компьютер проиграл";
        }

        document.querySelector('.modal').style.display = "block";

        document.querySelector('.show-cities__close').onclick = function() {
            document.querySelector('.modal').style.display = "none";

            clearField();
        }

    }




