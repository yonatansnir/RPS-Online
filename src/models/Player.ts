import { CELL_SIZE } from "../config";

export type Color = "RED" | "BLUE";
const types = ["Sissor", "Paper", "Rock"] as const;

export class Player {
    private color: Color;
    private type: (typeof types)[number];
    private selected: boolean;

    constructor(color: Color) {
        this.color = color;
        this.type = types[(Math.random() * types.length) | 0];
        this.selected = false;
    }

    getPosition(rowIndex: number, cellIndex: number) {
        return {
            x: cellIndex * CELL_SIZE + CELL_SIZE / 2,
            y: rowIndex * CELL_SIZE + CELL_SIZE / 2,
        };
    }

    draw(ctx: CanvasRenderingContext2D, rowIndex: number, cellIndex: number) {
        const { x, y } = this.getPosition(rowIndex, cellIndex);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.color;
        ctx.font = `${this.selected ? "20px" : "16px"} Ariel`;
        ctx.fillText(this.type, x, y);
        // const radius = this.selected ? CELL_SIZE / 3 : CELL_SIZE / 4;
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.arc(x, y, radius, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.closePath();
    }

    setSelected(isSelected: boolean) {
        this.selected = isSelected;
    }

    getIsSelected() {
        return this.selected;
    }

    getColor() {
        return this.color;
    }

    getType() {
        return this.type;
    }
}
