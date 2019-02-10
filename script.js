$(document).ready(initializeGame);

// DOM
function initializeGame(){
    attachClickHandlers();
    renderNewBoard();
};

function attachClickHandlers(){
    // $(".space").on("click", testFunction);
};

function testFunction(){
    console.log("test function console log");
};

// gameObject
var gameObj = {
    gameboard: []
}

function renderNewBoard(){
    gameObj.gameboard = [
        ['','1','','1','','1','','1'],
        ['1','','1','','1','','1',''],
        ['','1','','1','','1','','1'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['2','','2','','2','','2',''],
        ['','2','','2','','2','','2'],
        ['2','','2','','2','','2',''],
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
}