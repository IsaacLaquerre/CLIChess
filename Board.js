const coordsX = ["a", "b", "c", "d", "e", "f", "g", "h"];
const coordsY = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default class Board {
    constructor(board, size, pieces, deadPieces, players) {
        this.board = board;
        this.size = size;
        this.pieces = pieces;
        this.deadPieces = deadPieces;
        this.players = players;
    }

    getBoard() {
        return this.board;
    }

    displayBoard() {
        var output = "";

        for (var x=0; x<this.size; x++) {
            //output += "   ⌜---⌝⌜---⌝⌜---⌝⌜---⌝⌜---⌝⌜---⌝⌜---⌝⌜---⌝\n";
            output += "   ⌜   ⌝⌜   ⌝⌜   ⌝⌜   ⌝⌜   ⌝⌜   ⌝⌜   ⌝⌜   ⌝\n";
            output += coordsX[x] + "  ";
            for (var y=0; y<this.size; y++) {
                if (typeof this.board[x][y] === "string") output += "  " + this.board[x][y] + "  ";
                else output += "  " + this.board[x][y].unicode + "  ";
                if (y === this.size - 1) output += "\n";
            }
            output += "   ⌞   ⌟⌞   ⌟⌞   ⌟⌞   ⌟⌞   ⌟⌞   ⌟⌞   ⌟⌞   ⌟\n";
            //output += "   ⌞---⌟⌞---⌟⌞---⌟⌞---⌟⌞---⌟⌞---⌟⌞---⌟⌞---⌟\n";
        }

        output += "\n   ";

        for (var i=0; i<coordsY.length; i++) {
            output += "  " + coordsY[i] + "  ";
        }

        return output;
    }

    gameOver() {
        //Game over
    }
}