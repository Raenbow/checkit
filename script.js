$(document).ready(initializeGame);

function initializeGame(){
    renderNewBoard();
    attachClickHandlers();
};

function attachClickHandlers(){
    playerPieceClickSwitch();
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

function playerPieceClickSwitch(){
    if (gameObj.playerTurn==='1'){
        p2ClickOff();
        p1ClickOn();
    } else if (gameObj.playerTurn==='2'){
        p1ClickOff();
        p2ClickOn();
    };
};
function playerTurnSwitch(){
    if (gameObj.playerTurn==='1'){
        gameObj.playerTurn = '2';
    } else if (gameObj.playerTurn==='2'){
        gameObj.playerTurn = '1';
    };
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
    // make those empty spaces clickable
    spaceClickOn();
    event.stopPropagation();
}

function movePieceTo(){
    gameObj.proposedMove.moveToSpaceIndex = $(this).index();
    gameObj.proposedMove.moveToRowIndex = $(this).parent().index();

    if(isItValid()){
        if(gameObj.playerTurn==='1'){
            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[gameObj.proposedMove.moveToRowIndex][gameObj.proposedMove.moveToSpaceIndex] = '1';

            // create new DOM element in relation to where new 1 was placed
            var p1Piece = $('<div>', {class: 'p1'});
            $(this).append(p1Piece);

            // turn off space clicks
            spaceClickOff();
            // switch player turn
            playerTurnSwitch();
            playerPieceClickSwitch();

        } else if(gameObj.playerTurn==='2'){
            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[gameObj.proposedMove.moveToRowIndex][gameObj.proposedMove.moveToSpaceIndex] = '2';

            // create new DOM element in relation to where new 1 was placed
            var p2Piece = $('<div>', {class: 'p2'});
            $(this).append(p2Piece);

            // turn off space clicks
            spaceClickOff();
            // switch player turn
            playerTurnSwitch();
            playerPieceClickSwitch();
        };
    };
};

function isItValid(){
    // Empty Space Check
    if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex][gameObj.proposedMove.moveToSpaceIndex]==='0'){
        // need to make sure pieces aren't moving over two spaces in one move
        
        ////// PLAYER #1
        if (gameObj.playerTurn==='1'){
            // Single Forward Move
            if (move_p1_SingleForward()){
                return true;
            } else if (move_SingleJump()){
                // if second jump is possible return false after running a function that keeps it from switching player turns
                console.log('p1 JUMPEH JUMPEH');
                return true;
            }
        ////// PLAYER #2
        } else if (gameObj.playerTurn==='2'){
            // Single Forward Move
            if (move_p2_SingleForward()){
                return true;
            } else if (move_SingleJump()){
                // if second jump is possible return false after running a function that keeps it from switching player turns
                console.log('- p2 JUMPEH JUMPEH');
                return true;
            }
        };
    } else {
        console.log('theres another piece in your way!');
    };
};

// ====================================================== Movement Rules

// =========================== Player 1 Movement

function move_p1_SingleForward(){
    // down one row
    if (gameObj.proposedMove.moveToRowIndex === gameObj.selectedPiece.rowIndex +1){
        // left or right one space
        if (move_SingleLeftRight()){
            console.log('p1 single forward move');
            return true;
        }
    };
};
// function move_p1_SingleJump(){
//     if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex-1][gameObj.proposedMove.moveToSpaceIndex-1]==='2' 
//     || gameObj.gameboard[gameObj.proposedMove.moveToRowIndex-1][gameObj.proposedMove.moveToSpaceIndex+1]==='2'){
//         return true;
//     }
    //remove jumped piece
    //increase score
// }

// =========================== Player 2 Movement

function move_p2_SingleForward(){
    // up one row
    if (gameObj.proposedMove.moveToRowIndex === gameObj.selectedPiece.rowIndex -1){
        // left or right one space
        if (move_SingleLeftRight()){
            console.log('- p2 single forward move');
            return true;
        }
    }
}

// =========================== Universal Movement

function move_SingleLeftRight(){
    if (gameObj.proposedMove.moveToSpaceIndex === gameObj.selectedPiece.spaceIndex +1 || gameObj.proposedMove.moveToSpaceIndex === gameObj.selectedPiece.spaceIndex -1){
        return true;
    };
};

function move_SingleJump(){
    if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex +2]
    && gameObj.gameboard[gameObj.proposedMove.moveToSpaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex +2]){
        if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex -1][gameObj.proposedMove.moveToSpaceIndex -1] !== gameObj.playerTurn
            && gameObj.gameboard[gameObj.proposedMove.moveToRowIndex -1][gameObj.proposedMove.moveToSpaceIndex -1] !== '0'){
            return true;
        }
    } else if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex +2]
    && gameObj.gameboard[gameObj.proposedMove.moveToSpaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex -2]){
        if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex -1][gameObj.proposedMove.moveToSpaceIndex +1] !== gameObj.playerTurn
            && gameObj.gameboard[gameObj.proposedMove.moveToRowIndex -1][gameObj.proposedMove.moveToSpaceIndex +1] !== '0'){
            return true;
        }
    } else if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex -2]
    && gameObj.gameboard[gameObj.proposedMove.moveToSpaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex +2]){
        if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex +1][gameObj.proposedMove.moveToSpaceIndex -1] !== gameObj.playerTurn
            && gameObj.gameboard[gameObj.proposedMove.moveToRowIndex +1][gameObj.proposedMove.moveToSpaceIndex -1] !== '0'){
            return true;
        }
    } else if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex -2]
    && gameObj.gameboard[gameObj.proposedMove.moveToSpaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex -2]){
        if (gameObj.gameboard[gameObj.proposedMove.moveToRowIndex +1][gameObj.proposedMove.moveToSpaceIndex +1] !== gameObj.playerTurn
            && gameObj.gameboard[gameObj.proposedMove.moveToRowIndex +1][gameObj.proposedMove.moveToSpaceIndex +1] !== '0'){
            return true;
        }
    }

    // if (gameObj.gameboard[gameObj.selectedPiece.rowIndex -1][gameObj.selectedPiece.spaceIndex -1] !== gameObj.playerTurn 
    // || gameObj.gameboard[gameObj.selectedPiece.rowIndex -1][gameObj.selectedPiece.rowIndex +1] !== gameObj.playerTurn){

    //     return true;
    // }
    //remove jumped piece
    //increase score
}

function move_MultiJumpCheck(){

}