var pages =  JSON.parse(localStorage.getItem("pages")) || pages || 
            [{"url" : "https://itanium-r.github.io/memorandum/schoolWatch.html","iframeId" : "id","reloadDur": 0}];


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