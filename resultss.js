document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start-analysis").addEventListener("click", function() {
        document.getElementById("loading-message").style.display = "block";
        setTimeout(() => {
            document.getElementById("loading-message").style.display = "none";
            document.querySelector(".charts").style.display = "block";
            document.querySelector(".gantt-chart").style.display = "block";
            document.querySelector(".log-data").style.display = "block";
            renderResults();
            drawCharts();
        }, 2000);
    });
});

function renderResults() {
    const memoryData = JSON.parse(localStorage.getItem("memoryData")) || [];
    const resultsTable = document.getElementById("log-entries");
    const usedBefore = memoryData.filter(block => block.status === "used").length;
    const reachableCount = memoryData.filter(block => block.reachable).length;
    const freeCount = memoryData.filter(block => block.status === "free").length;
    const usedAfter = usedBefore - (usedBefore - reachableCount);
    
    document.getElementById("used-before").textContent = usedBefore;
    document.getElementById("used-after").textContent = usedAfter;

    resultsTable.innerHTML = "";
    
    memoryData.forEach((block, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>Step ${index + 1}</td>
            <td>Block ${block.id} - ${block.status}, Reachable: ${block.reachable ? 'Yes' : 'No'}</td>
        `;
        resultsTable.appendChild(row);
    });
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
