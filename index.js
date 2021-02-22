let x;
let y;
let grid = [];

const calc = document.getElementById("btnCalculate");
calc.onclick = () => {
    y = document.getElementById("width").value;
    x = document.getElementById("height").value;

    fillArray();
};

function fillArray() {
    grid = [];
    // if (x <= 100 && y <= 100) {
    for (let i = 0; i < x; i++) {
        let row = [];
        for (let j = 0; j < y; j++) {
            const rand = Math.random() < 0.5 ? 0 : 1;
            row.push(new Cell(rand, i, j, x, y));
        }
        grid.push(row);
    }
    show(false);
    // }
}

function show(colors) {
    let table = document.createElement("table");

    for (let i = 0; i < x; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < y; j++) {
            let cell = document.createElement("td");
            cell.innerText = grid[i][j].status;
            if (colors) {
                rand === 0
                    ? cell.classList.add("red")
                    : cell.classList.add("green");
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const section = document.getElementById("grid");
    section.innerHTML = "";
    section.appendChild(table);
}

const type = ["CTL", "CTR", "CBL", "CBR", "SL", "SR", "SB", "ST", "INSIDE"];
const coordinates = ["--", "-0", "-+", "0-", "0+", "+-", "+0", "++"];

class Cell {
    constructor(status, x, y, gridMaxX, gridMaxY) {
        this.status = status;
        this.x = x;
        this.y = y;
        this.setType(gridMaxX - 1, gridMaxY - 1);
    }

    setType(gridMX, gridMY) {
        const ctl = "467";
        const ctr = "356";
        const cbl = "124";
        const cbr = "013";

        if (this.x === 0 && this.y === 0) {
            this.type = type[0];
            this.neigthboorsCode = ctl;
        } else if (this.x === 0 && this.y === gridMY) {
            this.type = type[1];
            this.neigthboorsCode = ctr;
        } else if (this.x === gridMX && this.y === 0) {
            this.type = type[2];
            this.neigthboorsCode = cbl;
        } else if (this.x === gridMX && this.y === gridMY) {
            this.type = type[3];
            this.neigthboorsCode = cbr;
        } else if (this.x < gridMX && this.x > 0 && this.y === 0) {
            this.type = type[4];
            this.neigthboorsCode = cbl + "67";
        } else if (this.x < gridMX && this.x > 0 && this.y === gridMY) {
            this.type = type[5];
            this.neigthboorsCode = cbr + "56";
        } else if (this.x === gridMX && this.y < gridMY && this.y > 0) {
            this.type = type[6];
            this.neigthboorsCode = cbr + "24";
        } else if (this.x === 0 && this.y < gridMY && this.y > 0) {
            this.type = type[7];
            this.neigthboorsCode = ctr + "47";
        } else {
            this.type = type[8];
            this.neigthboorsCode = "all";
        }
    }

    neigthboors() {
        let neightCoord = [];

        if (this.neigthboorsCode === "all") {
            for (let i = 0; i < coordinates.length; i++) {
                neightCoord.push(this.coordinatesDecode(coordinates[i]));
            }
        } else {
            for (let i = 0; i < this.neigthboorsCode.length; i++) {
                const element = this.neigthboorsCode[i];
                neightCoord.push(
                    this.coordinatesDecode(coordinates[parseInt(element)])
                );
            }
        }

        return neightCoord;
    }

    coordinatesDecode(code) {
        let forX = this.x;
        let forY = this.y;

        for (let i = 0; i < code.length; i++) {
            const element = code[i];
            if (element === "-") {
                i === 0 ? (forX = this.x - 1) : (forY = this.y - 1);
            } else if (element === "+") {
                i === 0 ? (forX = this.x + 1) : (forY = this.y + 1);
            }
        }

        return [forY, forX];
    }
}
