function ElmId(id){
  return document.getElementById(id); 
}

const vm = new Vue({
  el: '#favorite',
  data: {
    FavoData: []
  },
  methods: {
    addFavorite: function(newLang,newSentence){
      this.deleteFavorite(newSentence); // 被りは消す
      this.FavoData.push({
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
      ElmId("fromLang").value = favo.lang;
      ElmId("input").value    = favo.sentence;
      execTrans();
    }
  },
  mounted: function(){
    this.loadFavorite();
  },
})
