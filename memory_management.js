// memory_management.js - Memory Management for Mark and Sweep Simulation

const memorySize = 20;
let memory = [];

// Initialize Memory Blocks
function initializeMemory() {
  memory = [];
  for (let i = 0; i < memorySize; i++) {
    memory.push({
      id: i,
      status: Math.random() > 0.3 ? 'used' : 'free',
      reachable: false
    });
  }
  logMessage('Memory Initialized');
  renderMemory();
}

// Perform Mark Phase - Identify Reachable Blocks
function markPhase() {
  memory.forEach(block => {
    block.reachable = block.status === 'used' && Math.random() > 0.4;
  });
  logMessage('Mark Phase: Reachable nodes identified.');
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
  logMessage('Sweep Phase: Unreachable nodes cleaned up.');
  renderMemory();
  drawVisualization();
}

// Render Memory Blocks to Display
function renderMemory() {
  const container = document.getElementById('memory-view');
  if (!container) {
    console.error("Memory view container not found!");
    return;
  }
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
  if (!logOutput) {
    console.error("Log output container not found!");
    return;
  }
  const logEntry = document.createElement('p');
  logEntry.textContent = message;
  logOutput.appendChild(logEntry);
}

// Start the Simulation
function startSimulation() {
  initializeMemory();
  markPhase();
  sweepPhase();
  logMessage('Simulation Completed and Visualized.');
}
