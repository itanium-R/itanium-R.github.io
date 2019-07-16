const vm = new Vue({
  el: '#favorite',
  data: {
    FavoData: []
  },
  methods: {
    addFavorite: function(newLang,newSentence){
      if(!newSentence){
        alert("何も入力されていません\n");
        return -1;  
      }
      alert("お気に入り登録しました\n"+newSentence);
      this.deleteFavorite(newSentence); // 被りは消す
      this.FavoData.unshift({
        lang:     newLang,
        sentence: newSentence,
      });
      this.saveFavorite();
    },
    deleteFavorite: function(sentence){
      this.FavoData = this.FavoData.filter(function (item) {
        return item.sentence !== sentence;
      });
      this.saveFavorite();
    },
    saveFavorite: function(){
      localStorage.setItem('FavoData', JSON.stringify(this.FavoData));
    },
    loadFavorite: function(){
      this.FavoData = JSON.parse( localStorage.getItem('FavoData') );
      if( !this.FavoData ){
        this.FavoData = [];
      }
    },
    writeInput: function(favo){
      clearTextareas();
      ElmId("fromLang").value = favo.lang;
      ElmId("input").value    = favo.sentence;
      execTrans();
      switchSection("main");
    }
  },
  mounted: function(){
    this.loadFavorite();
  },
})
