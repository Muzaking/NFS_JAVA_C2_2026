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

// 1. Select the HTML elements
const eventList = document.getElementById("eventList");
const statusText = document.getElementById("statusText");

// 2. Loop through the events array
events.forEach(event => {
  
  // 3. Create a new list item (<li>) for each event
  const listItem = document.createElement("li");

  // 4. Construct the base display string
  let displayText = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;

  // 5. Challenge Task: Check if seats are below 50 and add text
  if (event.availableSeats < 50) {
    displayText += " - Limited seats";
  }

  // 6. Insert the text into the <li> and append it to the <ul>
  listItem.textContent = displayText;
  eventList.appendChild(listItem);
});

// 7. Update the status text with the total number of events
statusText.textContent = `${events.length} event(s) displayed.`;