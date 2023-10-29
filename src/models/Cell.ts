import { CELL_SIZE } from "../config"
import { Color, Player } from "./Player"

export class Cell {
    public rowIndex: number
    public cellIndex: number
    private player: Player

    constructor(rowIndex: number, cellIndex: number) {
        this.rowIndex = rowIndex
        this.cellIndex = cellIndex
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.getPosition()
        const d =
            (this.rowIndex % 2 === 0 && this.cellIndex % 2 !== 0) ||
            (this.rowIndex % 2 !== 0 && this.cellIndex % 2 === 0)
        ctx.fillStyle = d ? "lightgreen" : "green"
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)

        if (this.player) {
            this.player.draw(ctx)
        }
    }

    handleClick(rowIndex: number, cellIndex: number) {
        if (!this.player) return
        this.player.setSelected(rowIndex, cellIndex)
    }

    initPlayer(color: Color) {
        this.player = new Player(this.rowIndex, this.cellIndex, color)
    }

    getPosition() {
        return {
            x: this.cellIndex * CELL_SIZE,
            y: this.rowIndex * CELL_SIZE,
        }
    }

    getIsOnTheSameSpot(rowIndex: number, cellIndex: number) {
        return rowIndex === this.rowIndex && cellIndex === this.cellIndex
    }
}
