// Initialize variables to store selected values
let selectedDate = '';
let selectedTimeSlot = '';
let currentCourse = '';

// Show the booking page and set the selected course
function showBooking(course) {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('bookingPage').style.display = 'block';
    document.getElementById('selectedCourse').textContent = course;
    currentCourse = course;
}

// Select a date slot and store it
function selectDate(element, date) {
    // Remove selected class from all date cards
    document.querySelectorAll(".slot-card").forEach(card => card.classList.remove("selected"));
    element.classList.add('selected'); // Mark clicked date as selected
    selectedDate = date;
    sessionStorage.setItem("selectedDate", date); // Store selected date in session storage
}

// Select a time slot and store it
function selectTime(element) {
    // Remove selected class from all time slots
    document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
    element.classList.add("selected"); // Mark clicked time as selected
    selectedTimeSlot = element.textContent;
    sessionStorage.setItem("selectedTime", selectedTimeSlot); // Store selected time in session storage
}

// Attempt to book the slot by ensuring both date and time are selected
function bookSlot() {
    const course = currentCourse;
    const date = sessionStorage.getItem("selectedDate");
    const time = sessionStorage.getItem("selectedTime");

    // Check if both date and time are selected
    if (!selectedDate || !selectedTimeSlot) {
        alert('Please select both date and time slot.');
        return;
    }

    if (!date || !time) {
        alert("Please select both a date and a time slot.");
        return;
    }
    console.log(date, time);
    // Redirect to payment page with course, date, and time as query parameters
    window.location.href = `payment.html?course=${encodeURIComponent(course)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;
}

// Display booking confirmation in the modal
function confirmBooking(course, date, time) {
    document.getElementById("bookingDetails").innerText = `Your session for ${course} on ${date} at ${time} has been booked successfully.`;
    document.getElementById("successModal").style.display = "block";
}

// Close the success modal and return to the main page
function closeModal() {
    document.getElementById("successModal").style.display = "none";
    document.getElementById("mainPage").style.display = 'block';
    document.getElementById("bookingPage").style.display = 'none';

    // Clear stored selections after closing modal
    sessionStorage.removeItem("selectedDate");
    sessionStorage.removeItem("selectedTime");

    // Reset all selections
    selectedDate = '';
    selectedTimeSlot = '';
    document.querySelectorAll('.slot-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
}
