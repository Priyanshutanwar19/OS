// memory_management.js - Enhanced Memory Management for Mark and Sweep Simulation

let memory = [];
let memorySize = 20;
let markProbability = 0.4;

// Initialize Memory Blocks
function initializeMemory(size = 20, probability = 0.4) {
  memorySize = size;
  markProbability = probability;
  memory = [];
  for (let i = 0; i < memorySize; i++) {
    memory.push({
      id: i,
      status: Math.random() > 0.3 ? 'used' : 'free',
      reachable: false
    });
  }
  logMessage(`Memory Initialized with ${memorySize} blocks and Mark Probability ${markProbability * 100}%`);
  renderMemory();
}

// Perform Mark Phase - Identify Reachable Blocks
function markPhase() {
  memory.forEach(block => {
    block.reachable = block.status === 'used' && Math.random() < markProbability;
  });
  logMessage('Mark Phase Complete: Reachable blocks identified.');
  renderMemory();
}

// Perform Sweep Phase - Free Unreachable Blocks
function sweepPhase() {
  memory = memory.map(block => {
    if (block.status === 'used' && !block.reachable) {
      return { ...block, status: 'free' };
    }
    return block;
  });
  logMessage('Sweep Phase Complete: Unreachable blocks cleaned up.');
  renderMemory();
  drawVisualization();
}

// Render Memory Blocks to Display
function renderMemory() {
  const container = document.getElementById('memory-view');
  if (!container) return;
  container.innerHTML = '';

  memory.forEach(block => {
    const div = document.createElement('div');
    div.className = `memory-block ${block.status} ${block.reachable ? 'reachable' : ''}`;
    div.textContent = `Block ${block.id}`;
    container.appendChild(div);
  });
}

// Log Simulation Messages
function logMessage(message) {
  const logOutput = document.getElementById('log-output');
  if (!logOutput) return;
  const logEntry = document.createElement('p');
  logEntry.textContent = message;
  logOutput.appendChild(logEntry);
}

// Start the Simulation
function startSimulation() {
  const sizeInput = parseInt(document.getElementById('memorySize').value);
  const probInput = parseFloat(document.getElementById('markProbability').value) / 100;

  if (sizeInput > 0 && sizeInput <= 500) memorySize = sizeInput;
  if (probInput >= 0 && probInput <= 1) markProbability = probInput;

  initializeMemory(memorySize, markProbability);
  logMessage('Starting Simulation...');
  markPhase();
  setTimeout(() => sweepPhase(), 1500);
}

// Reset Simulation
function resetSimulation() {
  initializeMemory();
  logMessage('Memory Reset Completed.');
}

// Step-by-Step Simulation
function stepSimulation() {
  markPhase();
  setTimeout(() => sweepPhase(), 1500);
}

// Pause Simulation
function pauseSimulation() {
  logMessage('Simulation Paused.');
}

// Validate Functions and Dependencies
window.onload = function () {
  logMessage('Scripts loaded successfully. Ready to start the simulation!');
};
