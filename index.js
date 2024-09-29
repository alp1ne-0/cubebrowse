currentFace = 'front';

pageLoads = 0;

tubularBells = false;

cubePoints = 0;

gotFrameFiller = false;
gotCCC = false;

urls =
    {
        'front':  '/pages/welcome.html',
        'back':   'about:blank',
        'right':  'about:blank',
        'left':   'about:blank',
        'top':    'about:blank',
        'bottom': 'about:blank',
    }

rotX = 0;
rotY = 0;

function updatePointDisplay() {
    let pointElem = document.getElementById('points');
    pointElem.innerHTML = cubePoints;
}

updatePointDisplay();

function showFace(face) {
  let cubeElem = document.getElementById('cube');
  //cubeElem.className = 'cube show-' + face;

  const others = document.querySelectorAll('.face:not(.' + face + ')');

  for (elem of others) {
    elem.classList.remove('focus');
    elem.ariaHidden = "true";
  }

  let faceElem = document.querySelector('.' + face);
  faceElem.className = 'face focus ' + face;
  faceElem.ariaHidden = "false";

  document.getElementById("urlInput").value = urls[face];
}

function buttonPressed(direction) {
    switch (direction) {
        case 'up':    rotX -= 90; break;
        case 'down':  rotX += 90; break;
        case 'left':  rotY += 90; break;
        case 'right': rotY -= 90; break;
    }

    let cubeElem = document.getElementById('cube');
    cubeElem.style = 'transform: rotateX('+rotX+'deg) rotateY('+rotY+'deg)';

    if (rotX % 360 <= -180) {
        switch (rotY % 360) {
            case    0:            currentFace = 'back';  break;
            case  -90: case  270: currentFace = 'left';  break;
            case -180: case  180: currentFace = 'front'; break;
            case   90: case -270: currentFace = 'right'; break;
        }
    } else {
        switch (rotY % 360) {
            case    0:            currentFace = 'front'; break;
            case  -90: case  270: currentFace = 'right'; break;
            case -180: case  180: currentFace = 'back';  break;
            case   90: case -270: currentFace = 'left';  break;
        }
    }

    switch (rotX % 360) {
        case  -90: case  270: currentFace = 'top'; break;
        case   90: case -270: currentFace = 'bottom';  break;
    }

    showFace(currentFace);
}

function updateUrl(url) {
  urls[currentFace] = url;

  let iframe = document.querySelector('.' + currentFace).getElementsByTagName('iframe')[0];
  iframe.src = url;

  document.getElementById('urlInput').value = url;


  if (!Object.values(urls).includes("about:blank") && !gotFrameFiller) {
    gotFrameFiller = true;
    alert('Got achievement: Frame Filler')
    cubePoints += 10;
    updatePointDisplay();
  }
}

showFace('front');

document.getElementById("urlForm").addEventListener('submit', e => {
  e.preventDefault();
  updateUrl(e.currentTarget.url.value);
});

keysPressed = {}

document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;

  if (keysPressed['Control']) {
      switch (event.key) {
          case 'ArrowLeft':  buttonPressed('left');  break;
          case 'ArrowUp':    buttonPressed('up');    break;
          case 'ArrowRight': buttonPressed('right'); break;
          case 'ArrowDown':  buttonPressed('down');  break;
      }
  }
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
});

function back() {
    let iframe = document.querySelector('.' + currentFace).getElementsByTagName('iframe')[0];
    iframe.contentWindow.history.back(); 
}

function forward() {
    let iframe = document.querySelector('.' + currentFace).getElementsByTagName('iframe')[0];
    iframe.contentWindow.history.forward();
}

function reload() {
    let iframe = document.querySelector('.' + currentFace).getElementsByTagName('iframe')[0];
    iframe.contentWindow.location.reload();
}

function increment() {
    pageLoads += 1;

    switch (pageLoads)
    {
        case 25:    cubePoints += 5;    updatePointDisplay() ;alert('Got achievement: Small-time Surfer')         ; break;
        case 50:    cubePoints += 10;   updatePointDisplay() ;alert('Got achievement: Rapid Reader')              ; break;
        case 100:   cubePoints += 20;   updatePointDisplay() ;alert('Got achievement: Prolific Pageseeker')       ; break;
        case 500:   cubePoints += 100;  updatePointDisplay() ;alert('Got achievement: Archduke Archivist')        ; break;
        case 1000:  cubePoints += 200;  updatePointDisplay() ;alert('Got achievement: Magnanimous Makeinquiry-er'); break;
        case 5000:  cubePoints += 1000; updatePointDisplay() ;alert('Got achievement: Quixotic Questioner')       ; break;
        case 10000: cubePoints += 2000; updatePointDisplay() ;alert('Got achievement: Crazed CubeBrowse™r')       ; break;
    }
}

window.onmessage = function(e) {
    if (e.data == 'readManual' && !gotCCC) {
        gotCCC = true;
        cubePoints += 5;
        updatePointDisplay();
        alert('Got achievement: CubeBrowse™ CubserManual™ Completionist');
    }
    if (e.data == 'buyTextFlagTrail' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        new cursoreffects.textFlag({text: "I love CubeBrowse™!"});
    }
    if (e.data == 'buyClockTrail' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        new cursoreffects.clockCursor();
    }
    if (e.data == 'buyRainbowTrail' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        new cursoreffects.rainbowCursor();
    }
    if (e.data == 'buyFairyDust' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        new cursoreffects.fairyDustCursor();
    }
    if (e.data == 'buyElastic' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        new cursoreffects.springyEmojiCursor();
    }
    if (e.data == 'buyGhosts' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        new cursoreffects.ghostCursor();
    }

    if (e.data == 'buyUnpleasant' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        document.body.classList = 'unpleasantGradient';
    }
    if (e.data == 'buySimple' && cubePoints >= 5) {
        cubePoints -= 5;
        updatePointDisplay();
        document.body.classList = 'simpleGradient';
    }
    if (e.data == 'buyEverchanging' && cubePoints >= 10) {
        cubePoints -= 10;
        updatePointDisplay();
        document.body.classList = 'everchangingGradient';
    }

    if (e.data == 'buyTubularBells' && cubePoints >= 5) {
        if (!tubularBells) {
            cubePoints -= 5;
            updatePointDisplay();
            document.getElementById("tubularbells").style = "pointer-events: auto;"
            tubularBells = true;
        }
    }

    if ((typeof e.data) === "number") {
        cubePoints += e.data;
        updatePointDisplay();
    }
};

clicksInLastSecond = 0;
gotSongwrite = false;

var b4 = new Audio('tubular-bell-b4.ogg');
var a4 = new Audio('tubular-bell-a4.ogg')

function tubleft()
{
    a4.load();
    a4.volume = 0.2;
    a4.play();
    clicksInLastSecond += 1;
}

function tubright()
{
    b4.load();
    b4.volume = 0.2;
    b4.play();
    clicksInLastSecond += 1;
}

setInterval(() => {
    if (clicksInLastSecond >= 7 && !gotSongwrite) {
        gotSongwrite = true;
        cubePoints += 10;
        updatePointDisplay();
        alert('Got achievement: Songwriting Savant');
    }
    clicksInLastSecond = 0;
}, 1000);
