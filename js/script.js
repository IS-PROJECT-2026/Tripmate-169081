const destinationGrid = document.getElementById("destinationGrid");
const destinationSearch = document.getElementById("destinationSearch");
const categoryFilter = document.getElementById("categoryFilter");
const budgetFilter = document.getElementById("budgetFilter");


// =====================================================
// SAVED TRIPS
// =====================================================

let trips =
    JSON.parse(
        localStorage.getItem("trips")
    ) || [];


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

        const card =
            document.createElement("article");

        card.className =
            "destination-card";

        card.dataset.id =
            destination.id;

        card.innerHTML = `
            <div class="destination-image">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                >

            </div>

            <div class="destination-info">

                <h3>${destination.name}</h3>

                <p>
                    ${destination.description}
                </p>

                <div class="destination-meta">

                    <span>
                        ${destination.category}
                    </span>

                    <span>
                        ${destination.budget}
                    </span>

                </div>

                <div class="destination-actions">

                    <button
                        class="details-button"
                        data-id="${destination.id}"
                        type="button"
                    >
                        View Details
                    </button>

                    <button
                        class="favorite-button"
                        data-id="${destination.id}"
                        type="button"
                    >
                        ♡ Favourite
                    </button>

                </div>

            </div>
        `;

        destinationGrid.appendChild(card);
    });

    addDetailsListeners();
    addFavouriteListeners();
    updateFavouriteButtons();
}


// =====================================================
// DESTINATION DETAILS
// =====================================================

function addDetailsListeners() {

    const buttons =
        document.querySelectorAll(".details-button");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const destinationId =
                    Number(button.dataset.id);

                const destination =
                    destinations.find(
                        destination =>
                            destination.id === destinationId
                    );

                if (destination) {
                    showDestinationDetails(destination);
                }
            }
        );
    });
}


function showDestinationDetails(destination) {

    const modal =
        document.getElementById("destinationModal");

    document.getElementById("modalImage").src =
        destination.image;

    document.getElementById("modalImage").alt =
        destination.name;

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

    const modal =
        document.getElementById("destinationModal");

    modal.classList.remove("show");
}


// =====================================================
// DESTINATION SEARCH & FILTERING
// =====================================================

function filterDestinations() {

    const searchTerm =
        destinationSearch.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedBudget =
        budgetFilter.value;


    const filteredDestinations =
        destinations.filter(destination => {

            const matchesSearch =
                destination.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                destination.country
                    .toLowerCase()
                    .includes(searchTerm) ||

                destination.description
                    .toLowerCase()
                    .includes(searchTerm);


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


    displayDestinations(
        filteredDestinations
    );
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


// =====================================================
// TRIP CREATION
// =====================================================

const tripForm =
    document.getElementById("tripForm");

const tripPreview =
    document.getElementById("tripPreview");

const tripMessage =
    document.getElementById("tripMessage");


tripForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const tripName =
            document
                .getElementById("tripName")
                .value
                .trim();


        const tripDestination =
            document.getElementById(
                "tripDestination"
            ).value;


        const startDate =
            document.getElementById(
                "startDate"
            ).value;


        const endDate =
            document.getElementById(
                "endDate"
            ).value;


        // Validate dates

        if (
            new Date(endDate) <
            new Date(startDate)
        ) {

            tripMessage.textContent =
                "End date cannot be before the start date.";

            return;
        }


        const start =
            new Date(startDate);

        const end =
            new Date(endDate);


        // Calculate trip duration

        const differenceInTime =
            end - start;


        const differenceInDays =
            Math.ceil(
                differenceInTime /
                (1000 * 60 * 60 * 24)
            ) + 1;


        // Create trip object

        const trip = {

            name:
                tripName,

            destination:
                tripDestination,

            startDate:
                startDate,

            endDate:
                endDate,

            duration:
                differenceInDays
        };


        // Add trip to saved trips

        trips.push(trip);


        // Save trips to localStorage

        localStorage.setItem(
            "trips",
            JSON.stringify(trips)
        );


        // Generate itinerary

        generateItinerary(
            start,
            differenceInDays
        );


        // Display trip preview

        tripPreview.innerHTML = `
    <div class="trip-summary-card">

        <div class="trip-summary-header">
            <h3>${tripName}</h3>
            <span class="trip-status">Planned</span>
        </div>

        <div class="trip-summary-details">

            <div class="trip-summary-item">
                <strong>📍 Destination</strong>
                <span>${tripDestination}</span>
            </div>

            <div class="trip-summary-item">
                <strong>📅 Start Date</strong>
                <span>${startDate}</span>
            </div>

            <div class="trip-summary-item">
                <strong>📅 End Date</strong>
                <span>${endDate}</span>
            </div>

            <div class="trip-summary-item">
                <strong>⏱️ Duration</strong>
                <span>${differenceInDays} day(s)</span>
            </div>

            <div class="trip-summary-item">
                <strong>💰 Budget</strong>
                <span id="tripSummaryBudget">
                    ${budgetTotal.textContent}
                </span>
            </div>

        </div>

        <div class="trip-summary-footer">

            <p>
                Your trip has been successfully planned!
            </p>

            <a
                href="#itinerary"
                class="trip-summary-button">
                View Itinerary
            </a>

        </div>

    </div>
`;


        tripMessage.textContent =
            "Trip created successfully!";


        tripForm.reset();


        // Update dashboard

        updateDashboard();
    }
);


// =====================================================
// ITINERARY GENERATION
// =====================================================

function generateItinerary(
    startDate,
    numberOfDays
) {

    const itineraryContainer =
        document.getElementById(
            "itineraryContainer"
        );


    itineraryContainer.innerHTML = `
        <div class="itinerary-container"></div>
    `;


    const itinerary =
        itineraryContainer.querySelector(
            ".itinerary-container"
        );


    for (
        let day = 1;
        day <= numberOfDays;
        day++
    ) {

        const currentDate =
            new Date(startDate);


        currentDate.setDate(
            currentDate.getDate() +
            (day - 1)
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

                <h3>
                    Day ${day}
                </h3>

                <p class="itinerary-date">
                    ${formattedDate}
                </p>

                <button
                    class="add-activity-button"
                    data-day="${day}"
                    type="button"
                >
                    + Add Activity
                </button>

                <div
                    class="activity-list"
                    id="activities-${day}"
                >

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

function addActivity(
    day,
    activity
) {

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
                class="edit-activity-button"
                type="button"
            >
                Edit
            </button>

            <button
                class="delete-activity-button"
                type="button"
            >
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

            const activityList =
                activityItem.parentElement;


            const confirmed =
                confirm(
                    "Are you sure you want to delete this activity?"
                );


            if (!confirmed) {
                return;
            }


            activityItem.remove();


            if (
                activityList &&
                activityList.querySelectorAll(
                    ".activity-item"
                ).length === 0
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


// =====================================================
// PACKING CHECKLIST
// =====================================================

const packingItemInput =
    document.getElementById(
        "packingItem"
    );

const addPackingItemButton =
    document.getElementById(
        "addPackingItem"
    );

const packingList =
    document.getElementById(
        "packingList"
    );


addPackingItemButton.addEventListener(
    "click",
    function () {

        const itemName =
            packingItemInput.value.trim();


        if (itemName === "") {
            return;
        }


        addCustomPackingItem(
            itemName
        );


        packingItemInput.value = "";

        packingItemInput.focus();


        updateDashboard();
    }
);


function addCustomPackingItem(
    itemName
) {

    const listItem =
        document.createElement("li");


    listItem.className =
        "packing-item custom-packing-item";


    listItem.innerHTML = `

        <label>

            <input type="checkbox">

            <span class="packing-item-name">
                ${itemName}
            </span>

        </label>

        <div class="packing-actions">

            <button
                type="button"
                class="edit-packing-item"
            >
                Edit
            </button>

            <button
                type="button"
                class="remove-packing-item"
            >
                Remove
            </button>

        </div>
    `;


    packingList.appendChild(
        listItem
    );
}


packingList.addEventListener(
    "click",
    function (event) {

        const packingItem =
            event.target.closest(
                ".packing-item"
            );


        if (!packingItem) {
            return;
        }


        // Remove custom item

        if (
            event.target.classList.contains(
                "remove-packing-item"
            )
        ) {

            packingItem.remove();

            updateDashboard();

            return;
        }


        // Edit custom item

        if (
            event.target.classList.contains(
                "edit-packing-item"
            )
        ) {

            const itemName =
                packingItem.querySelector(
                    ".packing-item-name"
                );


            const currentName =
                itemName.textContent.trim();


            const updatedName =
                prompt(
                    "Edit packing item:",
                    currentName
                );


            if (
                updatedName === null ||
                updatedName.trim() === ""
            ) {

                return;
            }


            itemName.textContent =
                updatedName.trim();
        }
    }
);


// =====================================================
// TRIP BUDGET CALCULATOR
// =====================================================

const calculateBudgetButton =
    document.getElementById(
        "calculateBudget"
    );

const budgetTotal =
    document.getElementById(
        "budgetTotal"
    );


calculateBudgetButton.addEventListener(
    "click",
    function () {

        const accommodation =
            Number(
                document.getElementById(
                    "accommodationCost"
                ).value
            ) || 0;


        const food =
            Number(
                document.getElementById(
                    "foodCost"
                ).value
            ) || 0;


        const transport =
            Number(
                document.getElementById(
                    "transportCost"
                ).value
            ) || 0;


        const activities =
            Number(
                document.getElementById(
                    "activitiesCost"
                ).value
            ) || 0;


        const other =
            Number(
                document.getElementById(
                    "otherCost"
                ).value
            ) || 0;


        const total =
            accommodation +
            food +
            transport +
            activities +
            other;


        budgetTotal.textContent =
            `KSh ${total.toLocaleString()}`;


        updateDashboard();
    }
);


// =====================================================
// FAVOURITE DESTINATIONS
// =====================================================

// Load saved favourites

let favouriteDestinations =
    JSON.parse(
        localStorage.getItem(
            "favouriteDestinations"
        )
    ) || [];


// =====================================================
// TOGGLE FAVOURITE
// =====================================================

function toggleFavourite(
    destinationId
) {

    const existingIndex =
        favouriteDestinations.indexOf(
            destinationId
        );


    if (existingIndex === -1) {

        favouriteDestinations.push(
            destinationId
        );

    } else {

        favouriteDestinations.splice(
            existingIndex,
            1
        );
    }


    localStorage.setItem(
        "favouriteDestinations",
        JSON.stringify(
            favouriteDestinations
        )
    );


    updateFavouriteButtons();

    updateDashboard();
}


// =====================================================
// UPDATE FAVOURITE BUTTONS
// =====================================================

function updateFavouriteButtons() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(button => {

        const destinationId =
            Number(button.dataset.id);


        if (
            favouriteDestinations.includes(
                destinationId
            )
        ) {

            button.textContent =
                "♥ Favourited";

            button.classList.add(
                "favourited"
            );

        } else {

            button.textContent =
                "♡ Favourite";

            button.classList.remove(
                "favourited"
            );
        }
    });
}


// =====================================================
// ADD FAVOURITE LISTENERS
// =====================================================

function addFavouriteListeners() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const destinationId =
                    Number(
                        button.dataset.id
                    );


                toggleFavourite(
                    destinationId
                );
            }
        );
    });
}


// =====================================================
// PERSONAL TRAVEL DASHBOARD
// =====================================================

function updateDashboard() {

    // -----------------------------------------------
    // Favourite destinations
    // -----------------------------------------------

    const dashboardFavourites =
        document.getElementById(
            "dashboardFavourites"
        );


    if (dashboardFavourites) {

        dashboardFavourites.textContent =
            favouriteDestinations.length;
    }


    // -----------------------------------------------
    // My Trips
    // -----------------------------------------------

    const dashboardTrips =
        document.getElementById(
            "dashboardTrips"
        );


    if (dashboardTrips) {

        dashboardTrips.textContent =
            trips.length;
    }


    // -----------------------------------------------
    // Trip Budget
    // -----------------------------------------------

    const dashboardBudget =
        document.getElementById(
            "dashboardBudget"
        );


    if (dashboardBudget) {

        const budgetText =
            document.getElementById(
                "budgetTotal"
            );


        if (budgetText) {

            dashboardBudget.textContent =
                budgetText.textContent;
        }
    }


    // -----------------------------------------------
    // Packing Progress
    // -----------------------------------------------

    const dashboardPacking =
        document.getElementById(
            "dashboardPacking"
        );


    if (dashboardPacking) {

        const packingItems =
            document.querySelectorAll(
                "#packingList input[type='checkbox']"
            );


        const checkedItems =
            document.querySelectorAll(
                "#packingList input[type='checkbox']:checked"
            );


        if (packingItems.length === 0) {

            dashboardPacking.textContent =
                "0%";

        } else {

            const percentage =
                Math.round(
                    (
                        checkedItems.length /
                        packingItems.length
                    ) * 100
                );


            dashboardPacking.textContent =
                `${percentage}%`;
        }
    }


    // -----------------------------------------------
    // Next Trip
    // -----------------------------------------------

    const dashboardNextTrip =
        document.getElementById(
            "dashboardNextTrip"
        );


    if (dashboardNextTrip) {

        const latestTrip =
            document.querySelector(
                ".trip-card"
            );


        if (latestTrip) {

            const tripName =
                latestTrip.querySelector("h3");


            const destination =
                latestTrip.querySelector("p");


            if (
                tripName &&
                destination
            ) {

                dashboardNextTrip.textContent =
                    `${tripName.textContent} — ${destination.textContent
                        .replace(
                            "Destination:",
                            ""
                        )
                        .trim()}`;
            }

        } else {

            dashboardNextTrip.textContent =
                "No trip planned yet.";
        }
    }
}


// =====================================================
// INITIALIZE DESTINATIONS
// =====================================================

// IMPORTANT:
// This must happen after favouriteDestinations
// has been initialized.

displayDestinations();


// =====================================================
// DASHBOARD INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    updateDashboard
    
);
loadTripSummary();


// =====================================================
// UPDATE DASHBOARD WHEN PACKING CHANGES
// =====================================================

if (packingList) {

    packingList.addEventListener(
        "change",
        updateDashboard
    );
}


// =====================================================
// INITIAL DASHBOARD UPDATE
// =====================================================

updateDashboard();
// =====================================================
// LOAD TRIP SUMMARY
// =====================================================

function loadTripSummary() {

    const tripPreview =
        document.getElementById("tripPreview");

    if (!tripPreview) {
        return;
    }

    const savedTrips =
        JSON.parse(
            localStorage.getItem("trips")
        ) || [];

    // No saved trips
    if (savedTrips.length === 0) {

        tripPreview.innerHTML = `
            <div class="trip-summary-empty">

                <h3>No Trip Created Yet</h3>

                <p>
                    Create a trip above to see your trip summary here.
                </p>

            </div>
        `;

        return;
    }

    // Get the most recently created trip
    const latestTrip =
        savedTrips[savedTrips.length - 1];

    tripPreview.innerHTML = `
        <div class="trip-summary-card">

            <div class="trip-summary-header">

                <h3>
                    ${latestTrip.name}
                </h3>

                <span class="trip-status">
                    Planned
                </span>

            </div>

            <div class="trip-summary-details">

                <div class="trip-summary-item">

                    <strong>
                        📍 Destination
                    </strong>

                    <span>
                        ${latestTrip.destination}
                    </span>

                </div>

                <div class="trip-summary-item">

                    <strong>
                        📅 Start Date
                    </strong>

                    <span>
                        ${latestTrip.startDate}
                    </span>

                </div>

                <div class="trip-summary-item">

                    <strong>
                        📅 End Date
                    </strong>

                    <span>
                        ${latestTrip.endDate}
                    </span>

                </div>

                <div class="trip-summary-item">

                    <strong>
                        ⏱️ Duration
                    </strong>

                    <span>
                        ${latestTrip.duration} day(s)
                    </span>

                </div>

                <div class="trip-summary-item">

                    <strong>
                        💰 Budget
                    </strong>

                    <span>
                        ${document.getElementById("budgetTotal")
                            ? document.getElementById("budgetTotal").textContent
                            : "KSh 0"}
                    </span>

                </div>

            </div>

            <div class="trip-summary-footer">

                <p>
                    Your trip has been successfully planned!
                </p>

                <a
                    href="#itinerary"
                    class="trip-summary-button">
                    View Itinerary
                </a>

            </div>

        </div>
    `;
}