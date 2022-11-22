var winCondition;

var row = 3;
var col = 3;
var currTile;//current tile that is selected
var refTile;// tile that is targeted to swap with
var turns = 0;
var round=0;
var soloutionOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var a = [];
var b = [];
var empty;

//HTML TAGS
var start = document.getElementById("start");
var cT=document.getElementById('turns');
var pT=document.getElementById('pturns');
var rT=document.getElementById('round');
var phT=document.getElementById('p-hr');
var pmT=document.getElementById('p-min');
var psT=document.getElementById('p-sec');







//deletechild
function deleteChild() {

    $('#board img').map(function () {
        $(this).remove();
    });
}


$(".button-19").click(function () {

    deleteChild();
    var soloutionOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    imageorder = soloutionOrder;
    //imageorder = soloutionOrder.sort(() => Math.random() - 0.5);
    for (let i = 0; i < row * col; i++) {

        // Find row and column index
        let r = parseInt(i / col, 10);
        let c = i % col;


        let tile = document.createElement('img');

        tile.id = r.toString() + '-' + c.toString();

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




function togglePopup() {
    $(".content").toggle();
}

function dragStart() {
    currTile = this;

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

    $('#board img').map(function () {


        a.push(this.src)

        b.push(this.id);
        console.log(a);
        console.log(b)


    });

    winCondition =
        a[0].includes("1.svg") && b[0] == "0-0"
        && (a[1].includes("2.svg") && b[1] == "0-1")
        && (a[2].includes("3.svg") && b[2] == "0-2")
        && (a[3].includes("4.svg") && b[3] == "1-0")
        && (a[4].includes("5.svg") && b[4] == "1-1")
        && (a[5].includes("6.svg") && b[5] == "1-2")
        && (a[6].includes("7.svg") && b[6] == "2-0")
        && (a[7].includes("8.svg") && b[7] == "2-1")
        && (a[8].includes("9.svg") && b[8] == "2-2")

    a = [];
    b = [];
    console.log(a);
    console.log(b)

}


function dragEnd() {

    if (!refTile.src.includes("9.svg")) {
        return;
    }
    let currCoords = currTile.id.split("-");


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

        if (currTile.src.includes("9.svg") && currTile.id == '2-2') {
            checkChild();
        

            if (winCondition) {
                round=round+1;
                store();
                set();
                togglePopup();
                //alert('You won')


            }else{
                round=0;
                myStorage.setItem('Round',round);

            }
        }
    }
}


//KEY BOARD


window.addEventListener('keydown', function (e) {

    if (((empty.id == "0-0" || empty.id == "1-0" || empty.id == "2-0") && e.key == "ArrowLeft")) {
        return;
    }if (((empty.id == "0-2" || empty.id == "1-2" || empty.id == "2-2") && e.key == "ArrowRight")) {
        return;
    }if (((empty.id == "0-0" || empty.id == "0-1" || empty.id == "0-2") && e.key == "ArrowUp")) {
        return;
    }if (((empty.id == "2-0" || empty.id == "2-1" || empty.id == "2-2") && e.key == "ArrowDown")) {
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
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;
            turns = turns + 1;
            cT.innerHTML = turns;
            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();
                if (winCondition) {
                    round = round + 1;
                    store();
                    set();
                    togglePopup();
                    console.log('you won')

                }else{
                    round=0;
                    myStorage.setItem('Round',round);
    
                }
            }
            break;

        case "ArrowRight":
            var newId = (r).toString() + '-' + (c + 1).toString();
            var ref;
            ref = this.document.getElementById(newId);
            var refimg = ref.src;;
            var emptysrc = empty.src;
            var refid = ref.id;
            var emptyId = empty.id;
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;
            turns = turns + 1;
            cT.innerHTML = turns;
            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();
                if (winCondition) {
                    round=round+1
                    store();
                    set();
                    togglePopup();
                    console.log('you won')

                }else{
                    round=0;
                    myStorage.setItem('Round',round);
    
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
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;


            turns = turns + 1;
            cT.innerHTML = turns;
            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();

                if (winCondition) {
                    round = round + 1;
                    store();
                    set();
                    togglePopup();
                   

                }else{
                    round=0;
                    myStorage.setItem('Round',round);
    
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
            empty.src = refimg;
            ref.src = emptysrc;
            empty = ref;



            turns = turns + 1;
            cT.innerHTML = turns;

            if (empty.src.includes("9.svg") && empty.id == '2-2') {
                checkChild();

                if (winCondition) {
                  
                    round = round + 1;
                    store();
                    set();
                    togglePopup();
                }else{
                    round=0;
                    myStorage.setItem('Round',round);
    
                }
            }
            break;
        default:
            break;



    }
})


function store(){
    myStorage.setItem('turn', turns);
    myStorage.setItem('Round',round);
    myStorage.setItem('hr',hour);
    myStorage.setItem('min',minute);
    myStorage.setItem('sec',second);}
    
    
    function set(){
    
    pT.innerHTML=myStorage.getItem('turn');
    phT.innerHTML =myStorage.getItem('hr');
    psT.innerHTML = myStorage.getItem('min');
    psT.innerHTML = myStorage.getItem('sec');
    rT.innerHTML=myStorage.getItem('Round')
    
       
    
    }
    