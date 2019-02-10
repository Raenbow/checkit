$(document).ready(initializeGame);

// DOM
function initializeGame(){
    renderNewBoard();
    attachClickHandlers();
};

function attachClickHandlers(){
    playerSwitch();
};

function p1ClickOn(){
    $('.p1').on("click", movePieceStart);
}
function p1ClickOff(){
    $('.p1').off("click");
}
function p2ClickOn(){
    $('.p2').on("click", movePieceStart);
}
function p2ClickOff(){
    $('.p2').off("click");
}
function spaceClickOn(){
    $('.space').on("click", movePieceGoTo);
}
function spaceClickOff(){
    $('.space').off("click");
}

function testFunction(){
    console.log("test function console log");
};

// gameObject
var gameObj = {
    gameboard: [],
    playerTurn: '1'
}

function playerSwitch(){
    if(gameObj.playerTurn==='1'){
        p2ClickOff();
        p1ClickOn();
    } else if(gameObj.playerTurn==='2'){
        p1ClickOff();
        p2ClickOn();
    }
};

function renderNewBoard(){
    gameObj.gameboard = [
        ['0','1','0','1','0','1','0','1'],
        ['1','0','1','0','1','0','1','0'],
        ['0','1','0','1','0','1','0','1'],
        ['0','0','0','0','0','0','0','0'],
        ['0','0','0','0','0','0','0','0'],
        ['2','0','2','0','2','0','2','0'],
        ['0','2','0','2','0','2','0','2'],
        ['2','0','2','0','2','0','2','0'],
    ];
    
    for(numOfRows = 0; numOfRows < 8; numOfRows++){
        for(numOfSpaces = 0; numOfSpaces < 8; numOfSpaces++){
            if(gameObj.gameboard[numOfRows][numOfSpaces]==='1'){
                var p1Piece = $('<div>', {class: 'p1'});
                $('.row').eq(numOfRows).children().eq(numOfSpaces).append(p1Piece);
            } else if(gameObj.gameboard[numOfRows][numOfSpaces]==='2'){
                var p2Piece = $('<div>', {class: 'p2'});
                $('.row').eq(numOfRows).children().eq(numOfSpaces).append(p2Piece);
            }
        }
    }
};

function movePieceStart(event){
    if(gameObj.playerTurn==='1' && $(this).hasClass('p1')){
        // find the index in relation to the gameboard variable
        var spaceIndex = $(this).parent().index();
        var rowIndex = $(this).parent().parent().index();
        // replace the 1 with a 0 in the gameboard variable
        gameObj.gameboard[rowIndex][spaceIndex] = '0';
        // remove DOM element for clicked $(this) element
        $(this).remove();
        // turn off piece clicking
        p1ClickOff();

        console.log('p1 piece move function index: ', rowIndex, spaceIndex);
        console.log(gameObj.gameboard[rowIndex][spaceIndex]);
    }
    if(gameObj.playerTurn==='2' && $(this).hasClass('p2')){
        // find the index in relation to the gameboard variable
        var spaceIndex = $(this).parent().index();
        var rowIndex = $(this).parent().parent().index();
        // replace the 1 with a 0 in the gameboard variable
        gameObj.gameboard[rowIndex][spaceIndex] = '0';
        // remove DOM element for clicked $(this) element
        $(this).remove();
        // turn off piece clicking
        p2ClickOff();
    }
    // (determine which empty spaces SHOULD be clickable)
    // make those empty spaces clickable
    spaceClickOn();
    event.stopPropagation();
}

function movePieceGoTo(){
    var moveToSpaceIndex = $(this).index();
    var moveToRowIndex = $(this).parent().index();
    console.log('row: ', moveToRowIndex,' space: ', moveToSpaceIndex);

    if(gameObj.gameboard[moveToRowIndex][moveToSpaceIndex]==='0'){
        if(gameObj.playerTurn==='1'){
            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[moveToRowIndex][moveToSpaceIndex] = '1';

            // create new DOM element in relation to where new 1 was placed
            var p1Piece = $('<div>', {class: 'p1'});
            $(this).append(p1Piece);

            // switch player turn
            gameObj.playerTurn = '2';

        } else if(gameObj.playerTurn==='2'){
            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[moveToRowIndex][moveToSpaceIndex] = '2';

            // create new DOM element in relation to where new 1 was placed
            var p2Piece = $('<div>', {class: 'p2'});
            $(this).append(p2Piece);

            // switch player turn
            gameObj.playerTurn = '1';
        }
    }
    // turn off space clicks
    spaceClickOff();
    // switch player turn
    playerSwitch();
};