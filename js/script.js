const destinationGrid = document.getElementById("destinationGrid");
const destinationSearch = document.getElementById("destinationSearch");
const categoryFilter = document.getElementById("categoryFilter");
const budgetFilter = document.getElementById("budgetFilter");


// =====================================================
// DESTINATIONS
// =====================================================

function displayDestinations(destinationList = destinations) {
    destinationGrid.innerHTML = "";

    if (destinationList.length === 0) {
        destinationGrid.innerHTML = `
            <p class="no-results">
                No destinations found. Try a different search or filter.
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


// =====================================================
// DESTINATION DETAILS
// =====================================================

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

    document.getElementById("modalTitle").textContent =
        destination.name;

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


// =====================================================
// DESTINATION SEARCH & FILTERING
// =====================================================

function filterDestinations() {

    const searchTerm =
        destinationSearch.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedBudget =
        budgetFilter.value;


    const filteredDestinations = destinations.filter(destination => {

        const matchesSearch =
            destination.name.toLowerCase().includes(searchTerm) ||
            destination.country.toLowerCase().includes(searchTerm) ||
            destination.description.toLowerCase().includes(searchTerm);


        const matchesCategory =
            selectedCategory === "all" ||
            destination.category === selectedCategory;


        const matchesBudget =
            selectedBudget === "all" ||
            destination.budget === selectedBudget;


        return (
            matchesSearch &&
            matchesCategory &&
            matchesBudget
        );
    });


    displayDestinations(filteredDestinations);
}


destinationSearch.addEventListener(
    "input",
    filterDestinations
);

categoryFilter.addEventListener(
    "change",
    filterDestinations
);

budgetFilter.addEventListener(
    "change",
    filterDestinations
);


displayDestinations();


// =====================================================
// TRIP CREATION
// =====================================================

const tripForm = document.getElementById("tripForm");
const tripPreview = document.getElementById("tripPreview");
const tripMessage = document.getElementById("tripMessage");


tripForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const tripName =
        document.getElementById("tripName").value.trim();

    const tripDestination =
        document.getElementById("tripDestination").value;

    const startDate =
        document.getElementById("startDate").value;

    const endDate =
        document.getElementById("endDate").value;


    // Validate dates

    if (new Date(endDate) < new Date(startDate)) {

        tripMessage.textContent =
            "End date cannot be before the start date.";

        return;
    }


    const start = new Date(startDate);
    const end = new Date(endDate);


    // Calculate trip duration

    const differenceInTime = end - start;

    const differenceInDays =
        Math.ceil(
            differenceInTime /
            (1000 * 60 * 60 * 24)
        ) + 1;


    // Generate itinerary

    generateItinerary(
        start,
        differenceInDays
    );


    // Display trip preview

    tripPreview.innerHTML = `
        <div class="trip-card">

            <h3>${tripName}</h3>

            <p>
                <strong>Destination:</strong>
                ${tripDestination}
            </p>

            <p>
                <strong>Dates:</strong>
                ${startDate} to ${endDate}
            </p>

            <p class="trip-duration">
                Duration: ${differenceInDays} day(s)
            </p>

        </div>
    `;


    tripMessage.textContent =
        "Trip created successfully!";


    tripForm.reset();
});


// =====================================================
// ITINERARY GENERATION
// =====================================================

function generateItinerary(startDate, numberOfDays) {

    const itineraryContainer =
        document.getElementById("itineraryContainer");


    itineraryContainer.innerHTML = `
        <div class="itinerary-container"></div>
    `;


    const itinerary =
        itineraryContainer.querySelector(
            ".itinerary-container"
        );


    for (let day = 1; day <= numberOfDays; day++) {

        const currentDate =
            new Date(startDate);


        currentDate.setDate(
            currentDate.getDate() + (day - 1)
        );


        const formattedDate =
            currentDate.toLocaleDateString(
                "en-GB",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        itinerary.innerHTML += `
            <div class="itinerary-day">

                <h3>Day ${day}</h3>

                <p class="itinerary-date">
                    ${formattedDate}
                </p>

                <button
                    class="add-activity-button"
                    data-day="${day}">
                    + Add Activity
                </button>

                <div
                    class="activity-list"
                    id="activities-${day}">

                    <p class="no-activities">
                        No activities added yet.
                    </p>

                </div>

            </div>
        `;
    }


    addActivityListeners();
}


// =====================================================
// ADD ACTIVITIES
// =====================================================

function addActivityListeners() {

    const buttons =
        document.querySelectorAll(
            ".add-activity-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const day =
                    button.dataset.day;


                const activity =
                    prompt(
                        `Enter an activity for Day ${day}:`
                    );


                if (
                    activity === null ||
                    activity.trim() === ""
                ) {
                    return;
                }


                addActivity(
                    day,
                    activity.trim()
                );
            }
        );
    });
}


// =====================================================
// DISPLAY ACTIVITY
// =====================================================

function addActivity(day, activity) {

    const activityList =
        document.getElementById(
            `activities-${day}`
        );


    const noActivities =
        activityList.querySelector(
            ".no-activities"
        );


    if (noActivities) {
        noActivities.remove();
    }


    const activityItem =
        document.createElement("div");


    activityItem.className =
        "activity-item";


    activityItem.innerHTML = `
        <span class="activity-name">
            ${activity}
        </span>

        <div class="activity-actions">

            <button
                class="edit-activity-button">
                Edit
            </button>

            <button
                class="delete-activity-button">
                Delete
            </button>

        </div>
    `;


    activityList.appendChild(
        activityItem
    );


    addActivityActionListeners(
        activityItem
    );
}


// =====================================================
// EDIT & DELETE ACTIVITIES
// =====================================================

function addActivityActionListeners(
    activityItem
) {

    const editButton =
        activityItem.querySelector(
            ".edit-activity-button"
        );


    const deleteButton =
        activityItem.querySelector(
            ".delete-activity-button"
        );


    // Edit activity

    editButton.addEventListener(
        "click",
        () => {

            const activityName =
                activityItem.querySelector(
                    ".activity-name"
                );


            const updatedActivity =
                prompt(
                    "Edit activity:",
                    activityName.textContent
                );


            if (
                updatedActivity === null ||
                updatedActivity.trim() === ""
            ) {
                return;
            }


            activityName.textContent =
                updatedActivity.trim();
        }
    );


    // Delete activity

    deleteButton.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to delete this activity?"
                );


            if (!confirmed) {
                return;
            }


            activityItem.remove();


            const activityList =
                activityItem.parentElement;


            if (
                activityList &&
                activityList.children.length === 0
            ) {

                activityList.innerHTML = `
                    <p class="no-activities">
                        No activities added yet.
                    </p>
                `;
            }
        }
    );
}