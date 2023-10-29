import { Board } from "./models/Board";

const canvasElement = document.getElementById("game");

const board = new Board(canvasElement as HTMLCanvasElement);
board.draw();