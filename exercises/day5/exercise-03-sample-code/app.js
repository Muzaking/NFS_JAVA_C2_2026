const events = [
    {
        id: "EV001",
        title: "Tech Career Fair",
        date: "2026-08-10",
        venue: "Kuala Lumpur Convention Centre",
        availableSeats: 120
    },
    {
        id: "EV002",
        title: "Web Development Bootcamp",
        date: "2026-08-15",
        venue: "Digital Learning Hub",
        availableSeats: 35
    },
    {
        id: "EV003",
        title: "AI for Business Workshop",
        date: "2026-08-20",
        venue: "Innovation Centre",
        availableSeats: 50
    }
];

// Write your code below this line

// 1. Select the elements from the HTML
const eventList = document.getElementById("eventList");
const statusText = document.getElementById("statusText");

// 2. Loop through the events array
events.forEach(event => {
    
    // 3. Create a new list item (<li>) for each event
    const listItem = document.createElement("li");

    // 4. Construct the base display string
    let displayText = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;

    // 5. Challenge Task: Check if seats are below 50 and add "Limited seats"
    if (event.availableSeats < 50) {
        displayText += " - Limited seats";
    }

    // 6. Add the text to the <li> and attach it to the <ul> on the page
    listItem.textContent = displayText;
    eventList.appendChild(listItem);
});

// 7. Update the status text with the final count
statusText.textContent = `${events.length} event(s) displayed.`;