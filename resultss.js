// JavaScript for handling result page interactivity and chart generation

document.addEventListener("DOMContentLoaded", function () {
    renderResults();
    drawCharts();
});

function renderResults() {
    const memoryData = JSON.parse(localStorage.getItem("memoryData")) || [];
    const resultsTable = document.getElementById("log-entries");
    const usedBefore = document.getElementById("used-before");
    const usedAfter = document.getElementById("used-after");
    
    resultsTable.innerHTML = "";
    let usedCountBefore = 0;
    let usedCountAfter = 0;
    
    memoryData.forEach((block, index) => {
        if (block.status === "used") {
            usedCountBefore++;
        }
        if (block.status === "used" && block.reachable) {
            usedCountAfter++;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>Step ${index + 1}</td>
            <td>Block ${block.id} - ${block.status}, Reachable: ${block.reachable ? 'Yes' : 'No'}</td>
        `;
        resultsTable.appendChild(row);
    });
    
    usedBefore.textContent = usedCountBefore;
    usedAfter.textContent = usedCountAfter;
}

function drawCharts() {
    const ctx = document.getElementById("memoryChart").getContext("2d");
    const memoryData = JSON.parse(localStorage.getItem("memoryData")) || [];
    
    let usedCount = memoryData.filter(block => block.status === "used").length;
    let freeCount = memoryData.filter(block => block.status === "free").length;
    let reachableCount = memoryData.filter(block => block.reachable).length;
    let unreachableCount = usedCount - reachableCount;
    
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Used Blocks", "Free Blocks", "Reachable", "Unreachable"],
            datasets: [{
                label: "Memory Distribution",
                data: [usedCount, freeCount, reachableCount, unreachableCount],
                backgroundColor: ["#4CAF50", "#ccc", "#FFA500", "#F44336"],
            }]
        }
    });
}
