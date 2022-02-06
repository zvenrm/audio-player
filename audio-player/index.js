const player = document.querySelector('.player') //плеер
const fullTime = document.querySelector('.duration-time') //полное время трека
const currentTime = document.querySelector('.current-time') //текущее время трека
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
const muteBtn = document.querySelector('.player-mute')  //кнопка мута
const volIcon = document.querySelector('.player-max')  //иконка громкости
const volumeBar = document.querySelector('.volume-input') //регулятор громкости
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
    audio.volume = volumeBar.value / 100
}

//переключение песен
function switchTreck (numTreck) {
    currentTime.innerHTML = '0:00'
    audio.src = './assets/audio/' + tracks[numTreck];    //изменение пути к треку
    image.src = './assets/img/' + album[tracks[numTreck]]    //изменение картинки
    band.textContent = tracks[numTreck].split(' - ')[0]
    trackName.textContent = tracks[numTreck].split(' - ')[1].slice(0, -4)
    audio.currentTime = 0;
    audio.play();
}

function durationOfTrack() {
    fullTime.innerHTML = Math.floor(audio.duration / 60) + ':'
    if(audio.duration % 60 < 10) {
        fullTime.innerHTML += '0'
    }
    fullTime.innerHTML += Math.floor(audio.duration % 60)
}

function currentDuration(){
    let audioTime = audio.currentTime;
    let curTime = Math.floor(audioTime / 60) + ":"
    if(audioTime % 60 < 10) {
        curTime += '0'
    }
    curTime += Math.round(audioTime % 60)
    currentTime.innerHTML = curTime
}

function audioPlay(){
    setInterval(function() { //интервальное заполнение прогресс бара
        let audioTime = audio.currentTime;
        let audioLength = audio.duration
        progressBar.max = audioLength
        progressBar.value = audioTime;
        currentDuration()
        if (audioTime == audioLength && track < 4) {
            track++;
            switchTreck(track);
        } else if (audioTime == audioLength && track >= 4) {
            switchTreck(track); 
        }
    }, 1000)
}


playBtn.addEventListener("click", function() {
    player.classList.toggle('animation')
    playBtn.classList.toggle('player-pause')
    progressBar.max = audio.duration
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
        switchTreck(track)
        progressBar.max = audio.duration
        audioPlay()
    } else {
        track = 4;
        switchTreck(track)
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

progressBar.addEventListener('change', function() {
    audio.currentTime = progressBar.value
})

let currentVol;

volumeBar.addEventListener('input', () => {
    if (audio.muted){
        audio.muted = false
    }
    audio.volume = volumeBar.value / 100
    currentVol = volumeBar.value / 100
    if (volumeBar.value < 50 && volumeBar.value > 0){
        volIcon.classList.add('player-min')
        volIcon.classList.remove('player-zero')
    }
    else if (volumeBar.value > 50){
        volIcon.classList.remove('player-min')
        volIcon.classList.remove('player-zero')
    }
    else{
        volIcon.classList.remove('player-min')
        volIcon.classList.add('player-zero')
    }
})

muteBtn.addEventListener('click', () => {
    if (audio.muted === true){
        audio.muted = false
        volumeBar.value = currentVol * 100
        volIcon.classList.remove('player-zero')
    }
    else {
        audio.muted = true
        volumeBar.value = 0
        volIcon.classList.add('player-zero')
    }
})

audio.addEventListener('loadedmetadata', durationOfTrack)