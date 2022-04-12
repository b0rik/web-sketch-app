// Get elements
const canvas = document.querySelector('.canvas');
const clearButton = document.getElementById('btn-clear');
const blackButton = document.getElementById('btn-black');
const rainbowButton = document.getElementById('btn-rainbow');
const grayscaleButton = document.getElementById('btn-grayscale');
const resizeButton = document.getElementById('btn-resize');

// Params
const MAX_SIZE = 64;
let size = 16;
let color = 'black';
let mode = 'black';

//add event listeners to buttons
clearButton.addEventListener('click', () => clear());
blackButton.addEventListener('click', () => setBlack());
rainbowButton.addEventListener('click', () => setRainbow());
grayscaleButton.addEventListener('click', () => setGrayscale());
resizeButton.addEventListener('click', () => resize());

// main
blackButton.classList.add('btn-active');
init();

// functions
function init() { 
    //set grid size
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    //create grid blocks
    for (let i = 0; i < size * size; i++) {
        let block = document.createElement('div');

        //add event listener to block
        block.addEventListener('mouseover', e => paint(e));

        //add block to grid
        canvas.appendChild(block);
    }
}

//remove all the block from the grid
function clearChildren() {
    while(canvas.lastChild) {
        canvas.removeChild(canvas.lastChild);
    }
}

//clear the canvas and prompts for new size creating a new canvas with the new size
function clear() {
    clearChildren();
    init();

    if(mode === 'grayscale') blackBlocks();
}

//paint hovered block
function paint(e) {
    if (mode === 'black') {
        e.target.style.backgroundColor = color;
    }
    else if (mode === 'rainbow') {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else {
        e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
    }
}

//remove active class from all buttons
function clearActive() {
    let buttons = document.querySelectorAll('.panel button');
    buttons.forEach(button => {
        button.classList.remove('btn-active');
    });
}

//set mode to black color
function setBlack() {
    mode = 'black';

    clearActive();
    blackButton.classList.add('btn-active');

    clear();
}

//set mode to rainbow color
function setRainbow() {
    mode = 'rainbow';
    
    clearActive();
    rainbowButton.classList.add('btn-active');

    clear();
}

function blackBlocks() {
    let blocks = document.querySelectorAll('.canvas div');
    blocks.forEach(block => {
        block.style.backgroundColor = 'black';
        block.style.opacity = '0';
    });
}

//set mode to grayscale paint
function setGrayscale() {
    mode = 'grayscale';
    
    clearActive();
    grayscaleButton.classList.add('btn-active');

    clear();
    blackBlocks()
}

//resize the canvas
function resize() {
    size = prompt('Please enter new size(1-64):');
    
    if(size === undefined || size < 1 || size > MAX_SIZE) size = 16;

    clear();
    init();

    if(mode === 'grayscale') {
        setGrayscale();
    }
}