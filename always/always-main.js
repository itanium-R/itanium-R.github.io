var pages =  pages || JSON.parse(localStorage.getItem("pages")) ||  
[{"url" : "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=w&area=333&NS=S","iframeId" : "wth1","reloadDur": 0},
 {"url" : "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=w&area=334&NS=S","iframeId" : "wth2","reloadDur": 0},
 {"url" : "https://itanium-r.github.io/memorandum/schoolWatch.html","iframeId" : "sw","reloadDur": 0}];

var tickerProp = tickerProp || JSON.parse(localStorage.getItem("tprop")) || 
                  {
                    "title"     : "TICKER",
                    "url"       : "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=json_test",
                    "reloadDur" : 0,
                    "fieldName" : "msg",
                  };

var isClockBig         = isClockBig         || localStorage.getItem("isBCl") || false;
var usesP2pQuakeNotice = usesP2pQuakeNotice || localStorage.getItem("usP2p") || false;

function parseFlg(a){
  if(a === "true")  a = true;
  if(a === "false") a = false;
  return a;
}

isClockBig         = parseFlg(isClockBig);
usesP2pQuakeNotice = parseFlg(usesP2pQuakeNotice);

if(usesP2pQuakeNotice){
  var p2pQL;
  setTimeout(() =>  {        
      p2pQL = new p2pQuakeListener(3,3);
      p2pQL.run();
    },2500); // 起動直後の負荷対策・ロード時間差対策で少し時間をおいてから起動
}


function loadIframe(page){
  window.open(page.url,page.iframeId);
  if(page.reloadDur > 0){
    setInterval(()=>{window.open(page.url,page.iframeId)}, page.reloadDur*1000);
  }
}

window.onload = function(){
  slideDur = getParam("slideDur");
  if(!slideDur) slideDur = 10;

  var mainFrames = [];

  var body = document.getElementsByTagName("body")[0];

  for(page of pages){
    let iframe  = document.createElement("iframe");
    iframe.id   = iframe.name = page.iframeId;
    iframe.className = "fullSc";
    body.appendChild(iframe);
    loadIframe(page);
    mainFrames.push(document.getElementById(page.iframeId));
  }
  
  if(mainFrames.length > 1) new FullScSlider(mainFrames,slideDur,5);
};

function getParam(name) {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function reload(){
  window.open(location.href,"_top");
}