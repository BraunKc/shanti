storiesContainer = document.getElementById('stories');
stories = document.getElementById('storiesScreen');
storiesPlayer = document.getElementById('storiesPlayer');
storiesVideo = document.getElementById('storiesVideo');
progressContainer = document.getElementById('progressContainer');
progressBar = document.getElementById('progressBar');

var storiesIsActive = false;

// УМЕНЬШЕНИЕ ВИДЕО
function storiesWindowed() {
    storiesIsActive = false;
    stories.style.removeProperty('height');
    stories.style.removeProperty('width');
    storiesPlayer.style.removeProperty('border-radius');
    document.body.style.overflow = 'visible';
    storiesPlayer.muted = true;
    progressContainer.style.display = 'none';
}

// ОТКРЫТИЕ ВИДЕО НА ВЕСЬ ЭКРАН
function fullScreen() {
    if (!storiesIsActive) {
        storiesIsActive = true;

        let h, w, r;
        if (window.innerWidth > 768) {
            h = '100vh'; w = '25vw'; r = '25px';
        } else {
            h = '100vh'; w = '100vw'; r = '0';
        }

        stories.style.height = h;
        stories.style.width = w;
        storiesPlayer.style.borderRadius = r;
        document.body.style.overflow = 'hidden';
        storiesPlayer.muted = false;
        setTimeout(function() {
            stories.scrollIntoView();
            progressContainer.style.display = 'flex';
        }, 300)
    } else if (window.innerWidth > 768 && storiesIsActive && event.target === storiesContainer) {
        storiesWindowed()
    }
}

// ТРИГЕРЫ
function handleInteraction(event) {
    event.preventDefault();
    fullScreen();
}

storiesContainer.addEventListener('click', fullScreen);

var startY, endY, startX, endX

storiesPlayer.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
});
storiesPlayer.addEventListener('touchend', function(e) {
    endY = e.changedTouches[0].clientY;
    endX = e.changedTouches[0].clientX;
    if (Math.abs(startY - endY) > 10 && Math.abs(startX - endX) < 50) storiesWindowed();
});

document.addEventListener('DOMContentLoaded', function() {
    const storiesPlayer = document.getElementById('storiesPlayer');
    const sources = [
        'videos/1.webm',
        'videos/2.webm',
        'videos/3.webm',
        'videos/4.webm',
        'videos/5.webm',
        'videos/6.webm'
    ];
    let currentIndex = 0;

    function playVideo(index) {
        storiesPlayer.src = sources[index];
        storiesPlayer.play();
    }
    function nextVideo() {
        currentIndex = (currentIndex + 1) % sources.length;
        playVideo(currentIndex);
    }
    function prevVideo() {
        currentIndex = (currentIndex - 1 + sources.length) % sources.length;
        playVideo(currentIndex);
    }

    storiesPlayer.addEventListener('ended', nextVideo);

    document.getElementById('storiesScreen').addEventListener('click', function(event) {
        if (!storiesIsActive) return;

        const screenWidth = this.offsetWidth;
        const clickX = event.offsetX;

        if (clickX > screenWidth / 2) {
            nextVideo();
        } else {
            if (storiesPlayer.currentTime > 1) {
                storiesPlayer.currentTime = 0;
            } else {
                prevVideo();
            }
        }
    });
});

// ЗАПРЕТ ВЫЗОВА CONTEX MENU
storiesPlayer.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// PROGRESS BAR
function updateProgress() {
    const progress = (storiesPlayer.currentTime / storiesPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    requestAnimationFrame(updateProgress);
}
updateProgress();
