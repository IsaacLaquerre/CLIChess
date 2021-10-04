import readline from "readline";
import clearConsole from "clear-console";
import Board from "./Board.js";
import Player from "./Player.js";
import Bot from "./Bot.js";
import Piece from "./Piece.js";

const boardSize = 8;
const colors = ["white", "black"];
    
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

startGame();

function startGame(board, player) {
    if (!board || board === undefined || !player || player === undefined) var [board, player] = setUpBoard();

    nextMove(board, player);
}

function nextMove(board, player) {
    clearConsole(true);
    rl.question("\n          You are playing: " + player.color + "\n                  Score: " + player.score + "\n         ------------------------\n\nPlease use the \"a1 h8\" format to move your pieces\n\n" + board.displayBoard() + "\n\nYour move: ", function(input) {
        player.move(board, input, function(success, resp) {
            if (!success) {
                console.log(resp);
                return nextMove(board, player);
            }else {
                return nextMove(board, player);
            }
        });
    });
}

function setUpBoard() {
    var board = [];

    //Set up player
    var player = new Player(colors[Math.floor(Math.random() * colors.length)]);

    //Make empty board
    for (var x=0; x<boardSize; x++) {
        board[x] = [];
        for (var y=0; y<boardSize; y++) {
            board[x][y] = " ";
        }
    }

    //Set up pawns
    for (var i=0; i<boardSize; i++) {
        board[boardSize - 2][i] = new Piece("Pawn", player.color);
        board[1][i] = new Piece("Pawn", colors.join("").split(player.color).filter(string => string != "")[0]);
    }

    //Set up rooks
    board[boardSize - 1][0] = new Piece("Rook", player.color);
    board[boardSize - 1][boardSize - 1] = new Piece("Rook", player.color);
    board[0][0] = new Piece("Rook", colors.join("").split(player.color).filter(string => string != "")[0]);
    board[0][boardSize - 1] = new Piece("Rook", colors.join("").split(player.color).filter(string => string != "")[0]);

    //Set up knights
    board[boardSize - 1][1] = new Piece("Knight", player.color);
    board[boardSize - 1][boardSize - 2] = new Piece("Knight", player.color);
    board[0][1] = new Piece("Knight", colors.join("").split(player.color).filter(string => string != "")[0]);
    board[0][boardSize - 2] = new Piece("Knight", colors.join("").split(player.color).filter(string => string != "")[0]);

    //Set up bishops
    board[boardSize - 1][2] = new Piece("Bishop", player.color);
    board[boardSize - 1][boardSize - 3] = new Piece("Bishop", player.color);
    board[0][2] = new Piece("Bishop", colors.join("").split(player.color).filter(string => string != "")[0]);
    board[0][boardSize - 3] = new Piece("Bishop", colors.join("").split(player.color).filter(string => string != "")[0]);

    //Set up Queens
    board[boardSize - 1][4] = new Piece("Queen", player.color);
    board[0][4] = new Piece("Queen", colors.join("").split(player.color).filter(string => string != "")[0]);

    //Set up Kings
    board[boardSize - 1][3] = new Piece("King", player.color);
    board[0][3] = new Piece("King", colors.join("").split(player.color).filter(string => string != "")[0]);

    var gameBoard = new Board(board, boardSize, ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], [], []);

    return [gameBoard, player];
}