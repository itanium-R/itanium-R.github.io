const vm = new Vue({
  el: '#settingSec',
  data: {
    pages: []
  },
  methods: {
    load: function(){
      this.pages = pages;
    },
    addPage: function(){
      let newPage = {
        "url"      : "https://github.com/",
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
      localStorage.setItem('pages', pagesJson);
      reload();
    },
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