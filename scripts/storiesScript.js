storiesContainer = document.getElementById('stories');
stories = document.getElementById('storiesScreen');
storiesPlayer = document.getElementById('storiesPlayer');
storiesVideo = document.getElementById('storiesVideo');
progressContainer = document.getElementById('progressContainer');
progressBar = document.getElementById('progressBar');
hint = document.getElementById('storiesHint');

var storiesIsActive = false;

var mc = new Hammer(storiesPlayer);
mc.add(new Hammer.Tap());
mc.add(new Hammer.Press({ time: 150 }));

document.addEventListener('DOMContentLoaded', function() {
    const storiesPlayer = document.getElementById('storiesPlayer');
    const sources = [
        'videos/1.mp4',
        'videos/2.mp4',
        'videos/3.mp4',
        'videos/4.mp4',
        'videos/5.mp4',
        'videos/6.mp4'
    ];
    let currentIndex = 0;
    let isTouching = false;

    // Предварительная загрузка видео
    const preloadedVideos = sources.map((src) => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        return video;
    });

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

    mc.on('tap press', function(event) {
        if (!storiesIsActive) return;

        if (event.type === 'tap') {
            const screenWidth = stories.offsetWidth;
            const clickX = event.center.x - stories.getBoundingClientRect().left;

            if (!storiesPlayer.paused && clickX > screenWidth / 2) {
                nextVideo();
            } else if (storiesPlayer.paused) {
                storiesPlayer.play();
            } else {
                if (storiesPlayer.currentTime > 1) {
                    storiesPlayer.currentTime = 0;
                } else {
                    prevVideo();
                }
            }
        } else if (event.type === 'press') {
            storiesPlayer.pause();
            isTouching = true;
        }
    });

    mc.on('pressup', function() {
        if (isTouching) {
            storiesPlayer.play();
            isTouching = false;
        }
    });
});

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
let isHintOn = true;
let isHintActive = false;
function fullScreen() {
    if (!storiesIsActive) {
        if (isHintOn && !isHintActive) {
            isHintActive = true;
            hint.style.display = 'grid';
            setTimeout(function() {
                hint.style.display = 'none';
                isHintActive = false;
            }, 10000)
        }
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

hint.addEventListener('click', function() {
    hint.style.display = 'none';
    isHintOn = false;
})

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
