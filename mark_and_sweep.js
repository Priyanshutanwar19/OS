// mark_and_sweep.js - Implementing Mark and Sweep Logic

// Perform Mark Phase - Identify Reachable Nodes
function markPhase() {
    memory.forEach(block => {
      block.reachable = block.status === 'used' && Math.random() > 0.4;
    });
    logMessage('Mark Phase: Reachable nodes identified.');
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
    logMessage('Sweep Phase: Unreachable nodes cleaned up.');
    renderMemory();
  }
  
  // Ensure correct integration with memory_management.js
  if (typeof renderMemory !== 'function' || typeof logMessage !== 'function') {
    console.error('Error: Functions from memory_management.js not available.');
  }
  