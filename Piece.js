const unicodeWhite = {
    "Pawn": "♟",
    "Rook": "♜",
    "Knight": "♞",
    "Bishop": "♝",
    "Queen": "♛",
    "King": "♚"
};

const unicodeBlack = {
    "Pawn": "♙",
    "Rook": "♖",
    "Knight": "♘",
    "Bishop": "♗",
    "Queen": "♕",
    "King": "♔"
};

const values = {
    "Pawn": 1,
    "Rook": 5,
    "Knight": 3,
    "Bishop": 3,
    "Queen": 9,
    "King": "gameOver"
}

export default class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        switch(color) {
            case "white":
                this.unicode = unicodeWhite[this.type];
                break;
            case "black":
                this.unicode = unicodeBlack[this.type];
                break;
            default:
                this.unicode = " "
                break;
        }
        this.value = values[this.type];
    }

    //Check if move is permitted for the piece
    checkMove(coordsFrom, coordsTo, board) {

        var x1 = coordsFrom[0];
        var y1 = coordsFrom[1];
        var x2 = coordsTo[0];
        var y2 = coordsTo[1];
        
        switch(this.type) {
            case "Pawn":
                //Move no further than 1 square on each side
                if (Math.abs(y1 - y2) != 1 && y1 != y2) return false;
                //Move ahead less than 3 squares
                if (x1 === x2 || Math.abs(x1 - x2) > 2) return false;
                //Going back only if pawn is 1 square away from start
                if ((x2 > x1 && x1 != 5)) return false;
                //Move 2 squares only if pawn is at start and no piece is in front of it
                if ((x1 != 6 || typeof board[x1 - 1][y1] != "string") && Math.abs(x1 - x2) === 2) return false;
                //Diagonal by 1 only if there's a piece to take
                if (Math.abs(y1 - y2) === 1 && Math.abs(x1 - x2) === 1 && typeof board[x2][y2] === "string") return false
                //Can only move if no piece is in front of it
                if (Math.abs(x1 - x2) === 1 && y1 === y2 && typeof board[x2][y2] != "string") return false
                return true;
                break;
            case "Rook":
                if (y1 === y2) {
                    //Vertical
                    for (var x=1; x<(Math.abs(x1 - x2) + 1); x++) {
                        //Check if there are pieces in the way
                        if (typeof board[x1 + (Math.sign(x2 - x1) * x)][y1] != "string" && ((x1 + (Math.sign(x2 - x1) * x)) != x2)) return false;
                    } 
                }else if (x1 === x2) {
                    //Horizontal
                    for (var y=1; y<(Math.abs(y1 - y2) + 1); y++) {
                        if (typeof board[x1][y1 + (Math.sign(y2 - y1) * y)] != "string" && ((y1 + (Math.sign(y2 - y1) * y)) != y2)) return false;
                    } 
                }else return false;
                return true;
                break;
            case "Knight":
                //L shape
                if ((Math.abs(x1 - x2) != 2 || (Math.abs(y2 - y1) != 1)) || (Math.abs(y1 - y2) != 2 || (Math.abs(x2 - x1) != 1))) return false;
                return true;
                break;
            case "Bishop":
                //Diagonal
                if (Math.abs(y1 - y2) != Math.abs(x1 - x2)) return false;
                for (var x=1; x<(Math.abs(x1 - x2) + 1); x++) {
                    //Check if there are pieces in the way
                    if (typeof board[x1 + (Math.sign(x2 - x1) * x)][y1 + (Math.sign(y2 - y1) * x)] != "string" && ((x1 + (Math.sign(x2 - x1) * x) != x2) && (y1 + (Math.sign(y2 - y1) * x) != y2))) return false;
                }
                return true;
                break;
            case "Queen":
                //Straight line + diagonal
                if (y1 === y2 || x1 === x2) {
                    for (var x=1; x<(x1 - x2 + 1); x++) {
                        //Check if there are pieces in the way
                        if (typeof board[x1 + (Math.sign(x2 - x1) * x)][y1] != "string") return false;
                    }
                }
                if (Math.abs(y1 - y2) === Math.abs(x1 - x2)) {
                    for (var x=1; x<(Math.abs(x1 - x2) + 1); x++) {
                        if (typeof board[x1 + (Math.sign(x2 - x1) * x)][y1 + (Math.sign(y2 - y1) * x)] != "string" && ((x1 + (Math.sign(x2 - x1) * x) != x2) && (y1 + (Math.sign(y2 - y1) * x) != y2))) return false;
                    }
                }
                return true;
                break;
            case "King":
                //1 square in any direction
                if (y1 === y2) {
                    //Vertical
                    if (Math.abs(x2 - x1) != 1) return false;
                    for (var x=1; x<(Math.abs(x1 - x2) + 1); x++) {
                        if (typeof board[x1 + (Math.sign(x2 - x1) * x)][y1] != "string" && ((x1 + (Math.sign(x2 - x1) * x)) != x2)) return false;
                    } 
                }else if (x1 === x2) {
                    //Horizontal
                    if (Math.abs(y2 - y1) != 1) return false;
                    for (var y=1; y<(Math.abs(y1 - y2) + 1); y++) {
                        if (typeof board[x1][y1 + (Math.sign(y2 - y1) * y)] != "string" && ((y1 + (Math.sign(y2 - y1) * y)) != y2)) return false;
                    } 
                }

                //Diagonal
                if (Math.abs(y1 - y2) === Math.abs(x1 - x2)) {
                    if ((Math.abs(y2 - y1) > 1 || Math.abs(x2 - x1) > 1)) return false;
                }
                return true;
                break;
            default:
                return false;
                break;
        }
    }
}