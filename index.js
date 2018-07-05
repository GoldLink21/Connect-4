const ROWS=6,COLS=7;
//6,7

var board=new Array(ROWS);

//For easy reference
const turns={RED:true, BLACK:false, NONE:undefined}

function playerString(){
    return (redTurn) ? "red":"black";
    /*
    if(redTurn) return "red"
    else return 'black'*/
}

var redTurn = turns.RED;
var canPlay=true;

OnClickEvent=function(){
    if(canPlay) addToCol(Number(String(this.id).substr(2)));
}

function init(){
    var restartButton=document.getElementById('restart');
    restartButton.onclick=restart;
    var background=document.createElement('div');
    background.id='background';
    document.body.appendChild(background);
    for(var i=0;i<board.length;i++){
        board[i]=new Array(COLS);
        const curRow = document.createElement('div');
        curRow.className='row ';
        background.appendChild(curRow);
        for(var j=0;j<board[i].length;j++){
            var curCol = document.createElement('div');
            curCol.className='col ';
            curCol.id=i+','+j
            curCol.addEventListener('click',OnClickEvent)
            curRow.appendChild(curCol);
        }
        
    }
}
init();

function restart(){
    for(var i=0;i<board.length;i++){
        board[i]=new Array(COLS);
        for(var j=0;j<board[i].length;j++){
            var curCol = document.getElementById(i+','+j)
            curCol.className='col ';
        }
    }
    updateBoard();
    document.getElementById('winDiv').style.visibility='hidden';
    canPlay=true;
}

function updateBoard(){
    for(var i=0;i<board.length;i++){
        for(var j=0;j<board[i].length;j++){
            var curEle = document.getElementById(i+','+j);
            if(board[i][j]!==undefined)
                if(!curEle.classList.contains(board[i][j]))
                    curEle.className+=' '+board[i][j];
        }
    }
}

function addToCol(col){
    for(var i=board.length-1;i>=0;i--){
        if(board[i][col]===undefined){
            board[i][col]=redTurn;
            changeTurn();
            return true;
        }
    }
    return false;
}

function changeTurn(){
    var end=false;
    updateBoard();
    var winDiv=document.getElementById('winDiv');
    var win=document.getElementById('win');
    if(checkWin()){
        win.innerText="Player "+playerString()+" has won!";
        end=true;
    }else if(checkTie()){
        win.innerText="It was a tie";
        end=true;
    }
    if(end){
        canPlay=false;
        winDiv.style.visibility="visible";
        return;
    }
    redTurn=!redTurn;
}

function checkWin(){
    if(checkCol()||checkRow()||checkDiagUp()||checkDiagDown()) return true;
    else return false;
}

function checkCol(){
    var count=0;
    var curPlayer=undefined;
    for(var col=0;col<board[0].length;col++){
    for(var i=board.length-1;i>=0;i--){
        if(board[i][col]!==undefined){
            if(board[i][col]===curPlayer){
                count++;
            }else{
                count=1;
                curPlayer=board[i][col];
            }
        }else{
            count=0;
            curPlayer=undefined;
        }if(count===4){
            console.log("column win");
            return true;
        }
    }}
    return false;
}

function checkRow(){
    var count=0;
    var curPlayer=undefined;
    for(var i=0;i<board.length;i++){
        for(var j=0;j<board[i].length;j++){
            if(board[i][j]!==undefined){
                if(board[i][j]===curPlayer){
                    count++;
                }else{
                    count=1;
                    curPlayer=board[i][j];
                }
            }else{
                curPlayer=undefined;
                count=0;
            }
            if(count===4){
                console.log('row win');
                return true;
            }
        }
    }
    return false;
}

function checkDiagUp(){
    var curPlayer=undefined;
    var count = 0;
    for(var i=0;i<board.length;i++){
        if(board[i][i]!==undefined){

        }
    }
    return false;
}

function checkDiagDown(){
    for(var i=0;i<board.length;i++){
        
    }
}

function checkTie(){
    for(var i=0;i<board.length;i++) if(board[i].includes(undefined))return false;
    return true;
}

function printBoard(){for(var i=0;i<board.length;i++)console.log(board[i]);}

