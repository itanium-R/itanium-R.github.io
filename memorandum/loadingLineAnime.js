class loadingLineAnime{
  constructor(dur = 1, divN = 50, h = 2, color="#C00"){
    this.dur        = dur;  // [s]
    this.divNum     = divN;
    this.lineHeight = h;    // [vw]
    this.lineColor  = color;
    this.init();
    this.initLineElm();
  }
  init(){
    this.targetPer  =  0;
    this.currentPer =  0;
    this.interv     = null;
    this.intervCnt  =  0;
  }
  setPer(per){
    this.targetPer = per;
    if(this.currentPer != this.targetPer){
      let diff = this.targetPer - this.currentPer;
      let step = diff / this.divNum;
      if(this.intervCnt > 0){
        clearInterval(this.interv);
        this.intervCnt = 0;
      }
      this.interv = setInterval(() => {
        if(this.intervCnt < this.divNum){
          this.currentPer -= (-step);
          this.intervCnt += 1;
          this.draw();
        }else{
          clearInterval(this.interv);
          this.intervCnt = 0;
          this.currentPer = this.targetPer;
          if(this.currentPer >= 1){
            this.hideLine();
          }
        }
      }, this.dur * 1000 / this.divNum); 
    };
  }
  showPer(){
    document.getElementById("perOut").value=this.currentPer;
  }
  draw(){
    this.showPer();
    this.lineElm.style.width = `${this.currentPer * 100}vw`;
  }
  
  initLineElm(){          
    let lineElm = document.getElementById("loadingLine");
    if(!lineElm){
      lineElm = document.createElement("div");
      lineElm.id = "loadingLine";
      try{
        document.getElementsByTagName("body")[0].appendChild(lineElm);
      }catch(e){
        console.log("[ERROR] Invalid Html File : " + e);
        return -1;
      }
    }
    lineElm = document.getElementById("loadingLine");
    
    lineElm.style.display    = "block";
    lineElm.style.zIndex     = "20" ;
    lineElm.style.position   = "fixed";
    lineElm.style.top        = "0";
    lineElm.style.left       = "0";
    lineElm.style.height     = `${this.lineHeight}vh`;
    lineElm.style.width      = "0";
    lineElm.style.backgroundColor = this.lineColor;
    
    this.lineElm = lineElm;
  }

  hideLine(){
    this.interv = setInterval(() => {
      if(this.intervCnt < this.divNum){
        this.lineElm.style.height = `${
          this.lineHeight - ((this.intervCnt / this.divNum) * this.lineHeight)
        }vh`;
        this.intervCnt += 1;
        this.draw();
      }else{
        clearInterval(this.interv);
        this.init();
        this.initLineElm();
      }
    });
  }

}
