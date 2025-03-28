// Memory Management for Mark and Sweep Simulation
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
  renderMemory();
}

// Mark Phase - Identify Reachable Blocks
function markPhase() {
  memory.forEach(block => {
    if (block.status === 'used' && Math.random() > 0.4) {
      block.reachable = true;
    }
  });
  logMessage('Mark Phase Complete: Reachable blocks identified.');
  renderMemory();
}

// Sweep Phase - Free Unreachable Blocks
function sweepPhase() {
  memory = memory.map(block => {
    if (block.status === 'used' && !block.reachable) {
      return { ...block, status: 'free' };
    }
    return block;
  });
  logMessage('Sweep Phase Complete: Unreachable blocks freed.');
  renderMemory();
}

// Render Memory Blocks to Display
function renderMemory() {
  const container = document.getElementById('memory-view');
  container.innerHTML = '';

  memory.forEach(block => {
    const div = document.createElement('div');
    div.className = `block ${block.status} ${block.reachable ? 'reachable' : ''}`;
    div.textContent = block.id;
    container.appendChild(div);
  });
}

// Log Simulation Messages
function logMessage(message) {
  const logOutput = document.getElementById('log-output');
  const logEntry = document.createElement('p');
  logEntry.textContent = message;
  logOutput.appendChild(logEntry);
}

// Start the Simulation
function startSimulation() {
  initializeMemory();
  markPhase();
  sweepPhase();
  logMessage('Simulation Completed.');
}
