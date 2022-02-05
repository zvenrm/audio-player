const player = document.querySelector('.player') //плеер
const setting = document.querySelector('.change-color') //шестеренка
const inputColor = document.querySelector('.color-input')   //инпут изменения цвета
const audio = document.querySelector('.audio')  //объект аудио
const image = document.querySelector('.image')  //картинка трека
const band = document.querySelector('.band-name')  //группа
const trackName = document.querySelector('.track-name')  //название трека
const progressBar = document.querySelector('.progress-input')   //полоса прогресса
const playBtn = document.querySelector('.player-play')  //кнопка плей
const prevBtn = document.querySelector('.player-prev')  //кнопка предыдущей песни
const nextBtn = document.querySelector('.player-next')  //кнопка следующей песни
const stopBtn = document.querySelector('.player-stop')  //кнопка стоп
let color = document.documentElement //доступ к переменной css

//-----------------------------------изменение цвета----------------------------------
function colorRemove(e){
    if (!e.target.classList.contains('change-color') && !e.target.classList.contains('color-input')){
        inputColor.classList.remove('color-display')
    }
}

document.body.addEventListener('click', colorRemove)

setting.addEventListener('click', () => {
    inputColor.classList.toggle('color-display')
})
inputColor.addEventListener('input', () => {
    color.style.setProperty('--color', inputColor.value)
})
//-----------------------------------конец изменения цвета----------------------------------

const album = {
    'Lindemann - Allesfresser.mp3': 'Allesfresser.jpg',
    'Lindemann - Platz Eins.mp3': 'Platz eins.jpg',
    'Rammstein - Deutschland.mp3': 'Deutschland.jpg',
    'Rammstein - Klavier.mp3': 'Klavier.jpg',
    'Rammstein - Mann Gegen Mann.mp3': 'Mann Gegen Mann.jpg',
}

const tracks = Object.keys(album)

let track;

window.onload = function() {
    track = 0;
}

//переключение песен
function switchTreck (numTreck) {
    audio.src = './assets/audio/' + tracks[numTreck];    //изменение пути к треку
    image.src = './assets/img/' + album[tracks[numTreck]]    //изменение картинки
    band.textContent = tracks[numTreck].split(' - ')[0]
    trackName.textContent = tracks[numTreck].split(' - ')[1].slice(0, -4)
    audio.currentTime = 0;
    audio.play();
}

function audioPlay(){
    setInterval(function() { //интервальное заполнение прогресс бара
        let audioTime = Math.round(audio.currentTime);
        let audioLength = Math.round(audio.duration)
        progressBar.max = audioLength
        progressBar.value = audioTime;
        if (audioTime == audioLength && track < 4) {
            track++;
            switchTreck(track);
        } else if (audioTime == audioLength && track >= 4) {
            switchTreck(track); 
        }
    }, 10)
}


playBtn.addEventListener("click", function() {
    player.classList.toggle('animation')
    playBtn.classList.toggle('player-pause')
    
    audio.play();
    audioPlay()
    if (!playBtn.classList.contains('player-pause')){
        audio.pause()
        clearInterval(audioPlay())
    }
});

prevBtn.addEventListener("click", function() {
    if (!playBtn.classList.contains('player-pause') && !player.classList.contains('animation')  ) {
        playBtn.classList.add('player-pause')
        player.classList.add('animation')
    }
    if (track > 0) {
        track--;
        switchTreck(track);
        audioPlay()
    } else {
        track = 4;
        switchTreck(track);
        audioPlay()
    }
});

nextBtn.addEventListener('click', function() {
    if (!playBtn.classList.contains('player-pause') && !player.classList.contains('animation')) {
        playBtn.classList.add('player-pause')
        player.classList.add('animation')
    }
    if (track < 4) {
        track++;
        switchTreck(track);
        audioPlay()
    } else {
        track = 0;
        switchTreck(track);
        audioPlay()
    }
});

stopBtn.addEventListener('click', function() {
    audio.currentTime = 0
    audio.pause()
    playBtn.classList.remove('player-pause')
    player.classList.remove('animation')
})

audio.addEventListener('change', function() {
    console.log(Math.round(audio.currentTime))
})