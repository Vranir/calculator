//operators and operand vars
let operand1=0;
let operand2=0;
let opmem=null; 
let opr=null;
let oprDone=false;
let justDidEq=false;
let history="";


//link stuff
let dspl=document.querySelector('#dsp');
let bdo=document.querySelector('#dspopr');
const hwindow=document.querySelector('.log')


//basic arithmetic
function add(x,y) {
	return x+y;
};

function subtract(x,y) {
	return x-y;
};

function multiply(x,y){
    return x*y;
};

function divide(x,y){
    if(y==0){
        alert('Oh no you dont');
        return 0;        
        }
    else return x/y;
};


function popDsp(x){    
    if (dspl.textContent[0]=="0")  dspl.textContent=dspl.textContent.slice(1,);
    if (oprDone) {
        dspl.textContent=String(x); 
        oprDone=false;}
    else {
        dspl.textContent=dspl.textContent+String(x);        
    }  
}

//ad listeners
//add digit listeners
const btns=document.querySelectorAll('.digit'); 

btns.forEach((btn) => {
    btn.addEventListener('click', () => {        
        let numb=btn.textContent;
        if(justDidEq){            
            operand1=0            
            history=history+"CE<br>";
            hwindow.innerHTML=history;
            oprDone=true;
        }        
        popDsp(numb); 
        justDidEq=false;       
    });
});

//addMinusListener
const mbtn=document.querySelector('#pm');
mbtn.addEventListener('click', ()=>{    
    if (dspl.textContent[0]=='-'){
        dspl.textContent=dspl.textContent.slice(1,);
    } 
    else{
        dspl.textContent='-'+dspl.textContent;
    } 
});

//addDotLisener
const dbtn=document.querySelector('#dot');
dbtn.addEventListener('click', ()=>{       
    dspl.textContent=dspl.textContent+".";
});

//add c/ce listeners
//ce resets everything
const btn=document.querySelector('#ce');
btn.addEventListener('click', ()=>{    
    dspl.textContent=0;
    operand1=0;
    operand2=0;    
    opr=null;
    opmem=null;
    oprDone=false;
    justDidEq=false;
    history=history+"CE<br>";
    hwindow.innerHTML=history;
    bdo.textContent=op;
});
//c is just a backspace
const btn3=document.querySelector('#c');
btn3.addEventListener('click', ()=>{    
    dspl.textContent=dspl.textContent.slice(0,dspl.textContent.length-1);
});
//clrlog
const btn4=document.querySelector('#cl');
btn4.addEventListener('click', ()=>{    
    hwindow.innerHTML='...';
});
//calc function
function calculate(mem,mem2,opl){     
    let res=opl(mem,mem2).toFixed(2); //calc
    oprDone=true; //set display flag
    popDsp(res);  //display result 
    //pop history
    history=history+String(mem2)+" = " + String(res) +"<br>";
    hwindow.innerHTML=history;
    //reset operator window    
    bdo.textContent=" ";    
   
}

//add +-*/ operators
const btns2=document.querySelectorAll('.opr'); //add op listeners
btns2.forEach((btn) => {
    btn.addEventListener('click', () => { 
        
        //pick operation  
        let op=btn.textContent;            
        switch(op){
            case "+":
                opr=add;
                break;
            case "-":
                opr=subtract;
                break;
            case "*":
                opr=multiply;
                break;
            case "/":
                opr=divide;
                break;
        } 
        //pop op display        
        bdo.textContent=op;

        //first click case
        if (operand1==0&&opmem==null){
            operand1=parseFloat(dspl.textContent);
            opmem=opr;
            //pop history
            history=history+String(operand1)+" "+op+" ";
            hwindow.innerHTML=history;
            //clear display
            dspl.textContent="0";
        }
        //memory full (digit and operator)
        else if(operand1!=0&&opmem!=null){
            operand2=parseFloat(dsp.textContent);
            console.log(operand2)
            calculate(operand1,operand2,opmem);
            opmem=opr;
            operand1=parseFloat(dsp.textContent);
            operand2=0;
            //pop history
            history=history+String(operand1)+" "+op+" ";
            hwindow.innerHTML=history;
            //clear display
            dspl.textContent="0";
        }
        else if(operand1!=0&&opmem==null){              
            opmem=opr; 
            history=history+String(operand1)+" "+op+" ";
            hwindow.innerHTML=history;
            //clear display            
            dspl.textContent="0";                          
        } 
        justDidEq=false;   
    });

});


//add equals listener
const btn2=document.querySelector("#eql");
btn2.addEventListener('click', ()=>{
    if(opmem){        
        operand2=parseFloat(dspl.textContent);
        calculate(operand1,operand2,opmem);
        opmem=null; 
        operand1=parseFloat(dspl.textContent);;
        operand2=0;
        justDidEq=true;
    }      
});








