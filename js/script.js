const destinationGrid = document.getElementById("destinationGrid");
const destinationSearch = document.getElementById("destinationSearch");

function displayDestinations(destinationList = destinations) {
    destinationGrid.innerHTML = "";

    if (destinationList.length === 0) {
        destinationGrid.innerHTML = `
            <p class="no-results">
                No destinations found. Try a different search.
            </p>
        `;
        return;
    }

    destinationList.forEach(destination => {
        const card = document.createElement("article");

        card.className = "destination-card";
        card.dataset.id = destination.id;

        card.innerHTML = `
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>

            <div class="destination-info">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>

                <div class="destination-meta">
                    <span>${destination.category}</span>
                    <span>${destination.budget}</span>
                </div>

                <button class="details-button" data-id="${destination.id}">
                    View Details
                </button>
            </div>
        `;

        destinationGrid.appendChild(card);
    });

    addDetailsListeners();
}

function addDetailsListeners() {
    const buttons = document.querySelectorAll(".details-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const destinationId = Number(button.dataset.id);

            const destination = destinations.find(
                destination => destination.id === destinationId
            );

            showDestinationDetails(destination);
        });
    });
}

function showDestinationDetails(destination) {
    const modal = document.getElementById("destinationModal");

    document.getElementById("modalImage").src = destination.image;
    document.getElementById("modalImage").alt = destination.name;

    document.getElementById("modalTitle").textContent = destination.name;

    document.getElementById("modalCountry").textContent =
        `Country: ${destination.country}`;

    document.getElementById("modalCategory").textContent =
        `Category: ${destination.category}`;

    document.getElementById("modalBudget").textContent =
        `Budget: ${destination.budget}`;

    document.getElementById("modalDescription").textContent =
        destination.description;

    modal.classList.add("show");
}

function closeDestinationModal() {
    const modal = document.getElementById("destinationModal");
    modal.classList.remove("show");
}

function searchDestinations() {
    const searchTerm = destinationSearch.value.toLowerCase().trim();

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm) ||
        destination.country.toLowerCase().includes(searchTerm) ||
        destination.description.toLowerCase().includes(searchTerm)
    );

    displayDestinations(filteredDestinations);
}

destinationSearch.addEventListener("input", searchDestinations);

displayDestinations();