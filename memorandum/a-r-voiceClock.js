voices = [
  {
    startup: {
      hour:   8,
      minute: 50,
    },
    url: "./a-r-voice/0850/0850aoi.mp3",
  },{
    startup: {
      hour:   10,
      minute: 30,
    },
    url: "./a-r-voice/1030/1030ykr.mp3",
  },{
    startup: {
      hour:   12,
      minute: 50,
    },
    url: "./a-r-voice/1250/1250aoaka.mp3",
  },{
    startup: {
      hour:   14,
      minute: 30,
    },
    url: "./a-r-voice/1430/1430ykr.mp3",
  },{
    startup: {
      hour:   16,
      minute: 10,
    },
    url: "./a-r-voice/1610/1610ykr.mp3",
  },{
    startup: {
      hour:   17,
      minute: 50,
    },
    url: "./a-r-voice/1750/1750akn.mp3",
  },{
    startup: {
      hour:   19,
      minute: 30,
    },
    url: "./a-r-voice/1930/1930ykr.mp3",
  },{
    startup: {
      hour:   21,
      minute: 00,
    },
    url: "./a-r-voice/2100/2100ykr.mp3",
  },{
    startup: {
      hour:   21,
      minute: 55,
    },
    url: "./a-r-voice/2155/hotaru.mp3",
  },{
    startup: {
      hour:   22,
      minute: 00,
    },
    url: "./a-r-voice/2200/2200ykr.mp3",
  },{
    startup: {
      hour:   23,
      minute: 00,
    },
    url: "./a-r-voice/2300/2300ykr.mp3",
  },
];



function voiceStarter(){
  let now = new Date();
  console.log(now.getHours(),now.getMinutes());
  for(v of voices){
    if((now.getHours()   == v.startup.hour    || v.startup.hour == "*") &&
       (now.getMinutes() == v.startup.minute  || v.startup.minute  == "*") ){
        console.log(v);
        playVoice(v.url);
    }
  }
}

setInterval(voiceStarter,60 * 1000);


function playVoice(url){
  var audio = new Audio();
  audio.src = url;
  audio.play();
}