class PresetLoader{
  constructor(){
    let presetName = document.getElementById("presetName").value;
    this.request   = new XMLHttpRequest();
    this.url       = "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=json_preset&preset=" + presetName;
    this.request.onreadystatechange = () => {
      if (this.request.readyState == 4 ){
        if(this.request.status != 200){
          console.log(this.request.status);
        }else{
          // 送信成功
          let pagesJson = JSON.parse(this.request.responseText);
          if(pagesJson.error){
            alert(pagesJson.error);
            return -1;
          }
          localStorage.setItem('pages', JSON.stringify(pagesJson.pages));
          localStorage.setItem('tprop', JSON.stringify(pagesJson.tprop));
          reload();
        }
      }
    }
    this.get();
  }
  get(){
    this.request.open('GET', this.url);
    this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.request.send();
  }
}


const vm = new Vue({
  el: '#settingSec',
  data: {
    pages: [],
    tickerProp: [],
  },
  methods: {
    load: function(){
      this.pages = pages;
      this.tickerProp = tickerProp;
    },
    addPage: function(){
      let newPage = {
        "url"      : "https://",
        "iframeId" : this.pages.length,
        "reloadDur": 0 
      };
      this.pages.push(newPage);
    },
    rmPage: function(){
      this.pages.pop();
    },
    saveAndReload: function(){
      let pagesJson = JSON.stringify(this.pages);
      let tpropJson = JSON.stringify(this.tickerProp);
      localStorage.setItem('pages', pagesJson);
      localStorage.setItem('tprop', tpropJson);
      reload();
    },
    loadPreset: function(){
      new PresetLoader();
    }
  },
  mounted: function(){
    this.load();
  },
});

function hideSettingSec(){
  document.getElementById("settingSec").style.display = "none";
}

function showSettingSec(){
  document.getElementById("settingSec").style.display = "flex";
}