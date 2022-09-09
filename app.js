const song = document.getElementById("song");
const playBtn=document.querySelector(".play-inner");
const back =document.querySelector(".back")
const  next = document.querySelector(".next")
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImg = document.querySelector(".music-tumb img"); 
const musicthumb = document.querySelector(".music-tumb"); 
const playRepeat = document.querySelector(".repeat");
const volIcon = document.querySelector(".vol-icon-on")
const volRange =document.getElementById('vol-range');




displayTimer();
let timer = setInterval(displayTimer,500);
let repeatCount = 0;
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;

playRepeat.addEventListener("click",function(){
    if(isRepeat){
        isRepeat=false;
        playRepeat.removeAttribute("style");

    } 
    else {
        repeatCount=0;
        isRepeat=true;
        playRepeat.style.color="#ffb86c";
    }
});



// const music = [
//     "5cu.mp3","bautroi.mp3","buon.mp3"
// ];
const music =[
    {
        id:1,
        title: "Ánh sao và bầu trời",
        file: "bautroi.mp3",
        img:"https://i.ytimg.com/vi/9vaLkYElidg/maxresdefault.jpg"
    },
    {
        id:2,
        title: "Đứa nào làm em buồn",
        file: "buon.mp3",
        img:"https://static2.yan.vn/YanNews/2167221/202006/phuc-du-la-ai-tieu-su-su-nghiep-doi-tu-cua-nam-rapper-040f0e64.jpg"
    },
    {
        id:3,
        title: "Waiting for you",
        file: "mono.mp3",
        img:"https://i.ytimg.com/vi/CHw1b_1LVBA/maxresdefault.jpg"
    },
    {
        id:4,
        title: "Quên anh đi",
        file: "quenadi.mp3",
        img:"https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/5/c/0/55c048ed36d5490a88876575330192be.jpg"
    },
    {
        id:5,
        title: "Vài câu nói",
        file: "vaicaunoi.mp3",
        img:"https://i.ytimg.com/vi/2iidlwQ-NfU/maxresdefault.jpg"
    },
    {
        id:6,
        title: "Từng là của nhau",
        file: "tao.mp3",
        img:"https://i.ytimg.com/vi/Udc6MAAZT30/maxresdefault.jpg"
    },
    {
        id:7,
        title: "Anh đâu có biết",
        file: "vu.mp3",
        img:"https://avatar-ex-swe.nixcdn.com/song/share/2022/08/05/a/9/1/b/1659667076562.jpg"
    }
]

/**
 * Music
 * id:1
 * title:5cu
 * file:5cu.mp3
 * img:jack
 */


volIcon.addEventListener("click",function(){
    volIcon.innerHTML=`<ion-icon name="volume-mute" class="vol-icon-on"></ion-icon>`
})

song.setAttribute("src",`./mp3/${music[indexSong].file}`);

next.addEventListener("click",function(){
    changeSong(1);
})

back.addEventListener("click", function(){
    changeSong(-1);
});

song.addEventListener("ended",handleEndedSong);

function handleEndedSong(){
    repeatCount++
    if(isRepeat && repeatCount===1){
        //handleRepeat Song
        isPlaying=true;
        playPause();
    }else{
        changeSong(1);
    }
}

function changeSong(dir){
    if(dir===1){
        //next song
        indexSong++;
        if(indexSong >= music.length){
            indexSong=0;
        }
        isPlaying=true; 
    }else if(dir===-1){
        indexSong--
        if(indexSong<0){
            indexSong = music.length - 1;
        }
        isPlaying=true;
    }
    init(indexSong);
    // song.setAttribute("src",`./mp3/${music[indexSong].file}`);
    playPause();
}


playBtn.addEventListener("click", playPause);

function playPause(){
    if(isPlaying){
        musicthumb.classList.add("isPlaying");
        song.play();
        playBtn.innerHTML=`<ion-icon name="pause-circle" class="play"></ion-icon>`
        isPlaying = false;
        timer = setInterval(displayTimer,500);
    }else{
        musicthumb.classList.remove("isPlaying")
        song.pause();
        playBtn.innerHTML=` <ion-icon name="play-circle" class="play"></ion-icon>`
        isPlaying=true;
        clearInterval(timer);
    }
}






function displayTimer(){
    const {duration,currentTime}=song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent=formatTime(currentTime);
    if(!duration){
        durationTime.textContent = "00:00";
    }else{
        durationTime.textContent = formatTime(duration);
    }
}

function formatTime(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes *60);
    return `${minutes<10?'0'+ minutes:minutes}:${seconds<10 ? '0'+seconds:seconds}`;
}


range.addEventListener("change",handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}

function init(){
    displayTimer();
    song.setAttribute("src",`./mp3/${music[indexSong].file}`);
    musicImg.setAttribute("src",music[indexSong].img);
    musicName.textContent = music[indexSong].title;
}
init(indexSong);





// function changevolume(amount)
//     {
//         console.log(amount/100)
//         let count = amount/100;
//         song.volume = count;
//     }

// isMute = false;
// function muteVol(){
//     if( isMute ) {
//         volIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>'
//         isMute = false;
//         changevolume(volRange.value);
//     } else
//     {
//     volIcon.innerHTML = '<ion-icon name="volume-mute" class="vol-icon"></ion-icon>'
//     isMute = true; 
//     changevolume(0);
//     }
// } 





