const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rows = 28;
const cols = 28;
const cellSize = 20; // 칸 크기 (크게 해서 보기 좋게)
const brushSize = 1;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let startY = 0, startX = 0;
let endY = cols-1, endX = rows-1;

let board = new Array(28);
for(let i = 0; i < 28; i++){
    board[i] = new Array(28);
}

let mode = 0; // 0:벽, 1:시작 2:끝

function restart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    startY = 0, startX = 0;
    endY = cols-1, endX = rows-1;

    for(let i = 0; i < cols; i += 1){
        for(let j = 0; j < rows; j += 1){
            board[i][j] = 0;
        }
    }

    board[startY][startX] = 1;
    board[endY][endX] = 2;

    drawMap();
}

function drawMap(){
    for(let y = 0; y < cols; y++){
        for(let x = 0; x < rows; x++){
            if(board[y][x] == 0){
                ctx.fillStyle = "white"
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

                ctx.strokeStyle = "black";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            else if(board[y][x] == 1){
                ctx.fillStyle = "red"
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

                ctx.strokeStyle = "black";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            else if(board[y][x] == 2){
                ctx.fillStyle = "blue"
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

                ctx.strokeStyle = "black";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
            else if(board[y][x] == 3){
                ctx.fillStyle = "gray"
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

                ctx.strokeStyle = "black";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }  
}

function drawWall(e){
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    board[row][col] = 3;

    drawMap();
}
function drawStart(e){
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    board[startY][startX] = 0;

    startY = row;
    startX = col;
    board[startY][startX] = 1;

    drawMap();
}
function drawEnd(e){
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    board[endY][endX] = 0;

    endY = row;
    endX = col;

    board[endY][endX] = 2;
    
    drawMap();
}

function changeMode(x){
    mode = x;
}

let drawing = false;

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    if(mode == 0) drawWall(e);
    else if(mode == 1) drawStart(e);
    else if(mode == 2) drawEnd(e);
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        if(mode == 0) drawWall(e);
        else if(mode == 1) drawStart(e);
        else if(mode == 2) drawEnd(e);
    }
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
});

restart();