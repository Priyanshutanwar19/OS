// Simulation Parameters
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

// Mark Phase - Simulate Reachable Blocks
function markPhase() {
  memory.forEach(block => {
    if (block.status === 'used' && Math.random() > 0.4) {
      block.reachable = true;
    }
  });
  renderMemory();
}

// Sweep Phase - Remove Unreachable Blocks
function sweepPhase() {
  memory = memory.map(block => {
    if (block.status === 'used' && !block.reachable) {
      return { ...block, status: 'free' };
    }
    return block;
  });
  renderMemory();
}

// Render Memory Blocks
function renderMemory() {
  const container = document.getElementById('memory-container');
  container.innerHTML = '';
  memory.forEach(block => {
    const div = document.createElement('div');
    div.className = `block ${block.status} ${block.reachable ? 'reachable' : ''}`;
    div.textContent = block.id;
    container.appendChild(div);
  });
}

// Start Simulation
initializeMemory();
