const NTPURL = "https://ntp-a1.nict.go.jp/cgi-bin/json";

class LocalClockDiffCalculator{
  constructor(callback){
    //callback();
    this.init();
    this.run();
  }
  run(){
    fetch(NTPURL)
      .then((response) => {
        return response.json();
      })
      .then((gotJson) => {
        console.log(gotJson);
        
        this.gotNowTime = gotJson.st;
        this.localClockDiff = new Date() - (this.gotNowTime * 1000);
        document.write("NTPとlocalの時間差 : " + this.localClockDiff + "[ms]");
      });
  }
  init(){
    this.localClockDiff = 0;    
  }

  zeropad(num,digit){
    let a = "";
    for(let i = 0;i < digit;i++)a += "0";
    return (a + num).slice(-digit)
  }
    
}