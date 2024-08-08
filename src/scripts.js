function getCookie(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return value[1];
    // return (value != null) ? unescape(value[1]) : null; 
}

function getLastDate(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return value[4];
    // return (value != null) ? unescape(value[1]) : null; 
}

// Date stuff
const todayDate = new Date();
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const daysThisMonth = daysInMonth(todayDate.getFullYear(), todayDate.getMonth());

var zeroesForMonth = "";
for (i = 0; i < daysThisMonth; i++) {
    zeroesForMonth += "0";
}



function checkCookie() {
    if (!document.cookie) {
        console.log("no cookie found, zeroing out!");
        document.cookie = "code="+zeroesForMonth+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/";
        document.cookie = "lastMonth=8; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/"
        console.log("The cookie is now: " + document.cookie);
    } else {
        if (todayDate.getMonth() != getCookie('lastMonth')) {
        console.log("New month since last visit. Resetting!");
        document.cookie = "code="+zeroesForMonth+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/";
        document.cookie = "lastMonth="+todayDate.getMonth()+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/"
        }
        console.log("cookie found: " + document.cookie);
        // console.log("last accessed: " + getLastDate());
    }
}

checkCookie();

var currentCode = getCookie('code');

function setCookie(cvalue) {
    document.cookie = "code="+cvalue+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/;";
    document.cookie = "lastMonth="+todayDate.getMonth()+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/";
}


var myContainer = document.getElementById("myContainer");


function toggleCheckbox(element)
 {
    scanBoxes();
 }

 function checkboxMarkup(state,day) {
    if (state == "on") {
        return `
            <label class="check-on" tabindex="0">
            <input type="checkbox" onchange="toggleCheckbox()" id="day1" name="settings" checked>
            <span class="siteofgrace">`+day+`</span>
            </label>
            `
    }

    else {
        return `
            <label class="check-off" tabindex="0">
            <input type="checkbox" onchange="toggleCheckbox()" id="day1" name="settings">
            <span class="siteofgrace">`+day+`</span>
            </label>
            `
    }
}

function makeBoxes(){
    for (i = 0; i < currentCode.length; i++) {
        if (currentCode.charAt(i) == 1) {
                myContainer.insertAdjacentHTML('beforeend',checkboxMarkup("on",i+1));
        }
        else {
            myContainer.insertAdjacentHTML('beforeend',checkboxMarkup("off",i+1));
        }
    }
}

function scanBoxes(){
    var allCheckboxes = myContainer.getElementsByTagName("input")
    var dayBinary = "";
    for (i = 0; i < allCheckboxes.length; i++) {
        if (allCheckboxes[i].checked == true) {
            dayBinary += "1";
        }
        else {
            dayBinary += "0";
        }
    }
    setCookie(dayBinary);
}





makeBoxes();
scanBoxes();


// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
let enabledSettings = []

/*
For IE11 support, replace arrow functions with normal functions and
use a polyfill for Array.forEach:
https://vanillajstoolkit.com/polyfills/arrayforeach/
*/

// Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    enabledSettings = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
      
    console.log(enabledSettings)
  })
});


function play() {
    var audio = document.getElementById("audio");
    audio.play();
  }

  

const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause-button");
const volumeControl = document.getElementById("volume-control");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
const volumeToggle = document.getElementById("volume-toggle");
const lostGraceMessage = document.getElementById("grace-discovered");

let isPlaying = false;
let isVolumeControl = false;

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "";
        console.log("shoud be pausing");
        playPauseButton.innerText = "Play";
    } else {
        audio.play();
        playPauseButton.textContent = "";
        console.log("should be playing");
        playPauseButton.innerText = "Pause";
        currentTimeDisplay.classList.remove("opacity-0");
        currentTimeDisplay.classList.add("opacity-90");
    }
    isPlaying = !isPlaying;
});


volumeToggle.addEventListener("click", () => {
    if (isVolumeControl) {
        // volumeControl.classList.remove("block");
        // volumeControl.classList.add("hidden");
        volumeToggle.src = "./img/volume-on.svg";
        audio.volume = 1;
        isVolumeControl = false;
    } else {
        // volumeControl.classList.add("block");
        // volumeControl.classList.remove("hidden");
        volumeToggle.src = "./img/volume-mute.svg";
        audio.volume = 0;
        isVolumeControl = true;
    }
})

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    // const duration = audio.duration;
    const duration = 120;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    const graceSound = new Audio("../audio/lost_grace_sfx-10.mp3");
    function playGrace() {
        graceSound.play();
    }

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;

    function showGrace() {
        playGrace();
        lostGraceMessage.classList.remove("-z-10");
        lostGraceMessage.classList.add("z-10");
        lostGraceMessage.classList.remove("opacity-0");
        lostGraceMessage.classList.add("opacity-1");
    }

    function hideGrace() {
        lostGraceMessage.classList.remove("opacity-1");
        lostGraceMessage.classList.add("opacity-0");

        // Wait 2000ms for grace to fade out, then set z-index.
        setTimeout(() => {
            lostGraceMessage.classList.remove("z-10");
            lostGraceMessage.classList.add("-z-10");;
          }, 2000);
    }


    if ((currentMinutes == totalMinutes) && (currentSeconds == totalSeconds)) {
        // Fade-in grace message
        audio.pause();
        showGrace();

        // Wait 7000 ms...
        setTimeout(() => {
            hideGrace();
          }, 7000);
    }
});



var eldenLocation = "Leyndell";
var audioSource = document.getElementById("audio-source");
var locationTitle = document.getElementById("locationTitle");

function switchPlace() {
    if (eldenLocation == "Leyndell") {
        eldenLocation = "Limgrave";
        audioSource.src = "./audio/limgrave.mp3";
        audio.load();
        // pageBackground = "url(../img/scene-limgrave-1.png)";
        document.body.style.backgroundImage = "url(../img/scene-limgrave-1.png)";
        locationTitle.innerText = "Limgrave";

    }
}

