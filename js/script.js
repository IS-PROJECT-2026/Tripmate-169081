const destinationGrid = document.getElementById("destinationGrid");

function displayDestinations() {
    destinationGrid.innerHTML = "";

    destinations.forEach(destination => {
        const card = document.createElement("article");

        card.className = "destination-card";

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
            </div>
        `;

        destinationGrid.appendChild(card);
    });
}

displayDestinations();