// Simple 2D-Drawing demo,
// slightly adapted version of https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

// Get drawing context
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

// HOW to draw
ctx.strokeStyle="red";
ctx.lineWidth=4;
ctx.lineCap="round";

// WHAT to draw
ctx.beginPath();
ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
ctx.moveTo(110, 75);
ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
ctx.stroke();
