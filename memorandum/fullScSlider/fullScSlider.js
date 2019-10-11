/* ----------------------------------------------------------------
    fullScSlider.js
    (c) itanium-R 2019

    @param : フルスクリーンなdivやiframeのElementを格納した配列

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
class fullScSlider{
    constructor(elmList){
        this.posX = 0;
        this.slideStepInterval = null;
        this.slideDur = 10000;
        this.stepDur = 20;
        this.stepIncrem = 1;  
        this.elmList = elmList;
        for(var i=1;i<this.elmList.length;i++){
        this.elmList[i].style.transform = `translateX(${i}00vw)`;
        }
        this.posXmax = (this.elmList.length - 1) * 100;
        setInterval(()=>{this.slide()},this.slideDur+(this.stepDur*100/this.stepIncrem));
    }

    slide(){
        if(!this.slideStepInterval) this.slideStepInterval = setInterval(()=>{this.slideStep()},this.stepDur);
    }
    
    slideStep(){
        this.posX += this.stepIncrem;
        for(var i=0;i<this.elmList.length;i++){
            this.elmList[i].style.transform = `translateX(${i*100-this.posX}vw)`;
        }
        if(this.posX % 100 == 0){
        clearInterval(this.slideStepInterval);
        this.slideStepInterval = null;
        }
        if(this.posX >= this.posXmax){
        this.elmList[0].style.transform = `translateX(${this.posXmax+100-this.posX}vw)`;
        }
        if(this.posX >= this.posXmax+100)this.posX=0;
    }
    }