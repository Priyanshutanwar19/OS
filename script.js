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

// Perform Mark Phase - Identify Reachable Nodes
function markPhase() {
  memory.forEach(block => {
    block.reachable = block.status === 'used' && Math.random() > 0.4;
  });
  logMessage('Mark Phase Complete: Reachable blocks identified.');
  renderMemory();
}

// Perform Sweep Phase - Free Unreachable Nodes
function sweepPhase() {
  memory = memory.map(block => {
    if (block.status === 'used' && !block.reachable) {
      return { ...block, status: 'free' };
    }
    return block;
  });
  logMessage('Sweep Phase Complete: Unreachable blocks freed.');
  renderMemory();
  drawVisualization();
}

// Render Memory Blocks
function renderMemory() {
  const container = document.getElementById('memory-view');
  if (!container) {
    console.error('Error: memory-view element not found.');
    return;
  }
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
  if (!logOutput) {
    console.error('Error: log-output element not found.');
    return;
  }
  const logEntry = document.createElement('p');
  logEntry.textContent = message;
  logOutput.appendChild(logEntry);
}

// Start the Simulation
function startSimulation() {
  try {
    logMessage('Starting Simulation...');
    initializeMemory();
    markPhase();
    sweepPhase();
    logMessage('Simulation Completed.');
  } catch (error) {
    console.error('Simulation Error:', error);
    logMessage(`Error: ${error.message}`);
  }
}

// Reset Simulation
function resetSimulation() {
  logMessage('Resetting Simulation...');
  initializeMemory();
  logMessage('Memory Reset Completed.');
}

// Validate Functions and Dependencies
window.onload = function () {
  if (
    typeof initializeMemory !== 'function' ||
    typeof markPhase !== 'function' ||
    typeof sweepPhase !== 'function' ||
    typeof renderMemory !== 'function' ||
    typeof logMessage !== 'function' ||
    typeof drawVisualization !== 'function'
  ) {
    console.error('Error: Missing necessary functions. Ensure all JS files are correctly linked.');
    alert('Error: Script dependencies missing. Please check script loading order.');
  } else {
    logMessage('Scripts loaded successfully. Ready to start the simulation!');
  }
};
