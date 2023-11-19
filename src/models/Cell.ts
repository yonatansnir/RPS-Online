import { CELL_SIZE } from "../config";
import { Color, Player } from "./Player";

export class Cell {
    public rowIndex: number;
    public cellIndex: number;
    private highlight: boolean;
    public player: Player | null;

    constructor(rowIndex: number, cellIndex: number) {
        this.player = null;
        this.rowIndex = rowIndex;
        this.cellIndex = cellIndex;
        this.highlight = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.getPosition();
        const d =
            (this.rowIndex % 2 === 0 && this.cellIndex % 2 !== 0) ||
            (this.rowIndex % 2 !== 0 && this.cellIndex % 2 === 0);
        ctx.fillStyle = d ? "lightgreen" : "green";
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

        if (this.player) {
            this.player.draw(ctx, this.rowIndex, this.cellIndex);
        }
    }

    drawSelection(ctx: CanvasRenderingContext2D) {
        if (this.highlight) {
            const { x, y } = this.getPosition();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            // ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }

    selectPlayer(rowIndex: number, cellIndex: number) {
        if (!this.player) return;
        const isSelected =
            rowIndex === this.rowIndex && cellIndex === this.cellIndex;
        this.player.setSelected(isSelected);
    }

    setPlayer(player: Player | null) {
        this.player = player;
    }

    getPlayer() {
        return this.player;
    }

    initPlayer(color: Color) {
        this.player = new Player(color);
    }

    setHighlight(bool: boolean, color?: Color) {
        if (color && this.player?.getColor() === color) return;
        this.highlight = bool;
    }

    getIsHighlight() {
        return this.highlight;
    }

    getPosition() {
        return {
            x: this.cellIndex * CELL_SIZE,
            y: this.rowIndex * CELL_SIZE,
        };
    }
}
