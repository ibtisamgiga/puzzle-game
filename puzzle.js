var winCondition;

console.log('hello')
var second=0;
var minute=0;
var hour=0;
var row = 3;
var col = 3;
var currTile;//current tile that is selected
var refTile;// tile that is targeted to swap with
var turns = 0;
var soloutionOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var a = [];
var b = [];
var round=0;
var watch = false;
var myStorage=window.localStorage;
var rmd=0;
rmd=round;
var imageorder = soloutionOrder.sort(() => Math.random() - 0.5)
var start = document.getElementById("start");
console.log(start)
var cT=document.getElementById('turns');
var pT=document.getElementById('pturns');
var Rt=document.getElementById('round');



Rt.innerHTML=myStorage.getItem('Round');
//myStorage.setItem('Round',round);
function deleteChild() {

    $('#board img').map(function () {
        $(this).remove();
    });
}

var empty;

$("button").click(function () {
  
 
    
    watch = true;
    deleteChild();
    var soloutionOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
   imageorder =['1', '2', '3', '4', '5', '6', '7', '9','8'];
 //imageorder = soloutionOrder.sort(() => Math.random() - 0.5);
    for (let i = 0; i < row * col; i++) {

        // Find row and column index
        let r = parseInt(i / col, 10);
        let c = i % col;


        let tile = document.createElement('img');


        tile.id = r.toString() + '-' + c.toString();
        console.log(tile.id);
        tile.height = "118px"
        tile.width = "118px"
        tile.src = imageorder.shift() + '.svg';
        if (tile.src.includes("9.svg")) {
            //tile.class="empty";
            empty = tile;


        }


        //drag functionality
        document.getElementById("board").appendChild(tile);
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);






    }


}
    //}
)

 function set(){
    pT.innerHTML=myStorage.getItem('turn');
    document.getElementById('p-hr').innerHTML =myStorage.getItem('hr');
    document.getElementById('p-min').innerHTML = myStorage.getItem('min');
    document.getElementById('p-sec').innerHTML = myStorage.getItem('sec');
    Rt.innerHTML=myStorage.getItem('Round')
 }

   
   
      
   
   


   window.addEventListener("load", (event) => {
    set()
  });
  

window.addEventListener('keydown', function (e) {





    if (((empty.id == "0-0" || empty.id == "1-0" || empty.id == "2-0") && e.key == "ArrowLeft")) {
        return;
    }

    if (((empty.id == "0-2" || empty.id == "1-2" || empty.id == "2-2") && e.key == "ArrowRight")) {
        return;
    }

    if (((empty.id == "0-0" || empty.id == "0-1" || empty.id == "0-2") && e.key == "ArrowUp")) {
        return;
    }
    if (((empty.id == "2-0" || empty.id == "2-1" || empty.id == "2-2") && e.key == "ArrowDown")) {
        return;
    }


    var currCoords = empty.id.split("-");
    var r = parseInt(currCoords[0]);
    var c = parseInt(currCoords[1]);

    switch (e.key) {
        case "ArrowLeft":
            console.log('arrow left')
            console.log(currCoords)

            var newId = (r).toString() + '-' + (c - 1).toString();
            var ref;
            ref = this.document.getElementById(newId);
            var refimg = ref.src;;
            var emptysrc = empty.src;
            var refid = ref.id;
            var emptyId = empty.id;

            //    empty.id=refid;
            //    ref.id=emptyId;
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;


            turns=turns+1;
            cT.innerHTML=turns;


            console.log("left");
            //console.log(empty.id);

            console.log(empty.id);
            console.log(empty.src);
            console.log(ref.id);
            console.log(empty.src);
            console.log(ref.src);

    



            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();

                if (winCondition) {
                     
                    round=round+1;
                    store()
                    togglePopup();
                    //alert('You won')
                    console.log('you won')

                }
            }
            //console.log(c);





            break;
        case "ArrowRight":
            var newId = (r).toString() + '-' + (c + 1).toString();
            var ref;
            ref = this.document.getElementById(newId);
            var refimg = ref.src;;
            var emptysrc = empty.src;
            var refid = ref.id;
            var emptyId = empty.id;

            //    empty.id=refid;
            //    ref.id=emptyId;
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;

        turns=turns+1;
        cT.innerHTML=turns;





            console.log("left");
            //console.log(empty.id);

            console.log(empty.id);
            console.log(ref.id);
            //console.log(c);


            console.log("right");

   

            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();

                if (winCondition) {
                     
                    round=round+1;
                    store()
                    togglePopup();
                    //alert('You won')
                    console.log('you won')

                }
            }
            break;
        case "ArrowUp":
            var newId = (r - 1).toString() + '-' + (c).toString();
            var ref;
            ref = this.document.getElementById(newId);
            var refimg = ref.src;;
            var emptysrc = empty.src;
            var refid = ref.id;
            var emptyId = empty.id;

            //    empty.id=refid;
            //    ref.id=emptyId;
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;


            turns=turns+1;
            cT.innerHTML=turns;
            


            console.log("left");
            //console.log(empty.id);

            console.log(empty.id);
            console.log(ref.id);
            //console.log(c);


            console.log("UP");

    

            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();

                if (winCondition) {
                    round=round+1;
               store()
                    togglePopup();
                    //alert('You won')
                    console.log('you won')

                }
            }
            break;
        case "ArrowDown":
            var newId = (r + 1).toString() + '-' + (c).toString();
            var ref;
            ref = this.document.getElementById(newId);
            var refimg = ref.src;;
            var emptysrc = empty.src;
            var refid = ref.id;
            var emptyId = empty.id;

            //    empty.id=refid;
            //    ref.id=emptyId;
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;



            turns=turns+1;
            cT.innerHTML=turns;


            console.log("left");
            //console.log(empty.id);

            console.log(empty.id);
            console.log(ref.id);
            //console.log(c);


            console.log("Down");

   
            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();

                if (winCondition) {

                    
                        round=round+1;
                   store()
                    
                    togglePopup();
                    //alert('You won')
                    console.log('you won')

                }
            }
            break;
        default:
            break;



    }
})







// function keyDown() {
//     console.log(this.id)
//     console.log(this.src)

// }

function togglePopup() {
    $(".content").toggle();
}

function dragStart() {
    currTile = this;
    console.log(currTile)

}
function dragOver(e) {
    e.preventDefault();

}

function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {

}
function dragDrop() {
    refTile = this;

}

function checkChild() {
    console.log(a)

    $('#board img').map(function () {
        console.log(this.id);
        a.push(this.src)
        console.log(this.src);
        b.push(this.id);

    });
    console.log(a)
    console.log(b)
    winCondition =
       ( a[0].includes("1.svg") && b[0] == "0-0")
        && (a[1].includes("2.svg") && b[1] == "0-1")
        && (a[2].includes("3.svg") && b[2] == "0-2")
        && (a[3].includes("4.svg") && b[3] == "1-0")
        && (a[4].includes("5.svg") && b[4] == "1-1")
        && (a[5].includes("6.svg") && b[5] == "1-2")
        && (a[6].includes("7.svg") && b[6] == "2-0")
        && (a[7].includes("8.svg") && b[7] == "2-1");
       // && (a[8].includes("9.svg") && b[8] == "2-2")
       
       b=[];
       a=[];

}


function dragEnd() {
   

    if (!refTile.src.includes("9.svg")) {
        return;
    }


    let currCoords = currTile.id.split("-");


    console.log("current coords:::");
    console.log(currCoords);

    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let refCoords = refTile.id.split("-");
    let r2 = parseInt(refCoords[0]);
    let c2 = parseInt(refCoords[1]);

    let moveRow = r == r2 && (c2 == c - 1 || c2 == c + 1);
    let moveCol = c == c2 && (r2 == r - 1 || r2 == r + 1);

    let isAdjacent = moveRow || moveCol;
    if (isAdjacent) {

        let curImg = currTile.src;
        let refImg = refTile.src;
        currTile.src = refImg;
        refTile.src = curImg;
        empty = currTile;


        turns=turns+1;
        cT.innerHTML=turns;
        //pT.innerHTML=pturns;


        if (currTile.src.includes("9.svg") && currTile.id == '2-2') {
            checkChild();
            

            if (winCondition) {
                round=round+1;
               
                togglePopup();
                //alert('You won')
                store();
                console.log('you won')

            }
            //else{
            //     round=0;
            //     myStorage.setItem('Round',round);

            // }
        }
    }
}
function store(){
myStorage.setItem('turn', turns);
myStorage.setItem('Round',round);
myStorage.setItem('hr',hour);
myStorage.setItem('min',minute);
myStorage.setItem('sec',second);}




$(".set").click(function () {
   // winCondition=false;
    if(!winCondition){
        alert("you have not clear previos round")
    }
    
    store();
    set()
    turns=0;
    cT.innerHTML=turns;
    second=0;

})

//Stpowatch
window.setInterval(function timer() {
   if(watch){ second++;
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
        hour++;
        minute = 0;
        second = 0;
    }
    if(second == 60){
        minute++;
        second = 0;
    }
    if(minute == 60){
        hour++;
        minute = 0;
        second = 0;
    }
    let hrString = hour;
    let minString = minute;
    let secString = second;

    if (hour < 10) {
        hrString = "0" + hrString;
    }

    if (minute < 10) {minString = "0" + minString;
}

if (second < 10) {
    secString = "0" + secString;
}


document.getElementById('hr').innerHTML = hrString;
document.getElementById('min').innerHTML = minString;
document.getElementById('sec').innerHTML = secString;}

},1000) 