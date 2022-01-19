const canvas = document.getElementById("jsCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event){
const x = event.offsetX;
const y = event.offsetY;
if(!painting){
ctx.moveTo(x,y);
ctx.beginPath();
}else if(painting){
ctx.lineTo(x,y);
ctx.stroke();
}
}

function startPainting(){
painting = true;
}

function stopPainting(){
painting = false;
}

function leaveMouse(){
ctx.closePath();
}

function enterMouse(){
ctx.beginPath();
}

if(canvas){
canvas.addEventListener("mousemove" , onMouseMove);
canvas.addEventListener("mousedown" , startPainting);
canvas.addEventListener("mouseup" , stopPainting);
canvas.addEventListener("mouseleave", leaveMouse);
canvas.addEventListener("mouseenter", enterMouse);
}