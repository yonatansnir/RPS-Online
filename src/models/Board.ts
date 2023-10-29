import { Cell } from "./Cell"
import { Color, Player } from "./Player"
import { CELL_SIZE } from "../config"

export class Board {
    private board: Cell[][]
    private canvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement
        canvasElement.width = 7 * CELL_SIZE
        canvasElement.height = 6 * CELL_SIZE
        this.ctx = canvasElement.getContext("2d")!
        this.board = this.initBoard()
        canvasElement.addEventListener("click", this.onMouseClick.bind(this))
    }

    draw() {
        this.ctx.clearRect(0, 0, CELL_SIZE * 7, CELL_SIZE * 6)
        for (let rows of this.board) for (let cell of rows) cell.draw(this.ctx)
    }

    onMouseClick(evt: MouseEvent) {
        const { clientX, clientY } = evt
        const { x, y } = (
            evt.target as HTMLCanvasElement
        ).getBoundingClientRect()
        const posX = clientX - x
        const posY = clientY - y
        const cellIndex = (posX / CELL_SIZE) | 0
        const rowIndex = (posY / CELL_SIZE) | 0

        for (let rows of this.board)
            for (let cell of rows) cell.handleClick(rowIndex, cellIndex)

        this.draw()
    }

    initBoard() {
        const board = Array.from({ length: 6 }, (_, rowIndex) =>
            Array.from(
                { length: 7 },
                (_, cellIndex) => new Cell(rowIndex, cellIndex)
            )
        )
        this.initPlayers(board)

        return board
    }

    initPlayers(board: Cell[][]) {
        board[0].forEach((cell) => cell.initPlayer("red"))
        board[1].forEach((cell) => cell.initPlayer("red"))
        board[4].forEach((cell) => cell.initPlayer("blue"))
        board[5].forEach((cell) => cell.initPlayer("blue"))
    }
}
