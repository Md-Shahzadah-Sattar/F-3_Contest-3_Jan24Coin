const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data using .then
fetch(apiUrl)
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error("Error fetching data:", error));

// Fetch data using async/await
async function fetchDataAsync() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Render the table
function renderTable(data) {
    const tableBody = document.getElementById("cryptoTableBody");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach(coin => {
        const row = tableBody.insertRow();

        // Extract properties from the coin object
        const {image, name, symbol, current_price, total_volume } = coin;
        const marketCap = coin.market_cap;
        const percentageChange = coin.price_change_percentage_24h;

        // Add data to the table cells
        // row.insertCell().innerText = image;
         // Add data to the table cells
        const imgCell = row.insertCell();
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = name;
        imgElement.width = 30;
        imgCell.appendChild(imgElement);
        row.insertCell().innerText = name;
        row.insertCell().innerText = symbol;
        row.insertCell().innerText = current_price;
        row.insertCell().innerText = total_volume;
        row.insertCell().innerText = marketCap;
        row.insertCell().innerText = percentageChange;
    });
}

// Search functionality
function search() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    const filteredData = originalData.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredData);
}

// Sort functionality
let originalData;

function sortBy(key) {
    const sortedData = [...originalData];

    sortedData.sort((a, b) => {
        if (key === 'marketCap') {
            return b.market_cap - a.market_cap;
        } else if (key === 'percentageChange') {
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }

        return 0;
    });

    renderTable(sortedData);
}

// Initial data fetch
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        originalData = data;
        renderTable(data);
    })
    .catch(error => console.error("Error fetching data:", error));
