const output = document.getElementById('output'); 
const canvas = document.getElementById('canvas');  
const ctx = canvas.getContext('2d');  
const rect = canvas.getBoundingClientRect();  
const addSourceButton = document.getElementById('add-source');
let sourceVisible = false;  
const startStopButton = document.getElementById('start-stop-button');  
const clearButton = document.getElementById('clear-button');  
const countInput = document.getElementById('count');  
let counting = false;  
let count = 0;  
let intervalId;  
 const materialColor = 'grey';


const noiseCanvas = document.createElement('canvas');  
noiseCanvas.width = 100;  
noiseCanvas.height = 100;  
const noiseCtx = noiseCanvas.getContext('2d');  

for (let i = 0; i < 100; i++) {  
  for (let j = 0; j < 100; j++) {  
   const randomValue = Math.random();  
   if (randomValue < 0.5) {  
    noiseCtx.fillStyle = '#808080';  
   } else {  
    noiseCtx.fillStyle = '#969696';  
   }  
   noiseCtx.fillRect(i, j, 1, 1);  
  }  
}  
const concreteTexture = ctx.createPattern(noiseCanvas, 'repeat');  
//const rectX = 0;  
//const rectY = 0;  
//const rectWidth = 100;  
//const rectHeight = 100;  
//ctx.fillStyle = '#808080';  
//const gradient = ctx.createLinearGradient(rectX, rectY, rectX, rectY + rectHeight);  
//gradient.addColorStop(0, '#969696');  
//gradient.addColorStop(1, '#808080');  
//ctx.fillStyle = gradient;  
//ctx.fillStyle = concreteTexture;  
  






const materialSelect = document.getElementById('material');  
const materials = {  
  lead: {  
   color: 'grey',  
   attenuationCoefficient: 1.2  
  },  
  aluminium: {  
   color: 'silver',  
   attenuationCoefficient: 0.2  
  },  
  gold: {  
   color: '#F6C324',  
   attenuationCoefficient: 0.5  
  },  
  concrete: {  
   color: '#808080',  
   attenuationCoefficient: 0.15,  
   texture: concreteTexture  
  }  
};

  document.getElementById('help-button').addEventListener('click', function() {  
  // Create a new div element for the floating window  
  var helpWindow = document.createElement('div');  
  helpWindow.id = 'help-window';  
  helpWindow.style.position = 'absolute';  
  helpWindow.style.top = '50%';  
  helpWindow.style.left = '50%';  
  helpWindow.style.transform = 'translate(-50%, -50%)';  
  helpWindow.style.width = '60%';  
  helpWindow.style.height = '100%';  
  helpWindow.style.background = 'white';  
  helpWindow.style.border = '1px solid black';  
  helpWindow.style.padding = '10px';  
  helpWindow.style.zIndex = '1000';
   helpWindow.style.overflow = 'auto'; 
     helpWindow.style.overflowY = 'auto'; 
  
  // Add content to the floating window  
  var helpContent = document.createElement('p');  
  helpContent.innerHTML = '<h2 style="text-align:center;">Investigating Gamma Ray Absorption</h2><p><b>Aim of the Experiment</b></p><ul><li>To investigate the absorption of gamma rays by different thicknesses of lead </li></ul><p><b>Variables:</b></p><ul><li><b>Independent variable</b> = Thickness of lead</li><li><b>Dependent variable</b> = Count rate</li><li><b>Control variables:</b><ul><li>Radioactive source</li><li>Distance of GM tube to source</li><li>Location / background radiation</li></ul></ul><p><b>Method:</b></p><ol><li>Without any sources present, measure background radiation over a fiveminute period<ol><li>Record this value</li><li>Calculate the average background rate per minute</li></ul><li>Add the radioactive source</li><li>Press, ‘Start Count’ and record the count after one minute</li><li>Clear the count and repeat step 4 a further two times, recording the count rate each time</li><li>Increase the thickness of the absorber and record</li><li>Repeat steps 3-4</li><li>Increase the thickness of the absorber and continue taking three readings per thickness</li></ol><p><b>Analysis of Results</b></p><ul><li>Correct your count rate (counts per minute) by subtracting the background count rate</li><li>Plot a graph of corrected count rate (counts per minute) against thickness of the absorber</li></ul><p><b>Extension</b></p><ul><li>Repeat the experiment for different materials</li></ul><p><b>Further Analysis</b></p><ul><li>The count rate will drop according to the equation:</li><li><b><h2>C = C<sub>0</sub>e<sup>-&mu;x</sup></h2></b></li><li>Plot a graph of <b>ln C/C<sub>0</sub></b> against <b>x</b> (thickness in cm)</li><li>The gradient will be µ, the linear attenuation coefficient of the material </li></ul>';  
  helpWindow.appendChild(helpContent);  
  
  // Add a close button to the floating window  
  var closeButton = document.createElement('button');  
  closeButton.innerHTML = 'Close';  
  closeButton.style.position = 'absolute';  
  closeButton.style.top = '20px';  
  closeButton.style.right = '10px';  
  closeButton.addEventListener('click', function() {  
   helpWindow.remove();  
  });  
  helpWindow.appendChild(closeButton);  
  
  // Add the floating window to the page  
  document.body.appendChild(helpWindow);  
});


  materialSelect.addEventListener('change', () => {  
  const selectedMaterial = materialSelect.value;  
  let materialColor = materials[selectedMaterial].color;  
  let attenuationCoefficient = materials[selectedMaterial].attenuationCoefficient;
  
  drawRectangle();  
   drawGeigerCounter();
  if (addSourceButton.textContent === 'Remove Source') {  
   drawSource();  
  }  
  ctx.fillStyle = materialColor;  

  attenuationCoefficient = attenuationCoefficient;  
});


const timerInput = document.getElementById('timer');  
let timerRunning = false;  
let timerTime = 0;  
let timerIntervalId; 
  
canvas.width = rect.width;  
canvas.height = rect.height;

const thicknessSlider = document.getElementById('thickness');  
const thicknessValue = document.getElementById('thickness-value'); 

function drawRectangle() {  
  let thickness = parseInt(document.getElementById('thickness').value);  
  const rectHeight = 100;  
  const rectWidth = thickness;  
  const rectX = (canvas.width - rectWidth) / 2;  
  const rectY = (canvas.height - rectHeight) / 2; 
   const selectedMaterial = materialSelect.value;  
  if (materials[selectedMaterial].texture) {  
   ctx.fillStyle = materials[selectedMaterial].texture;  
  } else {  
   ctx.fillStyle = materials[selectedMaterial].color;  
  }  
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  
  

  ctx.fillRect(rectX, rectY, rectWidth, rectHeight);  
}

document.getElementById('thickness').addEventListener('input', () => {  
  drawRectangle();  
  drawGeigerCounter();
  if (addSourceButton.textContent === 'Remove Source') {  
   drawSource();  
  }  
});  


drawRectangle();

 
thicknessSlider.addEventListener('input', () => {  
  thicknessValue.textContent = `${thicknessSlider.value} mm`;  
});  
  

 
function drawSource() {  
  const sourceWidth = 40;  
  const sourceHeight = 20;  
   
  const sourceX = canvas.width * 0.5 - 120;  
  const sourceY = canvas.height*0.5 -10;  
  
  const gradient = ctx.createLinearGradient(sourceX, sourceY, sourceX, sourceY + sourceHeight);  
  gradient.addColorStop(0, 'rgba(128, 0, 0, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1)'); 
  gradient.addColorStop(1, 'rgba(128, 0, 0, 1)');  
  
  ctx.fillStyle = gradient;  
  ctx.fillRect(sourceX, sourceY, sourceWidth, sourceHeight);  
}  
  

  
addSourceButton.addEventListener('click', () => {  
  
  if (addSourceButton.textContent === 'Add Source') {  
   addSourceButton.textContent = 'Remove Source';  
   //drawSource();  
    let photons = [];  
    let lastTime = 0;  
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    animateGammaPhotons();  
  } else {  
   addSourceButton.textContent = 'Add Source';  
   ctx.clearRect(0, 0, canvas.width, canvas.height);  
   drawRectangle(); 
   drawGeigerCounter();
  }  
});  
  
function drawGeigerCounter() {  
  
  const gmTubeWidth = 40;  
  const gmTubeHeight = 20;  
  const gmTubeX = canvas.width * 0.5 + 200;  
  const gmTubeY = canvas.height * 0.5 - 10;  
  
  const gradient = ctx.createLinearGradient(gmTubeX, gmTubeY, gmTubeX, gmTubeY + gmTubeHeight);  
  gradient.addColorStop(0, 'rgba(128, 128, 128, 1)'); 
  gradient.addColorStop(0.5, 'rgba(192, 192, 192, 1)');  
  gradient.addColorStop(1, 'rgba(128, 128, 128, 1)'); 
  
  ctx.fillStyle = gradient;  
  ctx.fillRect(gmTubeX, gmTubeY, gmTubeWidth, gmTubeHeight);  
  
  
  const thinTubeWidth = 20;  
  const thinTubeHeight = 40;  
  const thinTubeX = gmTubeX - thinTubeWidth;  
  const thinTubeY = gmTubeY - (thinTubeHeight - gmTubeHeight) / 2;  
  
  const thinGradient = ctx.createLinearGradient(thinTubeX, thinTubeY, thinTubeX, thinTubeY + thinTubeHeight);  
  thinGradient.addColorStop(0, 'rgba(128, 128, 128, 1)'); 
  thinGradient.addColorStop(0.5, 'rgba(192, 192, 192, 1)');  
  thinGradient.addColorStop(1, 'rgba(128, 128, 128, 1)'); 
  
  ctx.fillStyle = thinGradient;  
  ctx.fillRect(thinTubeX, thinTubeY, thinTubeWidth, thinTubeHeight);  
  
  
}
drawGeigerCounter();




  
 
  

let cumulativeCount = 0;  
  
 
function updateCount() {  
  const countInput = document.getElementById('count');  
  if (addSourceButton.textContent === 'Add Source') {  
  
   const backgroundCount = Math.random() * 0.06; 
    
    cumulativeCount += backgroundCount;  
    countInput.value = Math.floor(cumulativeCount).toString();
     
    
  } else {  
  
   const thickness = parseInt(document.getElementById('thickness').value) / 10; 
   const selectedMaterial = materialSelect.value;  
  
  const attenuationCoefficient = materials[selectedMaterial].attenuationCoefficient;
   
   const sourceCount = 6 * Math.exp(-attenuationCoefficient * thickness); 
   const backgroundCount = Math.random() * 0.6;   
   cumulativeCount += sourceCount + backgroundCount;  
   countInput.value = Math.floor(cumulativeCount).toString(); 
  }  
}


  


startStopButton.addEventListener('click', () => {  
  if (counting) {  
 
   clearInterval(intervalId);  
   counting = false;  
   startStopButton.textContent = 'Start Count';  

   clearInterval(timerIntervalId);  
   timerRunning = false;  
  } else {  

   counting = true;  
   startStopButton.textContent = 'Stop Count';  
   intervalId = setInterval(() => {  
    updateCount();  
   }, 100); 
    
    timerRunning = true;  
   timerTime = 0;  
   timerIntervalId = setInterval(() => {  
    timerTime++;  
    const minutes = Math.floor(timerTime / 60);  
    const seconds = timerTime % 60;  
    timerInput.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;  
   }, 1000); 
  }  
});  

clearButton.addEventListener('click', () => {  

  count = 0;  
  cumulativeCount=0;
  countInput.value = '0';  
  clearInterval(intervalId);  
  counting = false;  
  startStopButton.textContent = 'Start Count';  
  
  clearInterval(timerIntervalId);  
  timerRunning = false;  
  timerTime = 0;  
  timerInput.value = '00:00';  
});

let photons = [];  
let lastTime = 0;  
  
function animateGammaPhotons(time) {  

  if (addSourceButton.textContent === 'Remove Source') {  
    
   if (Math.random() < 0.1) {  
    const photon = {  
      x: canvas.width * 0.5 - 90, 
      
      y: canvas.height * 0.5 + Math.random() * 20 - 10, 
      vx: 300,  
      vy: Math.random() * 50 - 25,  
      length: 15, 
      thickness: 2, 
      color: 'grey', 
      phaseOffset: Math.random() * 2 * Math.PI,
      
    };  
     
    photons.push(photon);  
   }  
  
  
   ctx.clearRect(0, 0, canvas.width, canvas.height);  
  
   
   drawRectangle();  
   drawGeigerCounter();  
     if (addSourceButton.textContent === 'Remove Source') {  
    drawSource();  
   }  
  

  
  
 
const deltaTime = (time - lastTime) / 1000; 
lastTime = time;  
  
for (let i = 0; i < photons.length; i++) {  
  const photon = photons[i];  
  

  photon.x += photon.vx * deltaTime;  
  photon.y += photon.vy * deltaTime;  
  

ctx.beginPath();  
const amplitude = 4;  
const wavelength = 7; 
const angle = Math.atan2(photon.vy, photon.vx); 

ctx.save(); 
ctx.translate(photon.x, photon.y); 
ctx.rotate(angle); 
for (let j = 0; j < photon.length; j++) {  
  const x = j;  
  const y = amplitude * Math.sin(2 * Math.PI * j / wavelength + photon.phaseOffset);  
  if (j === 0) {  
   ctx.moveTo(x, y);  
  } else {  
   ctx.lineTo(x, y);  
  }  
}  
ctx.strokeStyle = photon.color;  
ctx.lineWidth = photon.thickness;  
ctx.stroke();  
ctx.restore(); 

   

const leadX = canvas.width * 0.5-20;  
const timeToReachLead = (leadX - photon.x) / photon.vx;  
if (photon.x >= leadX && !photon.hasPassedLead) { 
   const leadThickness = parseInt(document.getElementById('thickness').value)*0.01+0.001; 
  const selectedMaterial = materialSelect.value;  
   
  const attenuationCoefficient = materials[selectedMaterial].attenuationCoefficient; 
   const probability = Math.exp(-attenuationCoefficient * leadThickness);  
  
  const randN = Math.random();
  
   if (randN < probability) {
     photon.hasPassedLead = true;
      
  } else {  
     photons.splice(i, 1); 
   i--; 
  }  
}

  
 
  
  if (photon.x > canvas.width) { 
   photons.splice(i, 1); 
  i--;   
  }  
 
  
  
  if (photon.x> canvas.width*0.5 +170&& photon.y> canvas.height*0.5-20 && photon.y<canvas.height*0.5+20){ 
   photons.splice(i, 1); 
  i--;  
  }  
  
  
}  
  


 
   requestAnimationFrame(animateGammaPhotons);  
  }  
}