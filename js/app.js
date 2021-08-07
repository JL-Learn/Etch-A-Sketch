const randNum = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const pad = document.querySelector(".pad");
const toggleGrid = document.querySelector(".toggle-grid-gap");
const reset = document.querySelector(".reset");
const button2s = document.querySelectorAll(".button2");
const input = document.querySelector("input");
const outputs = document.querySelectorAll("output");
const blackColor = document.querySelector(".black");
const rainbowColor = document.querySelector(".rainbow");
const picker = document.querySelector(".picker");
const eraser = document.querySelector(".eraser");
const customColor = document.querySelector(".picked-color");
const backColor = document.querySelector(".background-color");
const backColorPicker = document.querySelector(".background-color-picker");
const span = document.querySelector("span");

let ultimateBackColor = "#cccccc";
let isDrawing = false;
let color = "rainbow";

// Definindo a Grid.
setGrid(input.value);

// Eventos 

// Slider
input.addEventListener("input", () => {
    ultimateBackColor = backColor.value;
    for(let output of outputs) {
        output.innerText = input.value;
    }
});

input.addEventListener("change", () => {
    while(pad.lastElementChild) {
        pad.removeChild(pad.lastElementChild);
    }
    setGrid(input.value);
});

toggleGrid.addEventListener("click", () => {
    gridToggle();
    toggleGrid.classList.toggle('selected');
});

reset.addEventListener("click", eraseAll);

window.addEventListener('mousedown', () => {
    isDrawing = true;
});

window.addEventListener('mouseup', () => {
    isDrawing = false;
});

blackColor.addEventListener("click", () => {
    color = "black";
});

rainbowColor.addEventListener("click", () => {
    color = "rainbow";
});

picker.addEventListener("click", () => {
    color = "custom";
});

eraser.addEventListener("click", () => {
    color = "eraser";
});

// Define o Grid.
function setGrid(grid) {
    backColorPicker.style.backgroundColor = "";
    span.innerText = "Cor Fundo: ";
    pad.style.cssText = `grid-template: repeat(${grid}, 1fr) / repeat(${grid}, 1fr)`;
    let bC = backColor.value;

    for(let i = 1; i <= grid * grid; i++) {
        const div = document.createElement('div');
        div.style.backgroundColor = bC;
        pad.appendChild(div);
        div.addEventListener('mouseover', () => {

            if(isDrawing) {
                chooseBrush(div);
            }
        });
        div.addEventListener('mousedown', () => {
            chooseBrush(div);
        });
    }
}

// Seleção de Pincel.
function chooseBrush(div) {
    switch(color) {
        case "rainbow":
            rainbow(div);
            break;
        case "black":
            black(div);
            break;
        case "custom":
            custom(div);
            break;
        case "eraser":
            erase(div);
    }
}

// Modo multi cor.
function rainbow(div) {
    const r = randNum(0, 255);
    const g = randNum(0, 255);
    const b = randNum(0, 255);
    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function black(div) {
    div.style.backgroundColor = "black";
}

function custom(div) {
    div.style.backgroundColor = customColor.value;
}

function erase(div) {
    div.style.backgroundColor = ultimateBackColor;
}

// Apaga tudo.
function eraseAll() {
    ultimateBackColor = backColor.value;
    const divs = pad.querySelectorAll("div");
    span.innerText = "Cor Fundo: ";
    backColorPicker.style.backgroundColor = "";

    for(let div of divs) {
        div.style.backgroundColor = backColor.value;
    }
}

backColor.addEventListener("change", () => {
    span.innerText = "Click/Deslize p/ mudar";
    backColorPicker.style.backgroundColor = backColor.value;
});

backColorPicker.addEventListener("click", changeBackColor);

// Muda a cor de fundo.
function changeBackColor() {
    const divs = pad.querySelectorAll("div");
    backColorPicker.style.backgroundColor = "";
    span.innerText = "Cor Fundo: ";
    span.style.fontSize = "inherit";
    span.style.color = "inherit";
    ultimateBackColor = backColor.value;

    for(let div of divs) {
        div.style.backgroundColor = backColor.value;
    }
}

// Altera tamanho da Grid.
function gridToggle() {
    pad.classList.toggle('grid-gap');
}