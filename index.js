let x = 5;
let y = 5;
let timer;
let gen = 0;
let grid = [];
const type = ['CTL', 'CTR', 'CBL', 'CBR', 'SL', 'SR', 'SB', 'ST', 'INSIDE'];
const coordinates = ['--', '-0', '-+', '0-', '0+', '+-', '+0', '++'];

/**
 * Cell class. Containing methods for encode and decode neighbor
 * coordinates determined by the cell type.
 */
class Cell {
    /**
     * Constructor for Cell class. Creates object of type Cell.
     * @param {Number} status 0 - dead, 1 - alive
     * @param {Number} x X coordinates.
     * @param {Number} y Y coordinates.
     * @param {Number} gridMaxX Maximum width of the grid.
     * @param {Number} gridMaxY Maximum height of the grid.
     */
    constructor(status, x, y, gridMaxX, gridMaxY) {
        this.status = status;
        this.row = x;
        this.col = y;
        this.setType(gridMaxX - 1, gridMaxY - 1);
        this.neighborsCoord = this.neighbors();
    }

    /**
     * Function to determine the type of the cell and codes for all cell neighbors.
     * Encoding all possible neighbors to indexes of the array: coordinates.
     *
     * @param {Number} gridMX Maximum width of the grid.
     * @param {Number} gridMY Maximum height of the grid.
     */
    setType(gridMX, gridMY) {
        const ctl = '467';
        const ctr = '356';
        const cbl = '124';
        const cbr = '013';

        if (this.row === 0 && this.col === 0) {
            this.type = type[0];
            this.neighborsCode = ctl;
        } else if (this.row === 0 && this.col === gridMY) {
            this.type = type[1];
            this.neighborsCode = ctr;
        } else if (this.row === gridMX && this.col === 0) {
            this.type = type[2];
            this.neighborsCode = cbl;
        } else if (this.row === gridMX && this.col === gridMY) {
            this.type = type[3];
            this.neighborsCode = cbr;
        } else if (this.row < gridMX && this.row > 0 && this.col === 0) {
            this.type = type[4];
            this.neighborsCode = cbl + '67';
        } else if (this.row < gridMX && this.row > 0 && this.col === gridMY) {
            this.type = type[5];
            this.neighborsCode = cbr + '56';
        } else if (this.row === gridMX && this.col < gridMY && this.col > 0) {
            this.type = type[6];
            this.neighborsCode = cbr + '24';
        } else if (this.row === 0 && this.col < gridMY && this.col > 0) {
            this.type = type[7];
            this.neighborsCode = ctr + '47';
        } else {
            this.type = type[8];
            this.neighborsCode = 'all';
        }
    }

    /**
     * Function using neighborsCode to decode all possible neighbors coordinates.
     * Using neighborsCode containing indexes of coordinates array.
     * @returns Array with all possible neighbors coordinates.
     */
    neighbors() {
        let neighborsCoord = [];

        if (this.neighborsCode === 'all') {
            for (let i = 0; i < coordinates.length; i++) {
                neighborsCoord.push(this.coordinatesDecode(coordinates[i]));
            }
        } else {
            for (let i = 0; i < this.neighborsCode.length; i++) {
                const element = this.neighborsCode[i];
                neighborsCoord.push(
                    this.coordinatesDecode(coordinates[parseInt(element)])
                );
            }
        }

        return neighborsCoord;
    }

    /**
     * Function to decode the encoded neighbor coordinates.
     * @param {String} code Code for decoding to neighbor coordinates.
     * @returns Array of decoded neighbor coordinates.
     */
    coordinatesDecode(code) {
        let forX = this.row;
        let forY = this.col;

        for (let i = 0; i < code.length; i++) {
            const element = code[i];
            if (element === '-') {
                i === 0 ? (forX = this.row - 1) : (forY = this.col - 1);
            } else if (element === '+') {
                i === 0 ? (forX = this.row + 1) : (forY = this.col + 1);
            }
        }

        return [forX, forY];
    }
}

/**
 * Function to random generate the contents of the array/grid.
 */
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

/**
 * Function to show the array on the display.
 * @param {Boolean} colors True to show colors, false to not show colors.
 */
function show(colors = true) {
    let table = document.createElement('table');

    for (let i = 0; i < x; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < y; j++) {
            let cell = document.createElement('td');
            cell.innerText = grid[i][j].status;
            if (colors) {
                grid[i][j].status === 0
                    ? cell.classList.add('red')
                    : cell.classList.add('green');
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const section = document.getElementById('grid');
    section.innerHTML = '';
    section.appendChild(table);
}

/**
 * Function to create the next generation. Determines the cell status, by the alive neighbors.
 * If the cell is dead (status is 0) and has 3 or 6 alive neighbors, then becomes alive (status is 1).
 * Else stays dead (status is 0).
 * If the cell is alive (status is 1) and has 2, 3 or 6 alive neighbors, then stays alive (status is 1).
 * Else becomes dead (status is 0).
 */
function nextGen() {
    let newGrid = [];

    for (let i = 0; i < x; i++) {
        let row = [];
        for (let j = 0; j < y; j++) {
            let cell = grid[i][j];
            let aliveNeighbors = checkNeighbors(cell);

            if (cell.status === 0) {
                if (aliveNeighbors === 3 || aliveNeighbors === 6) {
                    row.push(new Cell(1, i, j, x, y));
                } else row.push(new Cell(0, i, j, x, y));
            } else if (cell.status === 1) {
                if (
                    aliveNeighbors === 2 ||
                    aliveNeighbors === 3 ||
                    aliveNeighbors === 6
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

/**
 * Function to check alive neighbors, for specific cell.
 * @param {Cell} cell The cell to check neighbors.
 * @returns {Number} The number of alive neighbors.
 */
function checkNeighbors(cell) {
    let neighborsArr = cell.neighborsCoord;
    let count = 0;

    for (let i = 0; i < neighborsArr.length; i++) {
        let { 0: x, 1: y } = neighborsArr[i];
        let cell = grid[x][y];

        if (cell.status === 1) {
            count++;
        }
    }

    return count;
}

/**
 * Function to show the generation number.
 */
function showGen() {
    let genTitle = document.getElementById('gen');
    genTitle.innerText = `Generation - ${gen}`;
}

// Assigning event listeners to Start and Stop buttons.
const start = document.getElementById('btnStart');
start.onclick = () => {
    y = document.getElementById('width').value;
    x = document.getElementById('height').value;

    if (x >= 3 && x <= 21 && y >= 3 && y <= 21) {
        fillArray();
        showGen();
        timer = setInterval(() => {
            nextGen();
            gen++;
            showGen();
        }, 1000);
    }
};

const stop = document.getElementById('btnStop');
stop.onclick = () => {
    clearInterval(timer);
};
