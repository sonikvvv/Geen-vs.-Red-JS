let x;
let y;

const calc = document.getElementById("btnCalculate");
calc.onclick = () => {
    x = parseInt(document.getElementById("width").value);
    y = parseInt(document.getElementById("height").value);

    let table = document.createElement("table");

    for (let i = 0; i < y; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < x; j++) {
            const rand = Math.random() < 0.5 ? 0 : 1;
            let cell = document.createElement("td");
            cell.innerText = rand;
            // rand == 0 ? cell.classList.add("red") : cell.classList.add("green");
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const section = document.getElementById("grid");
    section.innerHTML = '';
    section.appendChild(table);
};
