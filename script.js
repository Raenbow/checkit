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
    currentTurn: 'inProgress',
    selectedPiece: {
        rowIndex: null,
        spaceIndex: null
    },
    proposedMove: {
        rowIndex: null,
        spaceIndex: null
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
function currentTurnSwitch(){
    if (gameObj.currentTurn === 'inProgress'){
        gameObj.currentTurn = 'done';
    } else if (gameObj.currentTurn === 'done'){
        gameObj.currentTurn = 'inProgress';
    };
};
function playerTotalSwitch(){
    currentTurnSwitch();
    playerTurnSwitch();
    playerPieceClickSwitch();
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
        // find the index in relation to the gameboard variable & save the location
        gameObj.selectedPiece.spaceIndex = $(this).parent().index();
        gameObj.selectedPiece.rowIndex = $(this).parent().parent().index();

    if(gameObj.playerTurn==='1' && $(this).hasClass('p1')){
        if (canItBeMoved()){
            removeSelectedPiece();
        } else {
            console.log('Ohnoes! This p1 piece has no moves available!');
        };

        // replace the 1 with a 0 in the gameboard variable
        // gameObj.gameboard[gameObj.selectedPiece.rowIndex][gameObj.selectedPiece.spaceIndex] = '0';
        // remove DOM element for clicked $(this) element
        // $(this).remove();
        // turn off piece clicking
        // p1ClickOff();
    };
    if(gameObj.playerTurn==='2' && $(this).hasClass('p2')){
        if (canItBeMoved()){
            removeSelectedPiece();
        } else {
            console.log('Ohnoes! This p2 piece has no moves available!');
        };
        // replace the 1 with a 0 in the gameboard variable
        // gameObj.gameboard[gameObj.selectedPiece.rowIndex][gameObj.selectedPiece.spaceIndex] = '0';
        // remove DOM element for clicked $(this) element
        // $(this).remove();
        // turn off piece clicking
        // p2ClickOff();
    };
    // make those empty spaces clickable
    spaceClickOn();
    event.stopPropagation();
}

// Check if the selected piece has any moves available to it
function canItBeMoved(){

    ///////// Player 1
    if (gameObj.playerTurn === '1'){
        ///////// Regular Piece
        if ($('.row').eq(gameObj.selectedPiece.rowIndex).children().eq(gameObj.selectedPiece.spaceIndex).children().hasClass('p1')){
            if (move_Jump_Check(gameObj.selectedPiece)){
                console.log('This p1 piece does have possible moves - jumps!');
                return true;
            } else if (move_p1_SingleForward_Check()){
                console.log('This p1 piece does have possible moves!');
                return true;
            };
        ///////// Kinged Piece
        } else if ($('.row').eq(gameObj.selectedPiece.rowIndex).children().eq(gameObj.selectedPiece.spaceIndex).children().hasClass('p1king')){
            console.log('This p1 kinged piece does have possible moves!');
            return true;
        };

    ///////// Player 2
    } else if (gameObj.playerTurn === '2'){
        ///////// Regular Piece
        if ($('.row').eq(gameObj.selectedPiece.rowIndex).children().eq(gameObj.selectedPiece.spaceIndex).children().hasClass('p2')){
            if (move_Jump_Check(gameObj.selectedPiece)){
                console.log('This p2 piece does have possible moves - jumps!');
                return true;
            } else if (move_p2_SingleForward_Check()){
                console.log('This p2 piece does have possible moves!');
                return true;
            };
        ///////// Kinged Piece
        } else if ($('.row').eq(gameObj.selectedPiece.rowIndex).children().eq(gameObj.selectedPiece.spaceIndex).children().hasClass('p2king')){
            console.log('This p2 kinged piece does have possible moves!');
            return true;
        };
    };
};

function removeSelectedPiece(){
    // replace the 1 with a 0 in the gameboard variable
    gameObj.gameboard[gameObj.selectedPiece.rowIndex][gameObj.selectedPiece.spaceIndex] = '0';
    // remove DOM element for clicked $(this) element
    $('.row').eq(gameObj.selectedPiece.rowIndex).children().eq(gameObj.selectedPiece.spaceIndex).children().remove();

    // turn off piece clicking
    if(gameObj.playerTurn==='1'){
        p1ClickOff();
    } else if(gameObj.playerTurn==='2'){
        p2ClickOff();
    };
};

function movePieceTo(){
    gameObj.proposedMove.spaceIndex = $(this).index();
    gameObj.proposedMove.rowIndex = $(this).parent().index();

    if(isItValid()){
        ////// PLAYER #1 PLACE PIECE
        if(gameObj.playerTurn==='1'){
            // replace 0 with 1 in gameboard vairable where clicked
            gameObj.gameboard[gameObj.proposedMove.rowIndex][gameObj.proposedMove.spaceIndex] = '1';

            // create new DOM element in relation to where new 1 was placed
            var p1Piece = $('<div>', {class: 'p1'});
            $(this).append(p1Piece);

        ////// PLAYER #2 PLACE PIECE
        } else if(gameObj.playerTurn==='2'){
            // replace 0 with 2 in gameboard vairable where clicked
            gameObj.gameboard[gameObj.proposedMove.rowIndex][gameObj.proposedMove.spaceIndex] = '2';

            // create new DOM element in relation to where new 2 was placed
            var p2Piece = $('<div>', {class: 'p2'});
            $(this).append(p2Piece);
        };

        // if (move_Jump_Check()){
        //     console.log('there are more jumps available to you!');
        //     return true;
        // } else{
        //     console.log('!!! no multijumps available, switching player !!!');
        //     gameObj.currentTurn = 'done';
        // }

        // turn off space clicks
        // spaceClickOff();
        // check player turn
        // playerPieceClickSwitch();

        if (move_Jump_Check(gameObj.proposedMove) && gameObj.currentTurn !== 'done'){
            playerPieceClickSwitch();
            console.log('there are more jumps available to you!');
            return true;
        } else if (gameObj.proposedMove.rowIndex === gameObj.selectedPiece.rowIndex 
        && gameObj.proposedMove.spaceIndex === gameObj.selectedPiece.spaceIndex){
            playerPieceClickSwitch();
            console.log('It\'s still player ', gameObj.playerTurn,'\'s turn!');
        } else {
            console.log('!!! no multijumps available!!!');
            gameObj.currentTurn = 'done';
        }
        
        if (gameObj.currentTurn === 'done'){
            // turn off space clicks
            spaceClickOff();
            // switch player turn
            playerTotalSwitch();
        };
    };
};

function isItValid(){
    // Empty Space Check
    if (gameObj.gameboard[gameObj.proposedMove.rowIndex][gameObj.proposedMove.spaceIndex]==='0'){
        ////// PLAYER #1
        if (gameObj.playerTurn==='1'){
            // Same Spot
            if (move_SameSpace()){
                return true;
            // Single Forward Move
            } else if (move_p1_SingleForward()){
                return true;
            // Single? Forward Jump
            } else if (move_Jump()){
                // if multijump !== true then currentTurn = 'done'
                // gameObj.currentTurn = 'done';
                // console.log('p1 JUMPEH JUMPEH');
                return true;
            }
        ////// PLAYER #2
        } else if (gameObj.playerTurn==='2'){
            // Same Spot
            if (move_SameSpace()){
                return true;
            // Single Forward Move
            } else if (move_p2_SingleForward()){
                return true;
            // Single Forward Jump
            } else if (move_Jump()){
                // if multijump !== true then currentTurn = 'done'
                // gameObj.currentTurn = 'done';
                // console.log('- p2 JUMPEH JUMPEH');
                return true;
            };
        };
    };
};

// ====================================================== Movement Rules

// =========================== Player 1 Movement

function move_p1_SingleForward_Check(){
    if (gameObj.gameboard[gameObj.selectedPiece.rowIndex +1][gameObj.selectedPiece.spaceIndex +1] === '0'
    || gameObj.gameboard[gameObj.selectedPiece.rowIndex +1][gameObj.selectedPiece.spaceIndex -1] === '0'){
        return true;
    };
};
function move_p1_SingleForward(){
    // down one row
    if (gameObj.proposedMove.rowIndex === gameObj.selectedPiece.rowIndex +1){
        // left or right one space
        if (move_SingleLeftRight()){
            // if (move_Jump_Check() !== true){
                // gameObj.currentTurn = 'done';
                // console.log('p1 single forward move');
            // }
            gameObj.currentTurn = 'done';
            console.log('p1 single forward move');
            return true;
        };
    };
};

// =========================== Player 2 Movement

function move_p2_SingleForward_Check(){
    if (gameObj.gameboard[gameObj.selectedPiece.rowIndex -1][gameObj.selectedPiece.spaceIndex +1] === '0'
    || gameObj.gameboard[gameObj.selectedPiece.rowIndex -1][gameObj.selectedPiece.spaceIndex -1] === '0'){
        return true;
    };
};
function move_p2_SingleForward(){
    // up one row
    if (gameObj.proposedMove.rowIndex === gameObj.selectedPiece.rowIndex -1){
        // left or right one space
        if (move_SingleLeftRight()){
            // if (move_Jump_Check() !== true){
                // gameObj.currentTurn = 'done';
                // console.log('- p2 single forward move');
            // }
            gameObj.currentTurn = 'done';
            console.log('- p2 single forward move');
            return true;
        }
    }
}

// =========================== Universal Movement

function move_SameSpace(){
    if (gameObj.proposedMove.rowIndex === gameObj.selectedPiece.rowIndex 
    && gameObj.proposedMove.spaceIndex === gameObj.selectedPiece.spaceIndex){
        console.log('same spot!');
        return true;
    };
};

function move_SingleLeftRight(){
    if (gameObj.proposedMove.spaceIndex === gameObj.selectedPiece.spaceIndex +1 || gameObj.proposedMove.spaceIndex === gameObj.selectedPiece.spaceIndex -1){
        return true;
    };
};

function move_Jump_Check(piece2Check){
    if (gameObj.playerTurn === '1'){
        if (move_Jump_DownLeft_Check(piece2Check)){
            return true;
        } else if (move_Jump_DownRight_Check(piece2Check)){
            return true;
        };
    } else if (gameObj.playerTurn === '2'){
        if (move_Jump_UpLeft_Check(piece2Check)){
            return true;
        } else if (move_Jump_UpRight_Check(piece2Check)){
            return true;
        };
    };
};
function move_Jump(){
    if (gameObj.playerTurn === '1'){
        if (move_Jump_DownLeft()){
            return true;
        } else if (move_Jump_DownRight()){
            return true;
        };
    } else if (gameObj.playerTurn === '2'){
        if (move_Jump_UpLeft()){
            return true;
        } else if (move_Jump_UpRight()){
            return true;
        };
    };
};

function isRowOnGameBoard(row){
    if (row >= 0 && row <= 7){
        return true;
    };
};
function isSpaceOnGameBoard(space){
    if (space >= 0 && space <= 7){
        return true;
    };
};
function isOnGameBoard(row, space){
    return isRowOnGameBoard(row) && isSpaceOnGameBoard(space);
};

function move_Jump_DownRight_Check(piece2Check){
    // Checking that the space we're jumping to is on the game board
    if (isOnGameBoard(piece2Check.rowIndex+2, piece2Check.spaceIndex+2)){
        if (gameObj.gameboard[piece2Check.rowIndex +1][piece2Check.spaceIndex +1] !== gameObj.playerTurn 
        && gameObj.gameboard[piece2Check.rowIndex +1][piece2Check.spaceIndex +1] !== '0' 
        && gameObj.gameboard[piece2Check.rowIndex +2][piece2Check.spaceIndex +2] === '0'){
            return true;
        };
    } else {
        return false;
    };
};
function move_Jump_DownRight(){
    if (gameObj.gameboard[gameObj.proposedMove.rowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex +2]
    && gameObj.gameboard[gameObj.proposedMove.spaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex +2]){
        if (gameObj.gameboard[gameObj.proposedMove.rowIndex -1][gameObj.proposedMove.spaceIndex -1] !== gameObj.playerTurn
        && gameObj.gameboard[gameObj.proposedMove.rowIndex -1][gameObj.proposedMove.spaceIndex -1] !== '0'){
            $('.row').eq(gameObj.proposedMove.rowIndex -1).children().eq(gameObj.proposedMove.spaceIndex -1).children().remove();
            gameObj.gameboard[gameObj.proposedMove.rowIndex -1][gameObj.proposedMove.spaceIndex -1] = '0';
            return true;
        };
    };
};

function move_Jump_DownLeft_Check(piece2Check){
    // Checking that the space we're jumping to is on the game board
    if (isOnGameBoard(piece2Check.rowIndex+2, piece2Check.spaceIndex-2)){
        if (gameObj.gameboard[piece2Check.rowIndex +1][piece2Check.spaceIndex -1] !== gameObj.playerTurn 
        && gameObj.gameboard[piece2Check.rowIndex +1][piece2Check.spaceIndex -1] !== '0' 
        && gameObj.gameboard[piece2Check.rowIndex +2][piece2Check.spaceIndex -2] === '0'){
            return true;
        };
    } else {
        return false;
    };
};
function move_Jump_DownLeft(){
    if (gameObj.gameboard[gameObj.proposedMove.rowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex +2]
    && gameObj.gameboard[gameObj.proposedMove.spaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex -2]){
        if (gameObj.gameboard[gameObj.proposedMove.rowIndex -1][gameObj.proposedMove.spaceIndex +1] !== gameObj.playerTurn
        && gameObj.gameboard[gameObj.proposedMove.rowIndex -1][gameObj.proposedMove.spaceIndex +1] !== '0'){
            $('.row').eq(gameObj.proposedMove.rowIndex -1).children().eq(gameObj.proposedMove.spaceIndex +1).children().remove();
            gameObj.gameboard[gameObj.proposedMove.rowIndex -1][gameObj.proposedMove.spaceIndex +1] = '0';
            return true;
        };
    };
};

function move_Jump_UpRight_Check(piece2Check){
    // Checking that the space we're jumping to is on the game board
    if (isOnGameBoard(piece2Check.rowIndex-2, piece2Check.spaceIndex+2)){
        if (gameObj.gameboard[piece2Check.rowIndex -1][piece2Check.spaceIndex +1] !== gameObj.playerTurn 
        && gameObj.gameboard[piece2Check.rowIndex -1][piece2Check.spaceIndex +1] !== '0' 
        && gameObj.gameboard[piece2Check.rowIndex -2][piece2Check.spaceIndex +2] === '0'){
            return true;
        };
    } else {
        return false;
    };
};
function move_Jump_UpRight(){
    if (gameObj.gameboard[gameObj.proposedMove.rowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex -2]
    && gameObj.gameboard[gameObj.proposedMove.spaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex +2]){
        if (gameObj.gameboard[gameObj.proposedMove.rowIndex +1][gameObj.proposedMove.spaceIndex -1] !== gameObj.playerTurn
        && gameObj.gameboard[gameObj.proposedMove.rowIndex +1][gameObj.proposedMove.spaceIndex -1] !== '0'){
            $('.row').eq(gameObj.proposedMove.rowIndex +1).children().eq(gameObj.proposedMove.spaceIndex -1).children().remove();
            gameObj.gameboard[gameObj.proposedMove.rowIndex +1][gameObj.proposedMove.spaceIndex -1] = '0';
            return true;
        };
    };
};

function move_Jump_UpLeft_Check(piece2Check){
    // Checking that the space we're jumping to is on the game board
    if (isOnGameBoard(piece2Check.rowIndex-2, piece2Check.spaceIndex-2)){
        if (gameObj.gameboard[piece2Check.rowIndex -1][piece2Check.spaceIndex -1] !== gameObj.playerTurn 
        && gameObj.gameboard[piece2Check.rowIndex -1][piece2Check.spaceIndex -1] !== '0' 
        && gameObj.gameboard[piece2Check.rowIndex -2][piece2Check.spaceIndex -2] === '0'){
            return true;
        };
    } else {
        return false;
    };
};
function move_Jump_UpLeft(){
    if (gameObj.gameboard[gameObj.proposedMove.rowIndex] === gameObj.gameboard[gameObj.selectedPiece.rowIndex -2]
    && gameObj.gameboard[gameObj.proposedMove.spaceIndex] === gameObj.gameboard[gameObj.selectedPiece.spaceIndex -2]){
        if (gameObj.gameboard[gameObj.proposedMove.rowIndex +1][gameObj.proposedMove.spaceIndex +1] !== gameObj.playerTurn
        && gameObj.gameboard[gameObj.proposedMove.rowIndex +1][gameObj.proposedMove.spaceIndex +1] !== '0'){
            $('.row').eq(gameObj.proposedMove.rowIndex +1).children().eq(gameObj.proposedMove.spaceIndex +1).children().remove();
            gameObj.gameboard[gameObj.proposedMove.rowIndex +1][gameObj.proposedMove.spaceIndex +1] = '0';
            return true;
        };
    };
};

function move_Jump_MultiCheck(){

}