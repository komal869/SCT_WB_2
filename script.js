let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapsBtn = document.getElementById("clearLapsBtn");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10); 
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        clearLapsBtn.disabled = false;
    }
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00:00"; 
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    clearLapsBtn.disabled = false; 
}

function lapTimer() {
    lapCount++;
    const lapTime = formatTime(difference);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

function clearLaps() {
    lapCount = 0;
    lapList.innerHTML = "";
    clearLapsBtn.disabled = true; 
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    display.innerHTML = formatTime(difference);
}

function formatTime(difference) {
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); 

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}


startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);
clearLapsBtn.addEventListener("click", clearLaps);