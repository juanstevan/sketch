const board = document.querySelector('#board');

let pixel = 40
let boardWidth = board.clientWidth;
let boardHeight = board.clientHeight;

let pixelWidth = boardWidth / pixel;
let pixelHeight = boardHeight / pixel;
console.log(boardWidth)
let pixelTotal = pixelWidth * pixelHeight;

let actions = [];
let current = [];

// Creates all the div(pixel) in the board
for (i of Array(pixelTotal).keys()) {
    let col = (i) % pixelWidth +1;
    let row = Math.ceil((i +1) / pixelWidth);

    let pixelDiv = document.createElement('div');
    pixelDiv.classList.add('pixel');
    pixelDiv.id = `xy${col}-${row}`

    pixelDiv.style.height = `${pixel}px`;
    pixelDiv.style.width = `${pixel}px`;

    board.appendChild(pixelDiv);
}

// Handles the event when drawing in the board
function mouseMove(e) {
    const rect = board.getBoundingClientRect();

    let mouseLeft = e.clientX - Math.ceil(rect.left);
    let mouseTop = e.clientY - Math.ceil(rect.top);

    addCircle(mouseLeft, mouseTop);
}

// Makes the circle format and places it below the cursor
function addCircle(positionX, positionY) {
    let circle = [...Array(64).keys()].map(x => x+1);
    let blanks = [1, 2, 7, 8, 9, 16, 49, 56, 57, 58, 63, 64];

    circle = circle.filter(dot => !blanks.includes(dot))

    let moveX = Math.ceil(positionX / pixel) - 5;
    let moveY = Math.ceil(positionY / pixel) - 5;

    circle.forEach(dot => {
        let xLoc = (dot -1) % 8 +1 +moveX;
        let yLoc = Math.ceil(dot / 8) +moveY;

        if (xLoc > pixelWidth || yLoc > pixelWidth || xLoc < 1 || yLoc < 1) return;

        const pixelSelect = document.querySelector(`#xy${xLoc}-${yLoc}`);
        if (!current.includes(pixelSelect)) current.push(pixelSelect);
        pixelSelect.classList.add('active');
    });
}

// Makes the drawing appear only on mouse press
board.addEventListener('mouseleave', () => {
    board.dispatchEvent(new Event('click'));
});

board.addEventListener('mousedown', () => {
    board.addEventListener('mousemove', mouseMove);
});

board.addEventListener('click', () => {
    board.removeEventListener('mousemove', mouseMove);
    actions.push(current);
    current = [];
    console.log(actions[actions.lenght -1]);
});


// Buttons functionalities
const clear = document.querySelector("#clear");
const pre = document.querySelector("#pre");
const next = document.querySelector("#next");

clear.addEventListener('click', () => {
    for (pixel of board.children) {
        pixel.classList.remove("active");
    }
});
