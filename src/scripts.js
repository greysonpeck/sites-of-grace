

document.addEventListener('DOMContentLoaded', () => {
    // Now it's safe to access cookies and perform operations

    console.log("DOM loaded, checking cookie...");

    function getCookie(name) { 
        var re = new RegExp(name + "=([^;]+)"); 
        var value = re.exec(document.cookie); 
        // return value[1];
        return (value != null) ? unescape(value[1]) : null; 
    }

    checkCookie();



    function checkCookie() {
        if (!document.cookie) {
            console.log("no cookie found, zeroing out!");
            document.cookie = "code="+zeroesForMonth+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/";
            document.cookie = "lastMonth=8; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/"
            document.cookie = "lastLocation=0; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/"
            console.log("The cookie is now: " + document.cookie);
        }   
            else if (todayDate.getMonth() != getCookie('lastMonth')){
            console.log("New month since last visit. Resetting!");
            document.cookie = "code="+zeroesForMonth+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/";
            document.cookie = "lastMonth="+todayDate.getMonth()+"; expires=Wed, 05 Aug 2025 23:00:00 UTC; path=/";
            }
            
            else {
                console.log("cookie found: " + document.cookie);
            }
        
        
        locPosCurrent = getCookie("lastLocation");
        switchLocation();
    }




    var currentCode = getCookie("code");

    function getCodeCookie() {
    return new Promise((resolve) => {
        // Simulate async cookie retrieval
        setTimeout(() => {
            // Replace with actual cookie retrieval logic
            console.log("got code from Promise: " + getCookie("code"));
            resolve(currentCode);
        }, 1); // Simulate delay
    });
}


    function makeBoxes(){
        for (i = 0; i < currentCode.length; i++) {
            if (currentCode.charAt(i) == 1) {
                myContainer.insertAdjacentHTML('beforeend',checkboxMarkup("on",i+1));
            }
            else if ((currentCode.charAt(i) != 1) && (i+1 == todayDay)) {
                myContainer.insertAdjacentHTML('beforeend',checkboxMarkup("today",i+1));
            }
            else {
                myContainer.insertAdjacentHTML('beforeend',checkboxMarkup("off",i+1));
            }

        }
        scanBoxes();
    }

    getCodeCookie().then(currentCode => makeBoxes(currentCode));



    

});

function getLastDate(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return value[4];
    // return (value != null) ? unescape(value[1]) : null; 
}

// Date stuff
const todayDate = new Date();
const todayDay = todayDate.getDate();
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const daysThisMonth = daysInMonth(todayDate.getFullYear(), todayDate.getMonth());

var zeroesForMonth = "";
for (i = 0; i < daysThisMonth; i++) {
    zeroesForMonth += "0";
}





// var currentCode = getCookie('code');

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
            <input type="checkbox" onchange="toggleCheckbox(this)" id="day1" name="settings" checked>
            <div class="siteofgrace"><span class="calendar-day">`+day+`</span></div>
            </label>
            `
    }
    else if (state =="off") {
        return `
            <label class="check-off" tabindex="0">
            <input type="checkbox" onchange="toggleCheckbox(this)" id="day1" name="settings">
            <div class="siteofgrace"><span class="calendar-day">`+day+`</span></div>
            </label>
            `
    }

    // Day is today
    else {
        return `
        <label class="check-off" tabindex="0">
        <input type="checkbox" onchange="toggleCheckbox(this)" id="day1" name="settings">
        <div class="siteofgrace"><span class="today-day">`+day+`</span></div>
        </label>
        `
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






// makeBoxes();


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
const totalTimeDisplay = document.getElementById("duration");
const volumeToggle = document.getElementById("volume-toggle");
const lostGraceMessage = document.getElementById("grace-discovered");
const timeLeftArrow = document.getElementById("time-left");
const timeRightArrow = document.getElementById("time-right");

let isPlaying = false;
let isVolumeControl = false;
let duration = 900;

let timePosCurrent = 2;
let timePosMin = 0;
let timePosMax = 3;

const positionTimes = [5, 600, 900, 1200];

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "";
        console.log("shoud be pausing");
        playPauseButton.innerText = "Start";
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
    var currentTime = audio.currentTime;

    var currentMinutes = Math.floor(currentTime / 60);
    var currentSeconds = Math.floor(currentTime % 60);
    var totalMinutes = Math.floor(duration / 60);
    var totalSeconds = Math.floor(duration % 60);

    const graceSound = new Audio("lost_grace_sfx-10.mp3");
    function playGrace() {
        graceSound.play();
    }

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / `;
    // totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    // totalTimeDisplay.textContent = `${duration}m`;

    var progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;

    function showGrace() {
        playGrace();
        lostGraceMessage.classList.remove("-z-10");
        lostGraceMessage.classList.add("z-10");
        lostGraceMessage.classList.add("flex");
        lostGraceMessage.classList.remove("invisible");
        lostGraceMessage.classList.remove("opacity-0");
        lostGraceMessage.classList.add("opacity-1");


    }

    function hideGrace() {
        lostGraceMessage.classList.remove("opacity-1");
        lostGraceMessage.classList.add("opacity-0");

        // Wait 2000ms for grace to fade out, then set z-index.
        setTimeout(() => {
            lostGraceMessage.classList.remove("flex");
            lostGraceMessage.classList.add("invisible");

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

function clearTime() {
    progress = 0;
    progressBar.style.width = '0%';
    playPauseButton.innerText = "Start";
    audio.currentTime = 0;
    currentMinutes = 0;
    currentSeconds = 0;
    isPlaying = false;
}

function timerReset() {
    audio.pause();
    setTimeout(() => {
        clearTime();
      }, 100);
}

timeRightArrow.addEventListener("click", () => {
    if (timePosCurrent < timePosMax) {
        // Bump up to the next level
        timeLeftArrow.style.cursor = "pointer";
        timePosCurrent ++;
        duration = positionTimes[timePosCurrent];
        totalTimeDisplay.innerText = duration/60 + " minutes";
        timerReset();

        if (timePosCurrent == timePosMax) {            
            // Set default cursor if at max setting
            timeRightArrow.style.cursor = "default";
        }   else {
            console.log("unexpected error");
        }
    }
        else {
            console.log("unexpected error");
    }
});

timeLeftArrow.addEventListener("click", () => {
    if (timePosCurrent > timePosMin) {
        // Bump up to the next level
        timeRightArrow.style.cursor = "pointer";
        timePosCurrent --;
        duration = positionTimes[timePosCurrent];
        totalTimeDisplay.innerText = duration/60 + " minutes";
        timerReset();

        if (timePosCurrent == timePosMin) {            
            // Set default cursor if at max setting
            timeLeftArrow.style.cursor = "default";
            totalTimeDisplay.innerText = duration + " seconds";
        }   else {
            console.log("unexpected error");
        }
    }
        else {
            console.log("unexpected error");
    }
});


// For location and pulling from cookie
let locPosCurrent = 0;
const positionLocations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const locationLeft = document.getElementById("location-left");
const locationRight = document.getElementById("location-right");
var locationTitle = document.getElementById("location-title");


locationLeft.addEventListener("click", () => {
});

locationRight.addEventListener("click", () => {
    locPosCurrent ++;
    console.log(positionLocations.length);
    console.log(locPosCurrent);
    if (locPosCurrent > (positionLocations.length - 1)) {
        locPosCurrent = 0;
        document.cookie = "lastLocation=" + locPosCurrent;
    } else {
    switchLocation();
    audio.load();
    document.cookie = "lastLocation=" + locPosCurrent;
    }
    switchLocation();
    audio.load();
    document.cookie = "lastLocation=" + locPosCurrent;
});

locationLeft.addEventListener("click", () => {
    locPosCurrent --;
    console.log(positionLocations.length);
    console.log(locPosCurrent);
    if (locPosCurrent < 0) {
        locPosCurrent = positionLocations.length - 1;
        document.cookie = "lastLocation=" + locPosCurrent;
    } else {
    switchLocation();
    document.cookie = "lastLocation=" + locPosCurrent;
    }
    switchLocation();
    document.cookie = "lastLocation=" + locPosCurrent;
});



var audioSource = document.getElementById("audio-source");
var backgroundScene = document.getElementById("bg");

function switchLocation() {
    if (positionLocations[locPosCurrent] == 0) {
        locationTitle.innerText = "Roundtable Hold";
        audioSource.src = "./audio/roundtable_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-roundtable-1.jpg)";
    } else if (positionLocations[locPosCurrent] == 1) {
        locationTitle.innerText = "Limgrave";
        audioSource.src = "./audio/limgrave_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-limgrave-1.png)";
    } else if (positionLocations[locPosCurrent] == 2) {
        locationTitle.innerText = "Weeping Peninsula";
        audioSource.src = "./audio/weeping_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-weeping-1.png)";
    } else if (positionLocations[locPosCurrent] == 3) {
        locationTitle.innerText = "Liurnia of the Lakes";
        audioSource.src = "./audio/liurnia_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-liurnia-1.png)";
    } else if (positionLocations[locPosCurrent] == 4) {
        locationTitle.innerText = "Deeproot Depths";
        audioSource.src = "./audio/deeproot_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-deeproot-1.png)";
    } else if (positionLocations[locPosCurrent] == 5) {
        locationTitle.innerText = "Volcano Manor";
        audioSource.src = "./audio/volcano_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-volcano-1.png)";
    } else if (positionLocations[locPosCurrent] == 6) {
        locationTitle.innerText = "Leyndell, Royal Capital";
        audioSource.src = "./audio/leyndell_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-leyndell-1.png)";
    } else if (positionLocations[locPosCurrent] == 7) {
        locationTitle.innerText = "Mountaintops of the Giants";
        audioSource.src = "./audio/mountaintops_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-mountaintops-1.jpg)";
    } else if (positionLocations[locPosCurrent] == 8) {
        locationTitle.innerText = "Haligtree Roots";
        audioSource.src = "./audio/haligtree_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-haligtree-1.jpg)";
    } else if (positionLocations[locPosCurrent] == 9) {
        locationTitle.innerText = "Crumbling Farum Azula";
        audioSource.src = "./audio/farumazula_20.mp3";
        backgroundScene.style.backgroundImage = "url(img/scene-farumazula-1.jpg)";
    }
    audio.load();

}



