    "use strict";


    function checkInputFieldValue(value) {

        if (listOfUsedCities.length) {
            let previousCity = listOfUsedCities[listOfUsedCities.length - 1],
                lastLetterPreviousCity = previousCity.charAt(previousCity.length - 1);

            if (unusedLetters.indexOf(lastLetterPreviousCity) !== -1) {
                lastLetterPreviousCity = previousCity.charAt(previousCity.length - 2);
            }

            if (isEmpty(value)) {
                alert("Вы ничего не ввели");
            }
            else if (!listOfCities.includes(value) && !listOfUsedCities.includes(value)) {
                alert("Такого города в списке нет");
            }
            else if (!value.startsWith(lastLetterPreviousCity)) {
                alert(`Вам на букву ${lastLetterPreviousCity.toUpperCase()}`);
            }
            else if (listOfCities.includes(value) && listOfUsedCities.includes(value)) {
                alert('Такой город уже был');
            }
            else {
                entryField.value = '';
                addUserCity(value);
            }
        }

        else {
            if (isEmpty(value)) {
                alert("Вы ничего не ввели");
            }
            else if (!listOfCities.includes(value) && listOfUsedCities.includes(value)) {
                alert("Такого города в списке нет");
            } else {
                entryField.value = '';
                addUserCity(value);
            }
        }

    }

    function computerTurn() {
        computer.classList.add('move');
        okButton.classList.add('btn-disabled');
        surrenderButton.classList.add('btn-disabled');
        blockForNewCity = document.createElement('p');
        computerCities.appendChild(blockForNewCity);

        if (!listOfUsedCities.length) {
                let city = listOfCities[Math.round(Math.random() * (listOfCities.length - 1))];
                listOfUsedCities.push(city);
                let arrayCity = city.split('');
                city = arrayCity[0].toUpperCase() + arrayCity.slice(1).join('');
                addComputerCity(city);
        } else {
            let lastCity = listOfUsedCities[listOfUsedCities.length - 1];
            let lastLetterPreviousCity = lastCity.charAt(lastCity.length - 1);

            if (unusedLetters.indexOf(lastLetterPreviousCity) !== -1) {
                lastLetterPreviousCity = lastCity.charAt(lastCity.length - 2);
            }
            let filterCityList = listOfCities.filter(
                city => city.charAt(0) == lastLetterPreviousCity && !listOfUsedCities.includes(city)
            );
                if (filterCityList.length) {
                    listOfUsedCities.push(filterCityList[0]);
                    let arrayCity = filterCityList[0].split('');
                    filterCityList[0] = arrayCity[0].toUpperCase() + arrayCity.slice(1).join('');
                    addComputerCity(filterCityList[0]);
                } else {
                    setTimeout(function() {
                        alert("Сдаюсь");
                        showCities(false);
                        document.querySelector('.user-score').innerHTML = `${++userScore}`;
                    }, 2000);
                }
        }
    }

    function addUserCity(newCity) {
        listOfUsedCities.push(newCity);

        let arrayCity = newCity.split('');
        newCity = arrayCity[0].toUpperCase() + arrayCity.slice(1).join('');

        blockForNewCity = document.createElement('p');
        blockForNewCity.innerHTML = newCity;

        userCities.appendChild(blockForNewCity);
        userCities.scrollTop = userCities.scrollHeight;

        user.classList.remove('move');

        addMark(blockForNewCity.innerHTML, 'blue');
        computerTurn();

    }

    function addComputerCity(city) {
        setTimeout(function() {
            blockForNewCity.innerHTML = city;
            computerCities.scrollTop = computerCities.scrollHeight;

            addMark(blockForNewCity.innerHTML, 'red');

            setTimeout(function() {
                user.classList.add('move');
                computer.classList.remove('move');
                okButton.classList.remove('btn-disabled');
                surrenderButton.classList.remove('btn-disabled');
            }, 500);
        }, 2000);
    }

    function isEmpty(value) {
            return value.trim() ? false : true;
    }
