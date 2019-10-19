
document.write(
  '<div class="fixedTicker tickerOnepoint">JR線運行情報</div>' +
  '<div class="fixedTicker ticker"> ' +
  '  <iframe id="tickerFrame" name="tickerFrame"></iframe>' +
  '</div> ' +
  '<div class="fixedTicker tickerClock" onclick="showSettingSec();">' +
  '  <div class="t_logo">現在<br>時刻</div>' +
  '  <div id="t_clock"></div>' +
  '</div>');
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

function loadTrainTicker(){
  window.open(
    "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=ticker"
    ,"tickerFrame");
}
loadTrainTicker();
setInterval(loadTrainTicker,600000); // 10分ごとに更新

var clockElm = document.getElementById("t_clock");
new Clock(clockElm);