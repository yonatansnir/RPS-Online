import { Cell } from "./Cell";
import { Color, Player } from "./Player";
import { CELL_SIZE } from "../config";

export class Board {
    private board: Cell[][];
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private selectedCell: Cell | null;
    private status: "MOVE" | "SELECT";
    private turn: Color;

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement;
        canvasElement.width = 7 * CELL_SIZE;
        canvasElement.height = 6 * CELL_SIZE;
        this.status = "SELECT";
        this.turn = "BLUE";
        this.ctx = canvasElement.getContext("2d")!;
        this.board = this.initBoard();
        canvasElement.addEventListener("click", this.onMouseClick.bind(this));
    }

    draw() {
        this.ctx.clearRect(0, 0, CELL_SIZE * 7, CELL_SIZE * 6);
        for (let rows of this.board) for (let cell of rows) cell.draw(this.ctx);
        for (let rows of this.board)
            for (let cell of rows) cell.drawSelection(this.ctx);
    }

    onMouseClick(evt: MouseEvent) {
        const { rowIndex, cellIndex } = this.getIndexes(evt);
        const selectedCell = this.board[rowIndex][cellIndex];
        if (this.status === "SELECT") {
            this.handleSelectPlayer(selectedCell);
            this.status = "MOVE";
        } else if (this.status === "MOVE") {
            this.movePlayer(selectedCell);
            this.status = "SELECT";
            this.turn = this.turn === "BLUE" ? "RED" : "BLUE";
        }

        this.draw();
    }

    getIndexes(evt: MouseEvent) {
        const { clientX, clientY } = evt;
        const { x, y } = (
            evt.target as HTMLCanvasElement
        ).getBoundingClientRect();
        const posX = clientX - x;
        const posY = clientY - y;
        const cellIndex = (posX / CELL_SIZE) | 0;
        const rowIndex = (posY / CELL_SIZE) | 0;

        return { rowIndex, cellIndex };
    }

    setSelections(rowIndex: number, cellIndex: number) {
        const player = this.board[rowIndex][cellIndex].player;
        if (!player) return;
        this.resetHighlight();
        this.board[rowIndex - 1]?.[cellIndex]?.setHighlight(true, this.turn);
        this.board[rowIndex + 1]?.[cellIndex]?.setHighlight(true, this.turn);
        this.board[rowIndex]?.[cellIndex + 1]?.setHighlight(true, this.turn);
        this.board[rowIndex]?.[cellIndex - 1]?.setHighlight(true, this.turn);
    }

    initBoard() {
        const board = Array.from({ length: 6 }, (_, rowIndex) =>
            Array.from(
                { length: 7 },
                (_, cellIndex) => new Cell(rowIndex, cellIndex)
            )
        );
        this.initPlayers(board);

        return board;
    }

    initPlayers(board: Cell[][]) {
        board[0].forEach((cell) => cell.initPlayer("RED"));
        board[1].forEach((cell) => cell.initPlayer("RED"));
        board[4].forEach((cell) => cell.initPlayer("BLUE"));
        board[5].forEach((cell) => cell.initPlayer("BLUE"));
    }

    handleSelectPlayer(selectedCell: Cell) {
        if (selectedCell.player?.getColor() !== this.turn) return;
        selectedCell.player.setSelected(true);
        const { rowIndex, cellIndex } = selectedCell;
        this.setSelections(rowIndex, cellIndex);
        this.selectedCell = selectedCell;
    }

    movePlayer(cell: Cell) {
        const isHighlight = cell.getIsHighlight();
        if (!isHighlight || !this.selectedCell) return;
        this.selectedCell.player?.setSelected(false);
        let player: Player | null;
        if (cell.player && this.selectedCell.player) {
            player = this.fight(this.selectedCell.player, cell.player);
        } else {
            player = this.selectedCell.getPlayer();
        }
        cell.setPlayer(player);
        this.selectedCell.setPlayer(null);
        this.selectedCell = null;
        this.resetHighlight();
    }

    resetHighlight() {
        for (let rows of this.board)
            for (let cell of rows) cell.setHighlight(false);
    }

    fight(player1: Player, player2: Player): Player {
        const player1Type = player1.getType();
        const player2Type = player2.getType();

        if (player1Type === "Paper") {
            if (player2Type === "Rock") {
                return player1;
            }
            if (player2Type === "Sissor") {
                return player2;
            }
            return player1;
        }
        if (player1Type === "Rock") {
            if (player2Type === "Paper") {
                return player2;
            }
            if (player2Type === "Sissor") {
                return player1;
            }

            return player1;
        }
        if (player1Type === "Sissor") {
            if (player2Type === "Rock") {
                return player2;
            }
            if (player2Type === "Paper") {
                return player1;
            }

            return player1;
        }
        return player2;
    }
}
