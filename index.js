let x = 5;
let y = 5;
let grid = [];
const type = ["CTL", "CTR", "CBL", "CBR", "SL", "SR", "SB", "ST", "INSIDE"];
const coordinates = ["--", "-0", "-+", "0-", "0+", "+-", "+0", "++"];

class Cell {
    constructor(status, x, y, gridMaxX, gridMaxY) {
        this.status = status;
        this.row = x;
        this.col = y;
        this.setType(gridMaxX - 1, gridMaxY - 1);
        this.neightCoord = this.neigthboors();
    }

    setType(gridMX, gridMY) {
        const ctl = "467";
        const ctr = "356";
        const cbl = "124";
        const cbr = "013";

        if (this.row === 0 && this.col === 0) {
            this.type = type[0];
            this.neigthboorsCode = ctl;
        } else if (this.row === 0 && this.col === gridMY) {
            this.type = type[1];
            this.neigthboorsCode = ctr;
        } else if (this.row === gridMX && this.col === 0) {
            this.type = type[2];
            this.neigthboorsCode = cbl;
        } else if (this.row === gridMX && this.col === gridMY) {
            this.type = type[3];
            this.neigthboorsCode = cbr;
        } else if (this.row < gridMX && this.row > 0 && this.col === 0) {
            this.type = type[4];
            this.neigthboorsCode = cbl + "67";
        } else if (this.row < gridMX && this.row > 0 && this.col === gridMY) {
            this.type = type[5];
            this.neigthboorsCode = cbr + "56";
        } else if (this.row === gridMX && this.col < gridMY && this.col > 0) {
            this.type = type[6];
            this.neigthboorsCode = cbr + "24";
        } else if (this.row === 0 && this.col < gridMY && this.col > 0) {
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
        let forX = this.row;
        let forY = this.col;

        for (let i = 0; i < code.length; i++) {
            const element = code[i];
            if (element === "-") {
                i === 0 ? (forX = this.row - 1) : (forY = this.col - 1);
            } else if (element === "+") {
                i === 0 ? (forX = this.row + 1) : (forY = this.col + 1);
            }
        }

        return [forX, forY];
    }
}

let timer;

const start = document.getElementById("btnStart");
start.onclick = () => {
    y = document.getElementById("width").value;
    x = document.getElementById("height").value;

    if (x >= 3 && x <= 21 && y >= 3 && y <= 21) {
        fillArray();
        timer = setInterval(() => {
            nextGen();
        }, 1000);
    }
};

const stop = document.getElementById("btnStop");
stop.onclick = () => {
    clearInterval(timer);
};

function fillArray() {
    grid = [];
    for (let i = 0; i < x; i++) {
        let row = [];
        for (let j = 0; j < y; j++) {
            const rand = Math.random() < 0.5 ? 0 : 1;
            row.push(new Cell(rand, i, j, x, y));
        }
        grid.push(row);
    }
    show();
}

function show(colors = true) {
    let table = document.createElement("table");

    for (let i = 0; i < x; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < y; j++) {
            let cell = document.createElement("td");
            cell.innerText = grid[i][j].status;
            if (colors) {
                grid[i][j].status === 0
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

function nextGen() {
    let newGrid = [];

    for (let i = 0; i < x; i++) {
        let row = [];
        for (let j = 0; j < y; j++) {
            let cell = grid[i][j];
            let aliveNeight = checkNeighboors(cell);

            if (cell.status === 0) {
                if (aliveNeight === 3 || aliveNeight === 6) {
                    row.push(new Cell(1, i, j, x, y));
                } else row.push(new Cell(0, i, j, x, y));
            } else if (cell.status === 1) {
                if (
                    aliveNeight === 2 ||
                    aliveNeight === 3 ||
                    aliveNeight === 6
                ) {
                    row.push(new Cell(1, i, j, x, y));
                } else row.push(new Cell(0, i, j, x, y));
            }
        }
        newGrid.push(row);
    }

    grid = newGrid;
    show();
}

function checkNeighboors(cell) {
    let neightArr = cell.neightCoord;
    let count = 0;

    for (let i = 0; i < neightArr.length; i++) {
        let { 0: x, 1: y } = neightArr[i];
        let cell = grid[x][y];

        if (cell.status === 1) {
            count++;
        }
    }

    return count;
}
