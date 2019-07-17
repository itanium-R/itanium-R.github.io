var isWaiting = false,
    speaks    = false;
  
function ElmId(id){
  return document.getElementById(id); 
}

function clearTextareas(){
  ElmId("input").value        = "";
  ElmId("translated").value   = ""; 
  ElmId("retranslated").value = "";
}
    
var transRequest = new XMLHttpRequest();
transRequest.responseType = 'json';

transRequest.onload = function () {
  var data = this.response;
  console.log(data);
  ElmId("translated"  ).value = data.translatedText;
  ElmId("retranslated").value = data.retranslatedText;
  if(speaks){
    speak(data.translatedText);
    speaks=false;
  }
};

// 翻訳実行
function execTrans(){
  let text     = ElmId("input").value;
  if(text==""){ // 未入力ならAPIは叩かない
    clearTextareas();
    return 0;
  }
  let fromLang = ElmId("fromLang").value;
  let toLang   = ElmId("toLang").value;
  if(fromLang == toLang){ // 同じ言語には翻訳できないので翻訳先言語変更
    let defLang                  = "ja";
    if(toLang == defLang)defLang = "en";
    ElmId("toLang").value = defLang;
    toLang  = defLang;
  }
  text      = encodeURIComponent(text);
  
  let url = "https://script.google.com/macros/s/"+
            "AKfycbz1e0JapH5dWB0LNI58Rs6xKhIBjmihigdFomU7HH61VLabbVs/"+
            "exec?text="+text+"&fromLang="+fromLang+"&toLang="+toLang;
  transRequest.open("GET",url, true);
  transRequest.send();

  history.replaceState("","","?fromLang="+fromLang+"&toLang="+toLang+"&input="+text);
}

// 負荷対策：自動リアルタイム翻訳は1秒以上間隔をあける
function autoTrans(){
  if(!isWaiting){
    isWaiting = true;
    setTimeout(autoExecTrans,1000);
  }
}
function autoExecTrans(){
  isWaiting = false;
  execTrans();
  console.log("Trans Execute Start");
}

// 音声認識
try{
  var recognition = new webkitSpeechRecognition() || 
                    new SpeechRecognition();
  recognition.onresult = function(event){
    if(event.results.length > 0){
      ElmId("input").value = event.results[0][0].transcript;
      ElmId("recButton").value = "音声入力";
      execTrans();
      speaks=true;
    }else{
      ElmId("recButton").value = "認識失敗...";
    }
    recognition.stop();
  }
  recognition.onaudiostart = function(){
    ElmId("recButton").value ="音声入力中...";
  }
  recognition.onspeechstart = function(){
    ElmId("recButton").value ="音声認識中...";
  }
  recognition.onend = function(){
    if(ElmId("recButton").value =="音声認識中...")
      ElmId("recButton").value = "認識失敗...";
  }
}catch(e){
  console.log(e);
}

function micRecStart(){
  recognition.lang = ElmId("fromLang").value;
  recognition.start();
  ElmId("recButton").value ="マイク入力許可してください";
}

// 音声合成
try{
  var uttr = new SpeechSynthesisUtterance();
}catch(e){
  console.log(e);
}
function speak(text){
  var text = text || ElmId("translated").value;
  uttr.text = text;
  uttr.lang = ElmId("toLang").value;
  speechSynthesis.speak(uttr);
}
function transByEnter(e){
  if(window.event.keyCode == 13)execTrans();
}
function swapLang(swapsInput){
  let fromLangElem   = ElmId("fromLang");
  let toLangElem     = ElmId("toLang");
  let tmpLang        = toLangElem.value;
  toLangElem.value   = fromLangElem.value;
  fromLangElem.value = tmpLang;
  if(swapsInput){
    let inputElem    = ElmId("input");
    inputElem.value  = ElmId("translated").value;
    execTrans();
  }
}
function replyMicRecStart(){
  swapLang();
  micRecStart();
}

// 閉じるボタン
function closeWindow(){
  window.open('','_self').close();
  window.close();
  setTimeout("alertCannotClose()",500);
}
function alertCannotClose(){
  alert("ブラウザを閉じようとしましたが失敗しました．"+
        "ブラウザの閉じるボタンを押して閉じてください．");
}

// section切り替え
function switchSection(id){
  ids=["main","favorite"]; // すべてのSectionを消す
  ids.forEach(aId => {
    ElmId(aId).style.display      = "none";
    ElmId("to"+aId).style.display = "inline-block";
  });
  ElmId(id).style.display      = "block";
  ElmId("to"+id).style.display = "none";
}

// URLパラメータ取得 cf)http://www-creators.com/archives/4463
function getParam(name) {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// onload
window.onload=function(){
  switchSection("main");
  if(getParam("showsCloseB")){
    ElmId("closeB").style.display = "inline-block";
  }
  // URLパラメータ読取
  let inputVal,fLangVal,tLangVal;
  if(fLangVal = getParam("fromLang")){
    ElmId("fromLang").value = fLangVal;
    console.log("URL param fLang :" + fLangVal);
  }
  if(tLangVal = getParam("toLang")){
    ElmId("toLang").value = tLangVal;
    console.log("URL param fLang :" + tLangVal);
  }
  if(inputVal = getParam("input")){
    ElmId("input").value = inputVal;
    console.log("URL param input:" + inputVal);
  }
  execTrans();
}