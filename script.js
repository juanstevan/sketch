const board = document.querySelector('#whiteboard');

let pixel = 16
let pixelTotal = (board.clientWidth / pixel) * (board.clientHeight / pixel);

console.log(`Total Pixels: ${pixelTotal}`);
for (let i = 0; i < pixelTotal; i++) {
    let pixelDiv = document.createElement('div');
    pixelDiv.classList.add('pixel');

    pixelDiv.style.height = `${pixel}px`;
    pixelDiv.style.width = `${pixel}px`;

    board.appendChild(pixelDiv);
}
