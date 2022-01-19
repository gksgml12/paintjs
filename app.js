const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR="white"

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle = "INITIAL_COLOR";
ctx.lineWidth = "2.5;"

ctx.fillStyle="INITIAL_COLOR";
ctx.fillRect(0,0,canvas.width,canvas.height);

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();//경로 생성
        // ctx.moveTo(x,y);//선 시작 좌표
    } else {
        ctx.lineTo(x,y);//선 끝 좌표
        ctx.stroke();//선 그리기
    }
}

function stopPainting() {
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseLeave() {
    stopPainting()
}

function handleColorClick(event){
    const color =event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth = size;
}

function modeChange(event){
    if(filling===true){
        filling=false;
        mode.innerText="Fill"
    } else {
        filling=true;
        mode.innerText="Paint"
    }
    console.log(filling)
}

function handleCanvasClick(event){
    if(filling===true){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href =image;
    link.download = "Paintjs[Export]";
    link.click();
}   

if (canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM)
}

Array.from(colors).forEach(color=>
    color.addEventListener("click",handleColorClick)
    );

if(range) {
    range.addEventListener("input",handleRangeChange);
}

if(mode) {
    mode.addEventListener("click",modeChange);
}

if(saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick);
}