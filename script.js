// Initial player stats
let player = {
    level: 1,
    strength: 1,
    perception: 1,
    intelligence: 1,
    agility: 1
};

// Function to update stats on the screen
function updateStats() {
    document.getElementById('strength').textContent = player.strength;
    document.getElementById('perception').textContent = player.perception;
    document.getElementById('intelligence').textContent = player.intelligence;
    document.getElementById('agility').textContent = player.agility;
    let wt_sum = (player.strength * 5) + (player.intelligence * 4) + (player.agility * 3) + (player.perception * 2)
    let tot_wt = 14
    document.getElementById('overall-lvl').textContent = Math.floor(wt_sum/tot_wt)
}

// Function to increase player strength
function increaseLevel() {
    player.strength++;
    updateStats();
}

// Function to decrease player strength (with minimum strength set to 1)
function decreaseLevel() {
    if (player.strength > 1) {
        player.strength--;
        updateStats();
    }
}

// code addition 1
function increasePerception() {
    player.perception++;
    updateStats();
}


function decreasePerception() {
    if (player.perception > 1) {
        player.perception--;
        updateStats();
    }
}

function increaseIntelligence() {
    player.intelligence++;
    updateStats();
}

function decreaseIntelligence() {
    if (player.intelligence > 1) {
        player.intelligence--;
        updateStats();
    }
}

function increaseAgility() {
    player.agility++;
    updateStats();
}

function decreaseAgility() {
    if (player.agility > 1) {
        player.agility--;
        updateStats();
    }
}

// end of code add 1

// Function to load player stats from the text file
function loadStatsFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';

    input.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            const statsData = reader.result;
            const statsArray = statsData.split(', ');
            player.strength = parseInt(statsArray[0].split(': ')[1]);
            player.perception = parseInt(statsArray[3].split(': ')[1]);
            player.intelligence = parseInt(statsArray[1].split(': ')[1]);
            player.agility = parseInt(statsArray[2].split(': ')[1]);
            updateStats();
        };
        reader.readAsText(file);
    };

    input.click();
}

// Function to save player stats to the text file
function saveStatsToFile() {
    const statsData = `Strength: ${player.strength}, Intelligence: ${player.intelligence}, Agility: ${player.agility}, Perception: ${player.perception}`;
    localStorage.setItem('player_stats', statsData);
    alert('Player stats saved successfully!');
}

// Function to update stats from local storage
function updateStatsFromStorage() {
    const statsData = localStorage.getItem('player_stats');
    if (statsData) {
        const statsArray = statsData.split(', ');
        player.strength = parseInt(statsArray[0].split(': ')[1]);
        
        player.intelligence = parseInt(statsArray[1].split(': ')[1]);
        player.agility = parseInt(statsArray[2].split(': ')[1]);
        player.perception = parseInt(statsArray[3].split(': ')[1]);
        updateStats();
    }
}

// Event listeners for the buttons
document.getElementById('increase-strength-btn').addEventListener('click', increaseLevel);
document.getElementById('decrease-strength-btn').addEventListener('click', decreaseLevel);

document.getElementById('increase-perception-btn').addEventListener('click', increasePerception);
document.getElementById('decrease-perception-btn').addEventListener('click', decreasePerception);

document.getElementById('increase-intelligence-btn').addEventListener('click', increaseIntelligence);
document.getElementById('decrease-intelligence-btn').addEventListener('click', decreaseIntelligence);

document.getElementById('increase-agility-btn').addEventListener('click', increaseAgility);
document.getElementById('decrease-agility-btn').addEventListener('click', decreaseAgility);

document.getElementById('save-stats-btn').addEventListener('click', saveStatsToFile);
document.getElementById('load-stats-btn').addEventListener('click', loadStatsFromFile);

// Call updateStatsFromStorage initially to load stats from local storage
updateStatsFromStorage();
