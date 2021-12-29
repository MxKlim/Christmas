import {audioPlayer} from '../../classes/classes';

const srcAudio = 'assets/audio/audio.mp3';
const page:HTMLDivElement = document.querySelector('.page');
const audio = new audioPlayer(true, true, srcAudio, page)
const soundBtn = document.querySelector('.js_controls__sound');
let audioFlag = true;
soundBtn.addEventListener('click', () => {
    if(audioFlag) {
        audio.render()
        audio.audioPlay()
        audioFlag = false
    }else {
        audio.remove();
        audioFlag = true
    }
})