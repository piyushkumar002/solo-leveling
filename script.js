// Initial player stats
let player = {
    level: 1,
    health: 100,
    attack: 10,
    defense: 5,
    experience: 0
};

// Function to update stats on the screen
function updateStats() {
    document.getElementById('level').textContent = player.level;
    document.getElementById('health').textContent = player.health;
    document.getElementById('attack').textContent = player.attack;
    document.getElementById('defense').textContent = player.defense;
    document.getElementById('experience').textContent = player.experience;
}

// Function to increase player level
function increaseLevel() {
    player.level++;
    updateStats();
}

// Function to decrease player level (with minimum level set to 1)
function decreaseLevel() {
    if (player.level > 1) {
        player.level--;
        updateStats();
    }
}

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
            player.level = parseInt(statsArray[0].split(': ')[1]);
            player.health = parseInt(statsArray[1].split(': ')[1]);
            player.attack = parseInt(statsArray[2].split(': ')[1]);
            player.defense = parseInt(statsArray[3].split(': ')[1]);
            player.experience = parseInt(statsArray[4].split(': ')[1]);
            updateStats();
        };
        reader.readAsText(file);
    };

    input.click();
}

// Function to save player stats to the text file
function saveStatsToFile() {
    const statsData = `Level: ${player.level}, Health: ${player.health}, Attack: ${player.attack}, Defense: ${player.defense}, Experience: ${player.experience}`;
    localStorage.setItem('player_stats', statsData);
    alert('Player stats saved successfully!');
}

// Function to update stats from local storage
function updateStatsFromStorage() {
    const statsData = localStorage.getItem('player_stats');
    if (statsData) {
        const statsArray = statsData.split(', ');
        player.level = parseInt(statsArray[0].split(': ')[1]);
        player.health = parseInt(statsArray[1].split(': ')[1]);
        player.attack = parseInt(statsArray[2].split(': ')[1]);
        player.defense = parseInt(statsArray[3].split(': ')[1]);
        player.experience = parseInt(statsArray[4].split(': ')[1]);
        updateStats();
    }
}

// Event listeners for the buttons
document.getElementById('increase-level-btn').addEventListener('click', increaseLevel);
document.getElementById('decrease-level-btn').addEventListener('click', decreaseLevel);
document.getElementById('save-stats-btn').addEventListener('click', saveStatsToFile);
document.getElementById('load-stats-btn').addEventListener('click', loadStatsFromFile);

// Call updateStatsFromStorage initially to load stats from local storage
updateStatsFromStorage();
