$(document).ready(initializeGame);

function initializeGame(){
    renderNewBoard();
    attachClickHandlers();
};

function attachClickHandlers(){
    playerSwitch();
};

// ====================================================== gameObject
var gameObj = {
    gameboard: [],
    playerTurn: '1',
    selectedPiece: {
        rowIndex: null,
        spaceIndex: null
    },
    proposedMove: {
        moveToRowIndex: null,
        moveToSpaceIndex: null
    }
}

// ====================================================== Click Switches
function p1ClickOn(){
    $('.p1').on("click", selectPiece);
}
function p1ClickOff(){
    $('.p1').off("click");
}
function p2ClickOn(){
    $('.p2').on("click", selectPiece);
}
function p2ClickOff(){
    $('.p2').off("click");
}
function spaceClickOn(){
    $('.space').on("click", movePieceTo);
}
function spaceClickOff(){
    $('.space').off("click");
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

// ====================================================== So Fresh So Clean

function renderNewBoard(){
    gameObj.gameboard = [
        ['','1','','1','','1','','1'],
        ['1','','1','','1','','1',''],
        ['','1','','1','','1','','1'],
        ['0','','0','','0','','0',''],
        ['','0','','0','','0','','0'],
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
};

// ====================================================== Piece Movement

function selectPiece(event){
    if(gameObj.playerTurn==='1' && $(this).hasClass('p1')){
        // find the index in relation to the gameboard variable & save the location
        gameObj.selectedPiece.spaceIndex = $(this).parent().index();
        gameObj.selectedPiece.rowIndex = $(this).parent().parent().index();
        // replace the 1 with a 0 in the gameboard variable
        gameObj.gameboard[gameObj.selectedPiece.rowIndex][gameObj.selectedPiece.spaceIndex] = '0';
        // remove DOM element for clicked $(this) element
        $(this).remove();
        // turn off piece clicking
        p1ClickOff();
    }
    if(gameObj.playerTurn==='2' && $(this).hasClass('p2')){
        // find the index in relation to the gameboard variable & save the location
        gameObj.selectedPiece.spaceIndex = $(this).parent().index();
        gameObj.selectedPiece.rowIndex = $(this).parent().parent().index();
        // replace the 1 with a 0 in the gameboard variable
        gameObj.gameboard[gameObj.selectedPiece.rowIndex][gameObj.selectedPiece.spaceIndex] = '0';
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

function movePieceTo(){
    gameObj.proposedMove.moveToSpaceIndex = $(this).index();
    gameObj.proposedMove.moveToRowIndex = $(this).parent().index();

    if(gameObj.gameboard[gameObj.proposedMove.moveToRowIndex][gameObj.proposedMove.moveToSpaceIndex]==='0'){

        if(gameObj.playerTurn==='1'){

            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[gameObj.proposedMove.moveToRowIndex][gameObj.proposedMove.moveToSpaceIndex] = '1';

            // create new DOM element in relation to where new 1 was placed
            var p1Piece = $('<div>', {class: 'p1'});
            $(this).append(p1Piece);

            // turn off space clicks
            spaceClickOff();
            // switch player turn
            gameObj.playerTurn = '2';
            playerSwitch();

        } else if(gameObj.playerTurn==='2'){
            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[gameObj.proposedMove.moveToRowIndex][gameObj.proposedMove.moveToSpaceIndex] = '2';

            // create new DOM element in relation to where new 1 was placed
            var p2Piece = $('<div>', {class: 'p2'});
            $(this).append(p2Piece);

            // turn off space clicks
            spaceClickOff();
            // switch player turn
            gameObj.playerTurn = '1';
            playerSwitch();
        }
    }
};

function isItValid(){
};