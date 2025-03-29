// script.js - Simulation Controls for Mark and Sweep with Adjustable Options

let simulationInterval;
let simulationPaused = false;
let memory = [];

// Initialize Memory Blocks
function initializeMemory(memorySize = 20, markProbability = 0.4) {
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
function markPhase(markProbability = 0.4) {
  memory.forEach(block => {
    block.reachable = block.status === 'used' && Math.random() < markProbability;
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

// Start Simulation with Adjustable Settings
function startSimulation() {
  const memorySize = parseInt(document.getElementById('memorySize').value);
  const markProbability = parseFloat(document.getElementById('markProbability').value) / 100;

  if (isNaN(memorySize) || memorySize <= 0 || memorySize > 500) {
    logMessage('Invalid memory size. Please enter a number between 1 and 500.');
    return;
  }

  if (isNaN(markProbability) || markProbability < 0 || markProbability > 1) {
    logMessage('Invalid mark probability. Please enter a value between 0 and 100.');
    return;
  }

  initializeMemory(memorySize, markProbability);
  clearLogs();
  logMessage(`Simulation Started with Memory Size: ${memorySize}, Mark Probability: ${markProbability * 100}%`);
  markPhase(markProbability);
  simulationInterval = setTimeout(() => sweepPhase(), 1500);
}

// Step-by-Step Simulation
function stepSimulation() {
  if (simulationPaused) {
    logMessage('Simulation Resumed.');
    simulationPaused = false;
    markPhase();
    setTimeout(() => sweepPhase(), 1500);
  } else {
    logMessage('Performing Step...');
    markPhase();
    sweepPhase();
  }
}

// Pause Simulation
function pauseSimulation() {
  if (simulationInterval) {
    clearTimeout(simulationInterval);
    simulationPaused = true;
    logMessage('Simulation Paused.');
  }
}

// Reset Simulation
function resetSimulation() {
  clearTimeout(simulationInterval);
  simulationPaused = false;
  initializeMemory();
  clearLogs();
  logMessage('Simulation Reset.');
}

// Clear Logs
function clearLogs() {
  const logOutput = document.getElementById('log-output');
  if (logOutput) logOutput.innerHTML = '';
}

// Validate Functions and Dependencies
window.onload = function () {
  if (
    typeof initializeMemory !== 'function' ||
    typeof markPhase !== 'function' ||
    typeof sweepPhase !== 'function' ||
    typeof renderMemory !== 'function' ||
    typeof logMessage !== 'function'
  ) {
    console.error('Error: Missing necessary functions. Ensure all JS files are correctly linked.');
    alert('Error: Script dependencies missing. Please check script loading order.');
  } else {
    logMessage('Scripts loaded successfully. Ready to start the simulation!');
  }
};
