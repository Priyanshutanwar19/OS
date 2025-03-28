// visualization.js - Visualizing Memory Management Results

function drawVisualization() {
    const canvas = document.getElementById('visualizationCanvas');
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }
    const ctx = canvas.getContext('2d');
  
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const blockWidth = canvas.width / memory.length;
    const blockHeight = canvas.height / 2;
  
    memory.forEach((block, index) => {
      ctx.fillStyle = block.status === 'free' ? '#d1d1d1' : block.reachable ? '#4CAF50' : '#F44336';
      ctx.fillRect(index * blockWidth, canvas.height / 4, blockWidth - 2, blockHeight);
  
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(`Block ${block.id}`, index * blockWidth + 5, canvas.height / 4 + 20);
    });
  
    logMessage('Visualization Updated.');
  }
  
  // Update Visualization after Sweep Phase
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
  
  // Ensure Visualization on Mark and Sweep Completion
  function startSimulation() {
    initializeMemory();
    markPhase();
    sweepPhase();
    drawVisualization();
    logMessage('Simulation Completed and Visualized.');
  }
  