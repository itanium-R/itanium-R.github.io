document.write(
  '<div class="fixedTicker tickerOnepoint">' + tickerProp.title + '</div>' +
  '<div class="fixedTicker ticker" id="ticker"> ' +
  '<div class="marquee"><p id="marqueeStr"></p></div>' +
  '</div> ' +
  '<div class="fixedTicker tickerClock" onclick="showSettingSec();" id="t_clock_wrap">' +
  '  <div class="t_logo" id="t_logo">現在<br>時刻</div>' +
  '  <div id="t_clock"></div>' +
  '</div>');

  setTimeout(() => {
      if(isClockBig){
        document.getElementById("ticker"      ).className = "fixedTicker tickerC";
        document.getElementById("t_clock_wrap").className = "tickerClockC";
        document.getElementById("t_logo"      ).className = "t_logoC";
        document.getElementById("t_clock"     ).className = "t_clockC";
      }
    }, 2000);

class Clock{
  constructor(clockElm){
    this.clockElm = clockElm;
    setInterval(()=>{this.updateClock();},1000);
  }
  getNowTime(){
    var nowTime = new Date();
    this.h = nowTime.getHours();
    this.m = nowTime.getMinutes();
  }
  writeClock(){
    this.clockElm.innerHTML = (
      `${("00" + this.h).slice(-2)}:${("00" + this.m).slice(-2)}`
    );
  }
  updateClock(){
    this.getNowTime();
    this.writeClock();
  }
}

class Marquee{
  constructor(tickerProp){
    this.request   = new XMLHttpRequest();
    this.url       = tickerProp.url;
    this.fieldName = tickerProp.fieldName;
    this.reloadDur = tickerProp.reloadDur;

    this.request.onreadystatechange = () => {
      if (this.request.readyState == 4 ){
        if(this.request.status != 200) {
          console.log(this.request.status);
        } else {
          // 送信成功
          let result = JSON.parse(this.request.responseText);
          
          let marqueeStr = document.getElementById("marqueeStr");
          marqueeStr.innerHTML = result[this.fieldName];
          
          let marqueeStrLen = marqueeStr.innerHTML.length;
          if(marqueeStrLen <= 20){
            marqueeStr.innerHTML += "　　　　　　　　　　　　　　　　　　　　"; //スペース*20
            marqueeStrLen        += 50; // 流れを遅くする
          }
          
          marqueeStr.style.animationDuration = (marqueeStrLen/5)+ "s";
        }
      }
    }
    
    if(this.reloadDur>0) setInterval(()=>{this.get()},this.reloadDur * 1000);
    this.get();
  }

  get(){
    this.request.open('GET', this.url);
    this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.request.send();
  }
}

var clockElm = document.getElementById("t_clock");
new Clock(clockElm);
new Marquee(tickerProp);