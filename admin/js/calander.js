
feather.replace();

const calendarGrid = document.getElementById("calendarGrid");
const currentMonthElement = document.getElementById("currentMonth");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

let currentDate = new Date();

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  currentMonthElement.textContent = new Date(year, month, 1).toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  );

  calendarGrid.innerHTML = "";

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-weekday");
    dayElement.textContent = day;
    calendarGrid.appendChild(dayElement);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < (firstDay + 6) % 7; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-day");
    calendarGrid.appendChild(emptyDay);
  }
  const today = new Date(); // Get today's date
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");
    dayElement.textContent = day;
    if (year === todayYear && month === todayMonth && day === todayDate) {
      dayElement.classList.add("selected");
    }
    dayElement.addEventListener("click", () => selectDay(dayElement));
    calendarGrid.appendChild(dayElement);
  }
}

function selectDay(dayElement) {
  const selectedDay = document.querySelector(".calendar-day.selected");
  if (selectedDay) {
    selectedDay.classList.remove("selected");
  }
  dayElement.classList.add("selected");

  // Retrieve selected day, month, and year
  const day = dayElement.textContent.padStart(2, "0"); // Ensure two digits for the day
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits for the month

  // Format the selected date as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate); // Print in YYYY-MM-DD format

}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();