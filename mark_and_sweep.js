// mark_and_sweep.js - Enhanced Mark and Sweep Logic with User Input

let markProbability = 0.4; // Default Probability for Mark Phase

// Perform Mark Phase - Identify Reachable Nodes
function markPhase() {
  if (!memory || memory.length === 0) {
    console.error('Error: Memory not initialized.');
    return;
  }

  memory.forEach(block => {
    block.reachable = block.status === 'used' && Math.random() < markProbability;
  });

  logMessage(`Mark Phase: Reachable nodes identified using Probability ${markProbability * 100}%.`);
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

// Update Probability Based on User Input
function updateMarkProbability(value) {
  markProbability = parseFloat(value);
  logMessage(`Mark Probability updated to ${markProbability * 100}%.`);
}

// Validate Integration
if (typeof renderMemory !== 'function' || typeof logMessage !== 'function' || typeof drawVisualization !== 'function') {
  console.error('Error: Required functions from other modules not available.');
} else {
  logMessage('Mark and Sweep functions ready to use.');
}
