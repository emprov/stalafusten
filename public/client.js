//var socket = io('http://192.168.178.24');
//const 
//	io.require('socket.io-client'),
//	socket = io.connect('http://192.168.178.24');
//var socket = io(window.location);

var socket = io();

const gameLetterNode = document.getElementById('game-letter');
const userListSubHeadingNode = document.getElementById('notification-subheadline');
const userListStatusbHeadingNode = document.getElementById('notification-subsubheadline');
const submitButtonNode = document.getElementById('submit-answer-btn');


const answerForm = document.getElementById('answer-form');

const cityNode = document.getElementById('city');
const countryNode = document.getElementById('country');
const riverNode = document.getElementById('river');
const divorceForNode = document.getElementById('divorceFor');

const answerDiv = document.getElementById('game-results-div');

const userName = prompt('Whats your name');
socket.emit('new-user', userName);

var gameLetter;

// >>>> reveive server events
socket.on('game-over-event', data => {
    blockUserInput();
    userListStatusbHeadingNode.innerText = data;
    const userInput = collectUserInput();
    userInput['userName'] = userName;
    socket.emit('return-answer', userInput);
})

socket.on('user-connected', names  => {
    const newDiv = document.createElement('div');
    newDiv.innerText = JSON.stringify(names);
    
})

socket.on('reset-broadcast-event', data => {
    cityNode.value = '';
    countryNode.value = '';
    riverNode.value = '';
    divorceForNode.value = '';
    userListStatusbHeadingNode.innerText = '';
    cityNode.removeAttribute('disabled');
    countryNode.removeAttribute('disabled');
    riverNode.removeAttribute('disabled');
    divorceForNode.removeAttribute('disabled');
    submitButtonNode.removeAttribute('disabled');
})

socket.on('game-result-broadcast', gameResultsArray => {
    addAnswerTableDiv(gameResultsArray);
})


socket.on('new-game', data => {
    gameLetterNode.innerText = data.firstLetter;
    userListSubHeadingNode.innerText = 'Playing: ' + listUsers(data.users);
})

// >>>> page event listeners
answerForm.addEventListener('submit', btnEvent => {
    btnEvent.preventDefault();
    socket.emit('submit-event', collectUserInput()); //return to server input content
}) 

answerForm.addEventListener('reset', e => {
    e.preventDefault();
    socket.emit('client-reset-event'); //notify server
})


// >>>> utils
function blockUserInput(){
    cityNode.setAttribute('disabled','true');
    countryNode.setAttribute('disabled','true');
    riverNode.setAttribute('disabled','true');
    divorceForNode.setAttribute('disabled','true');
    submitButtonNode.setAttribute('disabled','true');
}

function listUsers(array){
    var result = '';
    array.forEach(element => {
        if (result === ''){
            result = result + element
        } else {
            result = result + ', ' + element
        }       
    });
    return result; 
}

function populateAnswerTable(answer){
     var row = document.createElement('tr');
    (row.insertCell(0)).innerHTML= answer['gameLetter'];
    (row.insertCell(1)).innerHTML= answer['userName'];
    (row.insertCell(2)).innerHTML= answer['city'];
    (row.insertCell(3)).innerHTML= answer['country'];
    (row.insertCell(4)).innerHTML= answer['river'];
    (row.insertCell(5)).innerHTML= answer['divorceFor'];
    return row;
}

function createAnswerTable(){
    var newAnswerTable = document.createElement('table');
    newAnswerTable.setAttribute('class', 'table thead-light table-striped');
    
    var row = document.createElement('tr');
    row.appendChild(document.createElement('th')).innerHTML='?';
    row.appendChild(document.createElement('th')).innerHTML='Spieler';
    row.appendChild(document.createElement('th')).innerHTML='Stadt';
    row.appendChild(document.createElement('th')).innerHTML='Land';
    row.appendChild(document.createElement('th')).innerHTML='Fluss';
    row.appendChild(document.createElement('th')).innerHTML='vorbei';
    
    newAnswerTable.appendChild(row);
    return newAnswerTable;
}

function addAnswerTableDiv(gameResultsArray){
    var answerTable = createAnswerTable();
    gameResultsArray.forEach(element => {
        answerTable.appendChild(populateAnswerTable(element));
   });  
    var answerTableDiv = document.createElement('div');
    answerTableDiv.appendChild(answerTable);
    answerDiv.prepend(answerTableDiv);
}

function collectUserInput() {
    var answer = {};
    answer['city'] = cityNode.value;
    answer['country'] = countryNode.value;
    answer['river'] = riverNode.value;
    answer['divorceFor'] = divorceForNode.value;
    return answer;
}