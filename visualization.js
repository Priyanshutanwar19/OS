// visualization.js - Enhanced Visualizing Memory Management Results with Animations

function drawVisualization() {
  const canvas = document.getElementById('visualizationCanvas');
  if (!canvas) {
    console.error('Error: Canvas element not found!');
    return;
  }

  const ctx = canvas.getContext('2d');

  if (!memory || memory.length === 0) {
    console.error('Error: Memory not initialized.');
    return;
  }

  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const blockWidth = canvas.width / memory.length;
  const blockHeight = canvas.height / 2;

  // Draw each block with status and color
  memory.forEach((block, index) => {
    ctx.fillStyle = block.status === 'free' ? '#d1d1d1' : block.reachable ? '#4CAF50' : '#F44336';

    // Add transition animation effect
    ctx.globalAlpha = block.status === 'free' ? 0.5 : 1;
    ctx.fillRect(index * blockWidth, canvas.height / 4, blockWidth - 2, blockHeight);

    // Block Labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(`Block ${block.id}`, index * blockWidth + 5, canvas.height / 4 + 20);
  });

  logMessage('Visualization Updated.');
}

// Update Visualization after Sweep Phase with Smooth Animation
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

  // Apply visualization update with a slight delay for effect
  setTimeout(drawVisualization, 500);
}

// Ensure Visualization on Mark and Sweep Completion
function startSimulation() {
  initializeMemory();
  markPhase();
  sweepPhase();
  drawVisualization();
  logMessage('Simulation Completed and Visualized.');
}
