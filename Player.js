import Piece from "./Piece.js";

const coordsX = ["a", "b", "c", "d", "e", "f", "g", "h"];
const coordsY = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default class Player {
    constructor(color) {
        this.color = color;
        this.score = 0;
    }

    move(board, coords, callback) {
        var board = board.getBoard();

        if (coords.indexOf(" ") === -1) return callback(false);

        coords = coords.split(" ");

        var coordsFrom = coords[0].split("");
        var coordsTo = coords[1].split("");

        if (!coordsX.includes(coordsFrom[0])) return callback(false, "XFrom not in bounds");
        if (!coordsX.includes(coordsTo[0])) return callback(false, "XTo not in bounds");
        if (!coordsY.includes(coordsFrom[1])) return callback(false, "YFrom not in bounds");
        if (!coordsY.includes(coordsTo[1])) return callback(false, "YTo not in bounds");

        var x1 = coordsX.indexOf(coordsFrom[0]);
        var y1 = parseInt(coordsFrom[1] - 1);
        var x2 = coordsX.indexOf(coordsTo[0]);
        var y2 = parseInt(coordsTo[1] - 1);

        if (typeof board[x1][y1] === "object" && board[x2][y2].color != board[x1][y1].color) {
            if (!board[x1][y1].checkMove([x1, y1], [x2, y2], board)) return callback(false, "[" + x1 + ", " + y1 + "]" + " to [" + x2 + ", " + y2 + "], Move not permitted");
            else {
                console.log("Moving " + board[x1][y1].type + " at [" + x1 + ", " + y1 + "] to [" + x2 + ", " + y2 + "].");
                board[x2][y2] = board[x1][y1];
                board[x1][y1] = " ";

                //Turn pawn into queen if it reaches last square
                if (board[x2][y2].type === "Pawn" && (x2 === 0 || x2 === board.size - 1)) {
                    board[x2][y2] = new Piece("Queen", this.color);
                }

                if (typeof board[x2][y2] === "object") {
                    //board.deadPieces.push(board[x2][y2]);
                    if (board[x2][y2].type != "King") this.score = this.score + board[x1][y1].value;
                    else board.gameOver();
                }

                callback(true);
            }
        }else return callback(false, "Incorrect piece/destination");
    }
}