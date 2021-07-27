let body = document.querySelector('body');
let word3d = new function(){
    this.mchars = 0;
    this.word = [];
    this.wordInd = 0;
    this.spinBox =(elem,maxwords)=>{
        let sides = Array.prototype.slice.call(elem.side);
    
    
        for(let i=0;i<sides.length;i++){
            if(sides[i].dataset.index == 1){
                sides[i].dataset.index = maxwords+1;
                sides[i].classList.add('down');
                sides[i].classList.remove('current');
                setTimeout(()=>{
                    sides[i].classList.remove('down');
                },900)
                break;
            }
            
        }
        for(let i=0;i<sides.length;i++){
            sides[i].dataset.index--;
            if(sides[i].dataset.index == 1){
                sides[i].classList.add('current');
            }
        }
    }

    this.nextWord = ()=>{
        let p = [];
        this.wordInd++;
        if(this.wordInd>this.word.length-1){
            this.wordInd = 0;
        }
        document.querySelector('title').innerText = `${this.word[this.wordInd]}`;
        this.box.forEach((el,i)=>{
            
            p[i] = new Promise((resolve)=>{
                setTimeout(()=>{
                    this.spinBox(el,this.box[i].side.length);
                    resolve();
                },100*i)
                
            });
        });
        
        Promise.all(p).then(()=>{
            
            setTimeout(()=>{
                this.nextWord()
                
            },1000)
        })
    }

    this.init = (elem,words)=>{
        this.mchars = words[0].length;
        this.mainElem = document.createElement('main');
        this.mainElem.classList.add('word3d');
        this.box = [];
        this.word = words;
        this.wordInd = 0;
        document.querySelector('title').innerText = `${this.word[this.wordInd]}`;
        elem.appendChild(this.mainElem);
        for(let i=0;i<this.mchars;i++){
            
            this.box.push(document.createElement('ul'));
            this.box[i].classList.add('box');
            this.box[i].side = [];
            this.mainElem.appendChild(this.box[i])
            for(let j=0;j<words.length;j++){
                
                this.box[i].side.push(document.createElement('li'));
                
                this.box[i].side[j].classList.add('side');
                if(j==0){
                    this.box[i].side[j].classList.add('current');
                }
                this.box[i].side[j].dataset.index = j+1;
                this.box[i].side[j].innerHTML = words[j][i];
                this.box[i].appendChild(this.box[i].side[j]);
                
            }
        }
    }
}


word3d.init(body,["ЕБАТЬ","ПИЗДА","НАХУЙ","ЧТОЗА","ХУИТА","БЛЯТЬ", "АВОВА" ]);
setTimeout(()=>{
    word3d.nextWord();
},1000);
