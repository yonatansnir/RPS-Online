import { CELL_SIZE } from "../config"

export type Color = "red" | "blue"
const types = ["Sissor", "Paper", "Rock"] as const

export class Player {
    private color: Color
    private type: (typeof types)[number]
    private rowIndex: number
    private cellIndex: number
    private selected: boolean

    constructor(rowIndex: number, cellIndex: number, color: Color) {
        this.rowIndex = rowIndex
        this.cellIndex = cellIndex
        this.color = color
        this.type = types[(Math.random() * types.length) | 0]
        this.selected = false
    }

    getPosition() {
        return {
            x: this.cellIndex * CELL_SIZE + CELL_SIZE / 2,
            y: this.rowIndex * CELL_SIZE + CELL_SIZE / 2,
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.getPosition()
        const radius = this.selected ? CELL_SIZE / 3 : CELL_SIZE / 4
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }

    setSelected(rowIndex: number, cellIndex: number) {
        this.selected =
            this.cellIndex === cellIndex && this.rowIndex === rowIndex
    }

    getIsSelected() {
        return this.selected
    }
}
