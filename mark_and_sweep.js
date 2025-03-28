// mark_and_sweep.js - Implementing Mark and Sweep Logic

// Perform Mark Phase - Identify Reachable Nodes
function markPhase() {
  if (!memory || memory.length === 0) {
    console.error('Error: Memory not initialized.');
    return;
  }

  memory.forEach(block => {
    block.reachable = block.status === 'used' && Math.random() > 0.4;
  });

  logMessage('Mark Phase: Reachable nodes identified.');
  renderMemory();
}

// Perform Sweep Phase - Free Unreachable Nodes
function sweepPhase() {
  if (!memory || memory.length === 0) {
    console.error('Error: Memory not initialized.');
    return;
  }

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

// Ensure correct integration with memory_management.js
if (typeof renderMemory !== 'function' || typeof logMessage !== 'function' || typeof drawVisualization !== 'function') {
  console.error('Error: Required functions from other modules not available.');
}
