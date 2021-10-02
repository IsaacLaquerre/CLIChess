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
    }

    checkMove(coordsFrom, coordsTo, board) {

        var x1 = coordsFrom[0];
        var y1 = coordsFrom[1];
        var x2 = coordsTo[0];
        var y2 = coordsTo[1];
        
        switch(this.type) {
            case "Pawn":
                if (y1 - y2 != 1 && y2 - y1 != 1 && y1 != y2) return false;
                if (x1 <= x2 || x1 - x2 > 2) return false;
                if (x1 < 6 && x1 - x2 === 2) return false;
                if ((y1 - y2 === 1 || y2 - y1 === 1) && x1 - x2 === 1 && typeof board[x2][y2] === "string") return false
                return true;
                break;
            case "Rook":
                if (y1 != y2 && x1 != x2) return false;
                for (var x=1; x<(x1 - x2 + 1); x++) {
                    if (typeof board[x1 - x][y1] != "string") return false;
                }
                return true
                break;
            case "Knight":
                break;
            case "Bishop":
                break;
            case "Queen":
                break;
            case "King":
                break;
            default:
                return false;
                break;
        }
    }
}