let x;
let y;

let grid = [];

const calc = document.getElementById("btnCalculate");
calc.onclick = () => {
    x = document.getElementById("width").value;
    y = document.getElementById("height").value;

    fillArray();
};

function fillArray() {
    if (x <= 100 && y <= 100) {
        for (let i = 0; i < y; i++) {
            let row = [];
            for (let j = 0; j < x; j++) {
                const rand = Math.random() < 0.5 ? 0 : 1;
                row.push(rand);
            }
            grid.push(row);
        }
        show(false);
    }
}

function show(colors) {
    let table = document.createElement("table");

    for (let i = 0; i < y; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < x; j++) {
            let cell = document.createElement("td");
            let tmp = grid[i];
            cell.innerText = tmp[j];
            if (colors) {
                rand == 0
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
