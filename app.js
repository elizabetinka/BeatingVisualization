let A = 1;
let frec1= 2.4;
let frec2= 2.5;





const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );


let A_text = document.getElementById("A_id");
let frec1_text = document.getElementById("frec1_id");
let frec2_text = document.getElementById("frec2_id")

let timeT = document.getElementById("timeT");
let time = document.getElementById("time");


let resultButton = document.getElementById('result');

showMessage(A,frec1,frec2,null);


time.addEventListener("input", function(e){
    Tset = Number(time.value);
    timeT.innerHTML = "Время t(c): " + Tset;
    showMessage(A,frec1,frec2,Tset);
});


function GetOrdinaryY(A,frec,t){
    return A*Math.cos(frec*t)
}
function GetSummaryYEqls(A,frec1,frec2,t){
    return 2*A*Math.cos(frec1*t);
}
function GetSummaryY(A,frec1,frec2,t){
    let dw = frec2-frec1;
    return 2*A*Math.cos(dw*t/2)*Math.cos(frec1*t/2);
}
function showMessage(A,frec1,frec2,Tset) {
    let masst = [];
    let massyY1= [];
    let massyY2= [];
    let massyY12= [];
    let dw = Math.max(frec1,frec2)-Math.min(frec1,frec2);
    let T;
if (Tset==null){
    if (dw == 0){
        T = 2*Math.PI/frec1;
    }
    else{
        T = 2*Math.PI/dw;
    }
    T*=5;
    time.value = T;
    timeT.innerHTML = "Время t(c): " + T;
}
else{
    T = Tset;
}

    for (let t =0; t<T; t +=0.1){
        masst.push(t)
        //console.log("t " +t+" T: "+T)
       massyY1.push(GetOrdinaryY(A,frec1,t));
       massyY2.push(GetOrdinaryY(A,frec2,t));
       if (dw != 0){
        massyY12.push(GetSummaryY(A,Math.min(frec1,frec2),Math.max(frec1,frec2),t));
       }
       else{
        massyY12.push(GetSummaryYEqls(A,Math.min(frec1,frec2),Math.max(frec1,frec2),t));
       }
       
    }

    var result ={
        x: masst,
        y: massyY1,
        name: 'I',
        mode:'lines', line: {color: "#04BBEC"}
    };
    var result2 ={
        x: masst,
        y: massyY2,
        name: 'II',
        mode: 'lines', line: {color: "#FF82F4"}
    };
    var result3 ={
        x: masst,
        y: massyY12,
        name: 'I+II',
        mode: 'lines', line: {color: "#4740acbc"}
    };
    
    var baseLayout = {
        title: 'Сложение однонаправленных колебаний с близкими частотами',
        autosize: true,
        /*height: 300,
        width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'x',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };


    Plotly.react( 'tester', [result,result2,result3], baseLayout );
   
}

resultButton.onclick = function(){
    A = A_text.value;
    frec1 = frec1_text.value;
    frec2 = frec2_text.value;
   
    if (A < 0 || frec1<0 || frec2 < 0 ){
        alert("Значения не могут быть отрицательными!")
    }
    if (Math.abs(frec2-frec1) >= frec1 || Math.abs(frec2-frec1) >= frec2){
        alert("Частоты должны быть близкими")
    }
    else{
        //console.log("L: ", L, " L_1: ",L_1, "beta: ", beta , "m: ", m);
        showMessage(A,frec1,frec2,null);
    }

    
}