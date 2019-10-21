/* ----------------------------------------------------------------
    fullScSlider.js
    (c) itanium-R 2019

    @param elmList    フルスクリーンなdivやiframeのElementを格納した配列
    @param slideDur   スライドする間隔[秒]
    @param slideSpeed スライドする速度[推奨:1~10 標準:5]

    ※フルスクリーンな要素作成には以下のCSSを利用         
        .fullSc{
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            border:0;
        }
---------------------------------------------------------------- */
class FullScSlider{
  constructor(elmList,slideDur,slideSpeed){
    this.posX = 0;
    this.slideStepInterval = null;
    slideDur   ? this.slideDur = (slideDur * 1000)  : this.slideDur = 10000;
    slideSpeed ? this.stepDur  = (100 / slideSpeed) : this.stepDur = 20;
    this.stepIncrem = 1;  
    this.elmList = elmList;
    for(var i=1;i<this.elmList.length;i++){
    this.elmList[i].style.transform = `translateX(${i}00vw)`;
    }
    this.posXmax = (this.elmList.length - 1) * 100;
    if(elmList.length>1){
      setInterval(()=>{this.slide()},this.slideDur+(this.stepDur*100/this.stepIncrem));
    }
  }

  slide(){
    this.preFrameIndex = parseInt(this.posX/100);
    console.log(this.preFrameIndex);
    if(!this.slideStepInterval) this.slideStepInterval = setInterval(()=>{this.slideStep()},this.stepDur);
  }
    
  slideStep(){
  this.posX += this.stepIncrem;
      
    if(this.posX <= this.posXmax){  
      for(var i=this.preFrameIndex;i<=this.preFrameIndex+1;i++){
        this.elmList[i].style.transform = `translateX(${i*100-this.posX}vw)`;
      }   
    }else{
      this.elmList[0].style.transform = `translateX(${this.posXmax+100-this.posX}vw)`;
      var i = this.preFrameIndex;
      this.elmList[i].style.transform = `translateX(${i*100-this.posX}vw)`;
    }
    if(this.posX % 100 == 0){
        clearInterval(this.slideStepInterval);
        this.slideStepInterval = null;
    }
    if(this.posX >= this.posXmax+100){
      this.posX=0;
    }
  }
}