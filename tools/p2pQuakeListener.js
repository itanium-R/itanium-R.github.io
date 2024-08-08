const P2PURL = "https://api.p2pquake.net/v1/human-readable?limit=5";
const lineCharNum = 20; // 1行の文字数
const DEFCHIMEURL = "/always/plugins/sounds/o26_(c)maoudamashii.wav"; 

class p2pQuakeListener{

  constructor(fetchDur = 6, dispDur = 1, chimeUrl, allCntThr = 10, areaCntThr = 3){
    this.fetchDur = fetchDur;
    this.dispDur  = dispDur;
    this.chimeUrl = chimeUrl || DEFCHIMEURL
    this.allCntThr  = allCntThr;
    this.areaCntThr = areaCntThr;
    this.fetching = false;
    this.init();
    this.initQtElm();
  }

  run(){
    if(this.runInterv){
      console.log("aleady runnning.");
      return -1;
    }
    if(!(1<=this.fetchDur && this.fetchDur <= 99999)){
      console.log("invalid fetchDur");
      return -1;
    }

    console.log("p2pQuakeListener : run started.");
    this.fetchP2pJson();
    this.runInterv = setInterval(() => {
        this.fetchP2pJson();
      },this.fetchDur * 1000);
  }

  stop(){
    if(this.runInterv){
      clearInterval(this.runInterv);
      this.runInterv = null;
    }else{
      console.log("not runnning.");
    }
  }

  fetchP2pJson(){
    if (this.fetching) {
      return;
    }
    this.fetching = true;

    fetch(P2PURL)
    .then((response) => {
      return response.json();
    })
    .then((gotJson) => {
      this.checkP2pJsonUpdate(gotJson);      
    }).finally(() => {
      this.fetching = false;
    });
  }

  init(){
    this.p2pJson=[];
    this.runInterv = null;
    this.chimes = [
      {
      	scale  : 10,
      	volume : 0.1,
        url    : this.chimeUrl,
      },
      {
      	scale  : 20,
      	volume : 0.1,
        url    : this.chimeUrl,
      },
      {
      	scale  : 30,
      	volume : 0.3,
        url    : this.chimeUrl,
      },
      {
      	scale  : 40,
      	volume : 0.8,
        url    : this.chimeUrl,
      },
      {
      	scale  : 45,
      	volume : 1.0,
        url    : this.chimeUrl,
      },
      {
      	scale  : 50,
      	volume : 1.0,
        url    : this.chimeUrl,
      },
      {
      	scale  : 55,
      	volume : 1.0,
        url    : this.chimeUrl,
      },
      {
      	scale  : 60,
      	volume : 1.0,
        url    : this.chimeUrl,
      },
      {
      	scale  : 70,
      	volume : 1.0,
        url    : this.chimeUrl,
      },
    ]
  }

  setChime(scl, url, vol){
    this.chimes.forEach(c => {
      if(c.scale == scl){
        if(url) c.url    = url;
        if(vol) c.volume = vol;
        return 0;
      }
    });   
  } 


  checkP2pJsonUpdate(gotJson){
    if (this.p2pJson.length === 0) {
      this.p2pJson = gotJson[0];
      console.log("first access : p2pJson got success.");
    } else {
      eachP2PData : for (let latestP2pJson of gotJson) { 
        if (JSON.stringify(this.p2pJson) === JSON.stringify(latestP2pJson)) {
          break eachP2PData;
        }
        switch(latestP2pJson.code) {
          case 551:
            this.p2pJson = latestP2pJson;
            this.showQuakeInfo(latestP2pJson);
            break eachP2PData;
          case 5610:
            if (latestP2pJson.count > this.allCntThr) {
              this.p2pJson = latestP2pJson;
              this.showP2pQuakePromptNews(latestP2pJson);
              break eachP2PData;
            }
          default:
            break;
        }
      }
    }
  }

  initQtElm(){          
    let qtElm = document.getElementById("quakeInfoTelop");
    if(!qtElm){
      qtElm = document.createElement("div");
      qtElm.id = "quakeInfoTelop";
      try{
        document.getElementsByTagName("body")[0].appendChild(qtElm);
        qtElm = document.getElementById("quakeInfoTelop");
      }catch(e){
        console.log("[ERROR] Invalid Html File : " + e);
        return -1;
      }
    
      qtElm.style.fontSize   = "3vw";
      qtElm.style.fontWeight = "900";
      qtElm.style.display    = "none";
      qtElm.style.zIndex     = "20" ;
      qtElm.style.position   = "fixed";
      qtElm.style.top        = "3vh";
      qtElm.style.left       = "20vw";
      qtElm.style.color      = "#FFF";
      qtElm.style.textAlign  = "left";
      qtElm.style.padding    = ".2vw";
      // qtElm.style.webkitTextStroke = "0.05vw #235"; qtElm.style.textStroke       = "0.05vw #235";
      qtElm.style.textShadow = ".2vw 0px 0px #235, .2vw -.2vw 0px #235,  .2vw  .2vw 0px #235, 0px -.2vw 0px #235," + 
                               "0px .2vw 0px #235, -.2vw .2vw 0px #235, -.2vw -.2vw 0px #235, -.2vw 0px 0px #235 ";
      qtElm.style.fontFamily = "Cutive Mono, ui-monospace";
    }
  }

  parseShindo(scale){
      switch(scale){
        case 45:
          return "５弱";
        case 50: 
          return "５強";
        case 55:
          return "６弱";
        case 60: 
          return "６強";
        default:
          return String.fromCharCode(String(scale / 10).charCodeAt(0) + 65248) + "　"; 
      }
  }

  showP2pQuakePromptNews(p2pJsonNewPart){
    try{
      let regions  = Object.keys(p2pJsonNewPart.regions);
      let str = "Ｐ２Ｐ地震速報　以下の地域で揺れに警戒<br>";
      let areaStr  = "";
      let repCnt   = 5;
      let chimeUrl = this.chimeUrl;
      let vol      = 0.2;
      regions.forEach((r) => {
        if(p2pJsonNewPart.regions[r] > this.areaCntThr){
          areaStr += r + "　";
        }
      });
      if(areaStr.length>0){
        str += areaStr;
        console.log(str.replace(/<br>/g,"\n"));
        let strList = str.split("<br>");
        strList.push("");
        this.showTelop(strList, repCnt, chimeUrl, vol); 
      }
    }catch(e){
      console.log(e);
      this.run();
    }
  }
    

  showLatestQuakeInfo(){
    this.showQuakeInfo(this.p2pJson[0]);
  }

  showQuakeInfo(p2pJsonNewPart){
    try{
      let str = "";
      let time    = p2pJsonNewPart.earthquake.time;
      let maxScl  = p2pJsonNewPart.earthquake.maxScale;
      let shindo  = this.parseShindo(maxScl);
      let epicent = p2pJsonNewPart.earthquake.hypocenter.name;
      let depth   = p2pJsonNewPart.earthquake.hypocenter.depth;
      let magunit = p2pJsonNewPart.earthquake.hypocenter.magnitude;
      let points  = p2pJsonNewPart.points;

      let sclList = [70,60,55,50,45,40,30,20,10];
      let repCnt  = 2;
      let vol     = 1.0;
      let chimeUrl = this.chimeUrl;

      str += `　　　　　　■　地震速報　■<br>　<br>`
      str += `${time}ごろ、`
      if(epicent){
        str += `${epicent}で`
      }else{
        epicent = "調査中";
      }
      str += `<br>地震がありました。<br>`;
      str += `震源地は${epicent}<br>`;
      if(depth)   str += `深さ${depth}　`;
      if(magunit)  str += `マグニチュード${magunit}`;
      str += `<br>`;
      if(maxScl >= 40 || magunit >= 5){
        str += "揺れが大きかったため、海岸付近の地域では<br>今後の津波の情報に注意してください。<br>";
      }

      sclList.forEach(scl => {
        let theSclAddrStr = `震度${this.parseShindo(scl)}　`;
        points.forEach(p => {
          if(scl == p.scale){
            let theSclAddrList = theSclAddrStr.split("<br>");
            if(theSclAddrList[theSclAddrList.length-1].length + p.addr.length > lineCharNum){
              theSclAddrStr += `<br>震度${this.parseShindo(scl)}　`
            }
            theSclAddrStr += `${p.addr}　`;
          }
        });
        if(theSclAddrStr != `震度${this.parseShindo(scl)}　`){
          str += `${theSclAddrStr}<br>`;
        }
      });

      console.log(str.replace(/<br>/g,"\n"));
      let strList = str.split("<br>");
      for(let i = 0;i < (strList.length);i += 2){
        if(strList[i+1] && strList[i].slice(0,4) == strList[i+1].slice(0,4)){
          strList[i+1] = "　　　　" + strList[i+1].slice(4);
        }
      }

      this.chimes.forEach(c => {
      	if(c.scale == maxScl){
      	  vol = c.volume;
          chimeUrl = c.url;
      	}
      });


      this.showTelop(strList, repCnt, chimeUrl, vol);
    }catch(e){
      console.log(e);
      this.run();
    }
  }

  showTelop(strList, repCnt= 2, chimeUrl, vol=1.0){
    this.stop();
    document.getElementById("quakeInfoTelop").style.display = "flex";
    this.playChime(chimeUrl, vol);
    for(let i = 0;i < (strList.length);i += 2){
      let showPart = () => {
        let s = strList[i] + "<br>";
        if(strList[i+1]) s += strList[i+1];
        document.getElementById("quakeInfoTelop").innerHTML = s;
      };
      
      for(let rep = 0;rep < repCnt;rep ++){
        setTimeout(showPart, (i + (strList.length * rep)) * this.dispDur * 1000);
      }
      setTimeout(showPart, this.dispDur * 1000 * i);
    }

    setTimeout(() => {
        document.getElementById("quakeInfoTelop").innerHTML = "";
        document.getElementById("quakeInfoTelop").style.display = "none";
        this.run();
      },this.dispDur*1000*(strList.length * repCnt));
  }
  
  playChime(url, vol=1.0){
    var audio = new Audio();
    if(url){
      audio.src = url;
    }else{
      audio.src = this.chimeUrl;
    };
  	audio.volume = vol;
    audio.play();
  }
}
