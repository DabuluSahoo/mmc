function loadResults() {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "<h2>Contestant Results</h2>";

    // Retrieve results from localStorage and parse them
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];

    // Sort results by score in descending order
    results.sort((a, b) => b.score - a.score);

    // Create table
    const table = document.createElement("table");
    table.classList.add("results-table");

    // Create table header
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
    `;
    table.appendChild(headerRow);

    // Populate table with sorted results
    results.forEach((result, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.name}</td>
            <td>${result.score}</td>
        `;
        table.appendChild(row);
    });

    resultsContainer.appendChild(table);
}

function clearResults() {
    localStorage.removeItem("quizResults");
    loadResults();
}

window.onload = loadResults;
