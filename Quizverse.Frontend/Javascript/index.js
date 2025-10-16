import { getUserImage } from './UserImage.js';
import { setProfileImage } from './LoginDropdown.js';
import { calculateTriesGamePoints, getUserPoints } from './UserPoints.js';
import { calculateAllTimeGamePoints } from './UserPoints.js';
import { getBestPlayers } from './BestPlayers.js';

var availableCharacters = [];
var correctCharacter;
var randomCharacter;
var usedCharacters = [];
var gameMode;
var easyGameMode = false;
var mediumGameMode = false;
var hardGameMode = false;
var impossibleGameMode = false;
var bonusPoints = 0;
let tries = 0;
let gamePoints = 0;
let allTimeGamePoints = 0;
let remainingTries;

const hintBall1 = document.querySelector('.hint-ball-1');
const hintBall2 = document.querySelector('.hint-ball-2');
var loginWarning = document.getElementById('login-warning');
var tableTitlePlayers = document.getElementById('tableTitle');
var playersTable = document.getElementById('playersTable');

async function getSessionInfo() {
    const token = localStorage.getItem('token');
    const response = await fetch('https://p01--rickmortyquizverse--2fzvm2y2h546.code.run/api/Login/check-session', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();

    if (response.ok && result.message) {
        tableTitlePlayers.style.marginTop = '-50px';
        playersTable.style.marginTop = '-44px';
        loginWarning.style.display = 'none';

        const usernameMatch = result.message.match(/Logged in as (\w+)/);
        const username = usernameMatch ? usernameMatch[1] : null;

        allTimeGamePoints = await getUserPoints(username);

        var UserImage = await getUserImage(username);
        setProfileImage(UserImage, true);

        document.getElementById('allTime-gamePoints').innerText = `All Time Points:  ${allTimeGamePoints}`;

        if (username) {
            document.getElementById('userName').innerHTML = `<strong>Logged as: ${username}</strong>`;
        } else {
            alert('Could not extract username from the response.');
        }
    } else {
        alert('User not logged in.');
    }
}

getSessionInfo();

async function getAllCharactersApi() {
    const allCharacters = [];
    const totalPages = 42;

    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            const characters = data.results.map(characterData => {
                const episodeCount = characterData.episode ? characterData.episode.length : 0;
                const location = characterData.location ? new Location(characterData.location.name, characterData.location.url) : null;
                const origin = characterData.origin ? new Origin(characterData.origin.name, characterData.origin.url) : null;
                const info = new Info(null, null, null, null);
                const character = new Character(
                    characterData.id,
                    characterData.name,
                    characterData.status,
                    characterData.species,
                    characterData.type,
                    characterData.gender,
                    origin,
                    location,
                    characterData.image,
                    characterData.episode,
                    characterData.url,
                    characterData.created
                );
                return {
                    name: characterData.name,
                    id: characterData.id,
                    image: characterData.image,
                    gender: characterData.gender,
                    origin: origin ? origin.name : null,
                    status: characterData.status,
                    species: characterData.species,
                    location: location ? location.name : null,
                    episodeCount: episodeCount
                };
            });

            allCharacters.push(...characters);
        } catch (error) {
            console.error(`Error fetching characters from page ${page}:`, error);
        }
    }

    return allCharacters;
}


function GetMostFamousCharacters(characters, count) {
    const sortedCharacters = characters.sort((a, b) => b.episodeCount - a.episodeCount);

    return sortedCharacters.slice(0, count);
}



function getCorrectCharacter() {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    correctCharacter = availableCharacters[randomIndex];

    return correctCharacter;
}

document.addEventListener('DOMContentLoaded', function () {
    const easyMode = document.getElementById('easy-mode');
    const mediumMode = document.getElementById('medium-mode');
    const hardMode = document.getElementById('hard-mode');
    const impossibleMode = document.getElementById('impossible-mode');

    easyMode.addEventListener('click', function () {
        gameMode = 'easy';
        easyGameMode = true;
        initializeAvailableCharacters(gameMode);
    });

    mediumMode.addEventListener('click', function () {
        gameMode = 'medium';
        mediumGameMode = true;
        initializeAvailableCharacters(gameMode);
    });

    hardMode.addEventListener('click', function () {
        gameMode = 'hard';
        hardGameMode = true;
        initializeAvailableCharacters(gameMode);
    });

    impossibleMode.addEventListener('click', function () {
        gameMode = 'impossible';
        impossibleGameMode = true;
        initializeAvailableCharacters(gameMode);
    });
});

async function initializeAvailableCharacters(gameMode) {
    const characters = await getAllCharactersApi();

    availableCharacters.length = 0;

    if (gameMode === 'easy') {
        var newCharacteres = GetMostFamousCharacters(characters, 20);
        availableCharacters.push(...newCharacteres);
    } else if (gameMode === 'medium') {
        var newCharacteres = GetMostFamousCharacters(characters, 50);
        availableCharacters.push(...newCharacteres);
    } else if (gameMode === 'hard') {
        var newCharacteres = GetMostFamousCharacters(characters, 100);
        availableCharacters.push(...newCharacteres);
    } else if (gameMode === 'impossible') {
        availableCharacters.push(...characters);
    } else {
        throw new Error('Modo de jogo inválido.');
    }

    getCorrectCharacter();
}

async function updateAvailableCharacters(character) {
    const characterId = character.id;
    const index = availableCharacters.findIndex(item => item.id === characterId);
    if (index !== -1) {
        availableCharacters.splice(index, 1);
    }
}

$(function () {
    $("#searchInput").autocomplete({
        source: function (request, response) {
            var filtered = $.map(availableCharacters, function (item) {
                if (item.name.toLowerCase().startsWith(request.term.toLowerCase())) {
                    return {
                        name: item.name,
                        id: item.id,
                        image: item.image
                    };
                }
            });
            response(filtered);
        },
        search: function (event, ui) {
            $("#searchInput").addClass('image');
        },
        select: function (event, ui) {
            $("#searchInput").removeClass('image');
            updateBoxes(ui.item.id);
        },
        open: function (event, ui) {
            $(".ui-menu-item").each(function (index) {
                var item = ui.item;
                $(this).html("<img src='" + item.image + "' style='width: 302px; height: 30px; margin-right: 10px;' />" + item.name);
            });
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div><img src='" + item.image + "' style='width: 80px; height: 80px; margin-right: 10px;' />" + item.name + "</div>")
            .appendTo(ul);
    };
});

document.getElementById('searchInput').addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        updateBoxes(this.value);
    }
});

window.onload = function () {
    const buttonGame = document.querySelector('.button-game');
    const buttonGameProgress = document.querySelector('.button-game-progress');
    const buttonSearch = document.querySelector('.button-search');
    const buttonBack = document.querySelector('.button-goBack');
    const buttonHowToPlay = document.querySelector('.button-howTo-play');
    const buttonInfo = document.querySelector('.info-button');
    const gameModesContainer = document.querySelector('.game-modes-container')
    const gameModes = document.querySelectorAll('.game-mode-box');
    const hintBox = document.querySelector('.hintBox');

    const howToPlay = document.getElementById('how-to-play');
    const information = document.getElementById('information');
    const overlay = document.getElementById('overlay');
    const subtitle = document.getElementById('subtitle')
    const gamePoints = document.getElementById('gamePoints');
    const playersTable = document.getElementById('playersTable');
    const tableTitle = document.getElementById('tableTitle');
    const allTimeGamePointsBox = document.getElementById('allTime-gamePoints');
    const loginWarningBox = document.getElementById('login-warning');

    const easyMode = document.getElementById('easy-mode');
    const mediumMode = document.getElementById('medium-mode');
    const hardMode = document.getElementById('hard-mode');
    const impossibleMode = document.getElementById('impossible-mode');

    buttonGame.addEventListener('click', function () {
        gameModesContainer.style.display = 'flex';
        buttonBack.style.display = 'block';
        buttonHowToPlay.style.display = 'block';
        buttonInfo.style.display = 'none';
        buttonGame.style.display = 'none';
        subtitle.style.visibility = 'hidden';
        buttonGameProgress.style.display = 'none';
        tableTitle.style.display = 'none';
        playersTable.style.display = 'none';
        gamePoints.style.display = 'none';
        loginWarningBox.style.display = 'none';
        allTimeGamePointsBox.style.display = 'none';

        subtitle.style.visibility = 'hidden';
    });

    gameModes.forEach(gameMode => {
        gameMode.addEventListener('click', function () {
            gameModesContainer.style.display = 'none';
            buttonHowToPlay.style.display = 'none';
            buttonSearch.style.display = 'block';
            gamePoints.style.display = 'block';
            buttonBack.style.top = '-40vh';
            document.getElementById('gamePoints').innerText = `Current Points: 100`;
        });
    });

    buttonBack.addEventListener('click', function () {

        if (handleHintBallAction1Called || handleHintBallAction2Called || tries >= 6) {
            location.reload();
        }
        buttonSearch.style.display = 'none';
        buttonBack.style.display = 'none';
        buttonBack.style.top = '-6vh';
        buttonHowToPlay.style.display = 'none';
        gameModesContainer.style.display = 'none';
        hintBox.style.display = 'none';
        gamePoints.style.display = 'none';
        buttonGame.style.display = 'block';
        buttonGameProgress.style.display = 'block';
        tableTitle.style.display = 'block';
        buttonInfo.style.display = 'block';
        loginWarningBox.style.display = 'block';
        allTimeGamePointsBox.style.display = 'block';

        subtitle.style.visibility = 'visible';

        $('.boxContainer').remove();
        usedCharacters = [];
        tries = 0;
        remainingTries = 0;
        updateFirstLetterTriesText(firstLetterTries, tries);
        updateImageClueTriesText(imageClueTries, tries);
    });

    buttonHowToPlay.addEventListener('click', function () {
        howToPlay.style.display = 'block';
        overlay.style.display = 'block';
    });

    buttonInfo.addEventListener('click', function () {
        information.style.display = 'block';
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', function () {
        howToPlay.style.display = 'none';
        information.style.display = 'none';
        overlay.style.display = 'none';
    });

    easyMode.addEventListener('click', function () {
        hintBox.style.display = 'flex';
    });

    mediumMode.addEventListener('click', function () {
        hintBox.style.display = 'flex';
    });

    hardMode.addEventListener('click', function () {
        hintBox.style.display = 'flex';
    });

    impossibleMode.addEventListener('click', function () {
        hintBox.style.display = 'flex';
    });


};

async function addCharacter(character) {

    if (!usedCharacters.includes(character)) {
        usedCharacters.push(character);
    }

    await updateAvailableCharacters(character);
}

let firstLetterTries = 6;
let imageClueTries = 10;
let firstLetterTriesUsed = 0;
let imageClueTriesUsed = 0;
let handleHintBallAction1Called = false;
let handleHintBallAction2Called = false;

async function updateFirstLetterTriesText(startingTries, tries) {
    const triesElement = document.querySelector('.first-letter-tries-text');
    const remainingTries = startingTries - tries;
    if (remainingTries >= 0) {
        triesElement.innerHTML = `<strong> In ${remainingTries} tries </strong>`;
    }
    if (remainingTries <= 0) {
        handleHintBallAction1();
        return;
    }
}

async function updateImageClueTriesText(startingTries, tries) {
    const triesElement = document.querySelector('.image-clue-tries-text');
    const remainingTries = startingTries - tries;
    if (remainingTries >= 0) {
        triesElement.innerHTML = `<strong> In ${remainingTries} tries </strong>`;
    }
    if (remainingTries <= 0) {
        handleHintBallAction2();
        return;
    }
}

function handleHintBallAction1() {
    const hintBall1 = document.querySelector('.hint-ball-1');
    hintBall1.style.backgroundColor = 'green';

    function handleClick() {
        handleHintBallAction1Called = true;
        hintBall1.innerHTML = `
            <strong style="font-size: 24px;">${correctCharacter.name.charAt(0)}</strong>
            <div class="hint-text"><strong>First Letter</strong></div>
        `;
        hintBall1.removeEventListener('click', handleClick);
        gamePoints = calculateTriesGamePoints(tries, handleHintBallAction1Called, handleHintBallAction2Called);
        document.getElementById('gamePoints').innerText = `Current Points: ${gamePoints}`;
    }

    hintBall1.addEventListener('click', handleClick);
}

function handleHintBallAction2() {
    const hintBall2 = document.querySelector('.hint-ball-2');
    hintBall2.style.backgroundColor = 'green';

    function handleClick() {
        handleHintBallAction2Called = true;
        hintBall2.innerHTML = `<img src="${correctCharacter.image}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
          <div class="hint-text"><strong>Image Clue</strong></div>
        `;
        hintBall2.removeEventListener('click', handleClick);
        gamePoints = calculateTriesGamePoints(tries, handleHintBallAction1Called, handleHintBallAction2Called);
        document.getElementById('gamePoints').innerText = `Current Points: ${gamePoints}`;
    }

    hintBall2.addEventListener('click', handleClick);
}

function adjustFontSize(element, text) {
    if (text.length > 13) {
        element.css("font-size", "12px");
    } else if (text.length >= 12) {
        element.css("font-size", "14px");
    } else if (text.length >= 10) {
        element.css("font-size", "16px");
    } else if (text.length >= 7) {
        element.css("font-size", "18px");
    } else {
        element.css("font-size", "20px");
    }
}

async function loadPlayers() {
    const bestPlayers = await getBestPlayers();
    const players = [];

    for (let i = 0; i < 10; i++) {
        if (bestPlayers[i]) {
            players.push({
                nick: bestPlayers[i].name,
                points: bestPlayers[i].userpoints
            });
        }
    }

    return players;
}

function generateTable(players) {
    const tableBody = document.querySelector('#playersTable tbody');

    players.sort((a, b) => b.points - a.points);

    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="nick">${player.nick}</td>
            <td>${player.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    const tableTitle = document.getElementById('tableTitle');
    let tableGenerated = false;
    const players = await loadPlayers();

    if (tableTitle) {
        tableTitle.addEventListener('click', function () {
            const table = document.getElementById('playersTable');
            const icon = document.getElementById('expandIcon');

            if (!tableGenerated) {
                generateTable(players);
                tableGenerated = true;
            }

            if (table.style.display === 'none' || table.style.display === '') {
                table.style.display = 'table';
                icon.classList.add('expanded');
            } else {
                table.style.display = 'none';
                icon.classList.remove('expanded');
            }
        });
    } else {
        console.error("Elemento 'tableTitle' não encontrado.");
    }
});



async function updateBoxes(id) {
    tries++;
    gamePoints = calculateTriesGamePoints(tries, handleHintBallAction1Called, handleHintBallAction2Called);
    document.getElementById('gamePoints').innerText = `Current Points: ${gamePoints}`;

    await updateFirstLetterTriesText(firstLetterTries, tries);
    await updateImageClueTriesText(imageClueTries, tries);

    const buttonBack = document.querySelector('.button-goBack');
    const buttonSearch = document.querySelector('.button-search');

    const character = availableCharacters.find(char => char.id === id);

    for (let i = 0; i < usedCharacters.length; i++) {
        if (character == usedCharacters[i]) {
            alert("Personagem ja adicionado na lista.");
            return;
        }
    }
    if (character) {
        addCharacter(character);

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const newBoxContainer = $("<div class='boxContainer'></div>");

        const boxImage = $(`<div class='box' id='boxImage'></div>`);
        boxImage.append(`<div class='box-header'>Image</div><div class='box-content'><img src="${character.image}" alt="${character.name}" style="width: 80px; height: 80px; margin-top: 18px;"></div>`);
        newBoxContainer.append(boxImage);

        const boxStatus = $(`<div class='box' id='boxStatus'></div>`);
        boxStatus.append(`<div class='box-header'>Status</div><div class='box-content'>${capitalizeFirstLetter(character.status)}</div>`);
        newBoxContainer.append(boxStatus);

        const boxSpecies = $(`<div class='box' id='boxSpecies'></div>`);
        boxSpecies.append(`<div class='box-header'>Species</div><div class='box-content'>${capitalizeFirstLetter(character.species)}</div>`);
        newBoxContainer.append(boxSpecies);

        const boxGender = $(`<div class='box' id='boxGender'></div>`);
        boxGender.append(`<div class='box-header'>Gender</div><div class='box-content'>${capitalizeFirstLetter(character.gender)}</div>`);
        newBoxContainer.append(boxGender);

        const boxOrigin = $(`<div class='box' id='boxOrigin'></div>`);
        boxOrigin.append(`<div class='box-header'>Origin</div><div class='box-content'style='font-size: 14px;'>${capitalizeFirstLetter(character.origin)}</div>`);
        newBoxContainer.append(boxOrigin);

        const boxLocation = $(`<div class='box' id='boxLocation'></div>`);
        boxLocation.append(`<div class='box-header'>Location</div><div class='box-content'style='font-size: 14px;'>${capitalizeFirstLetter(character.location)}</div>`);
        newBoxContainer.append(boxLocation);

        const boxEpisodesCount = $(`<div class='box' id='boxEpisodesCount'></div>`);
        boxEpisodesCount.append(`<div class='box-header'>Episodes</div><div class='box-content'style='font-size: 22px;'>${character.episodeCount}</div>`);
        newBoxContainer.append(boxEpisodesCount);

        const boxCorrect = $(`<div class='box' id='boxCorrect'></div>`);
        boxCorrect.append(`<div class='box-header'>Correct?</div><div class='box-content' style='font-size: 20px;'>${capitalizeFirstLetter(character.name)}</div>`);;
        newBoxContainer.append(boxCorrect);

        if (character.status === correctCharacter.status) {
            boxStatus.css("background-color", "green");
        } else {
            boxStatus.css("background-color", "red");
        }
        adjustFontSize(boxStatus.find('.box-content'), character.status);

        if (character.species === correctCharacter.species) {
            boxSpecies.css("background-color", "green");
        } else {
            boxSpecies.css("background-color", "red");
        }
        adjustFontSize(boxSpecies.find('.box-content'), character.species);

        if (character.gender === correctCharacter.gender) {
            boxGender.css("background-color", "green");
        } else {
            boxGender.css("background-color", "red");
        }
        adjustFontSize(boxGender.find('.box-content'), character.gender);

        if (character.origin === correctCharacter.origin) {
            boxOrigin.css("background-color", "green");
        } else {
            boxOrigin.css("background-color", "red");
        }
        adjustFontSize(boxOrigin.find('.box-content'), character.origin);

        if (character.location === correctCharacter.location) {
            boxLocation.css("background-color", "green");
        } else {
            boxLocation.css("background-color", "red");
        }
        adjustFontSize(boxLocation.find('.box-content'), character.location);

        if (character.episodeCount === correctCharacter.episodeCount) {
            boxEpisodesCount.css("background-color", "green");
        } else if (Math.abs(character.episodeCount - correctCharacter.episodeCount) <= 10) {
            boxEpisodesCount.css("background-color", "orange");
        } else {
            boxEpisodesCount.css("background-color", "red");
        }
        adjustFontSize(boxEpisodesCount.find('.box-content'), character.episodeCount);


        if (character.id === correctCharacter.id) {
            boxCorrect.css("background-color", "green");
            boxCorrect.find('.box-content').text('Correct');

            buttonSearch.style.display = 'none';
            buttonBack.style.display = 'none';

            newBoxContainer.prependTo("#characterBlocks");

            if (tries <= 5) {
                if (gamePoints != 0) {
                    bonusPoints = 150;
                    gamePoints += bonusPoints;
                }
            }
            else if (tries <= 10) {
                if (gamePoints != 0) {
                    bonusPoints = 100;
                    gamePoints += bonusPoints;
                }
            }
            else if (tries <= 15) {
                if (gamePoints != 0) {
                    bonusPoints = 50;
                    gamePoints += bonusPoints;
                }
            }

            if (easyGameMode) {
                gamePoints = 0;
            }
            else if (mediumGameMode) {
                gamePoints *= 1;
            }
            else if (hardGameMode) {
                gamePoints *= 3;
            }
            else if (impossibleGameMode) {
                gamePoints *= 5;
            }

            document.getElementById('gamePoints').innerText = `Current Points: ${gamePoints}`;
            showCongrats(character, newBoxContainer);
        } else {
            boxCorrect.css("background-color", "red");
            boxCorrect.find('.box-content').text('Incorrect').css('font-size', '18px');
        }

        newBoxContainer.css("display", "flex");
        newBoxContainer.prependTo("#characterBlocks");

    } else {
        alert("Personagem não encontrado na lista.");
    }
}


async function showCongrats(character, referenceElement) {

    hintBall1.style.pointerEvents = 'none';
    hintBall2.style.pointerEvents = 'none';

    const congratsBlock = document.createElement('div');
    congratsBlock.classList.add('congrats-block');

    const h1 = document.createElement('h1');
    h1.textContent = 'Congrats!';

    const p1 = document.createElement('p');
    p1.textContent = 'You guessed ';

    const strong = document.createElement('strong');
    strong.textContent = (character.name);

    p1.appendChild(strong);

    const p3 = document.createElement('p');
    p3.innerHTML = 'Number of tries: <strong>' + tries + '</strong>';

    const p4 = document.createElement('p');
    p4.innerHTML = 'You got: <strong>' + bonusPoints + '</strong>' + ' bonus points';

    const p5 = document.createElement('p');
    p5.innerHTML = 'You lost: <strong>' + tries * 3 + '</strong>' + ' points (3 point for each try)';

    const p6 = document.createElement('p');

    if (easyGameMode) {
        p6.innerHTML = 'You got: <strong>' + gamePoints + '</strong>' + ' points in total' + ' (0x Easy Mode Multiplier)';
    }
    else if (mediumGameMode) {
        p6.innerHTML = 'You got: <strong>' + gamePoints + '</strong>' + ' points in total' + ' (1x Medium Mode Multiplier)';
    }
    else if (hardGameMode) {
        p6.innerHTML = 'You got: <strong>' + gamePoints + '</strong>' + ' points in total' + ' (3x Hard Mode Multiplier)';
    }
    else if (impossibleGameMode) {
        p6.innerHTML = 'You got: <strong>' + gamePoints + '</strong>' + ' points in total' + ' (5x Impossible Mode Multiplier)';
    }

    const p7 = document.createElement('p');
    p7.innerHTML = '<strong>Tap to play again!</strong>';

    congratsBlock.appendChild(h1);
    congratsBlock.appendChild(p1);
    congratsBlock.appendChild(p3);
    congratsBlock.appendChild(p4);
    congratsBlock.appendChild(p5);
    congratsBlock.appendChild(p6);
    congratsBlock.appendChild(p7);

    congratsBlock.addEventListener('click', function () {
        location.reload();
    });

    $(referenceElement).after(congratsBlock); 7

    allTimeGamePoints = await calculateAllTimeGamePoints(gamePoints);
    document.getElementById('allTime-gamePoints').innerText = `All Time Points:  ${allTimeGamePoints}`;
}
