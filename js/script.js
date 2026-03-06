// ================================
// GENERAL FUNCTIONS
// ================================

// Show message alert
function showMessage() {
    alert("Thank you for choosing CarZone!");
}

// Show car details
function showDetails(carName) {
    alert(carName + " is available!\n\nPlease contact us for more details.");
}

// Toggle social links
function toggleSocial() {
    const social = document.getElementById("socialSection");
    const btn = document.getElementById("toggleSocialBtn");

    if (!social || !btn) return;

    if (social.style.display === "none") {
        social.style.display = "block";
        btn.innerText = "Hide Social Links";
    } else {
        social.style.display = "none";
        btn.innerText = "Show Social Links";
    }
}

// ================================
// FEEDBACK FUNCTIONS
// ================================

let selectedRating = 0;

// Set star rating
function setRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll(".stars span");

    stars.forEach((star, index) => {
        star.style.color = index < rating ? "gold" : "gray";
    });
}

// Submit feedback
function submitFeedback() {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || message === "" || selectedRating === 0) {
        alert("Please fill all fields and select rating!");
        return;
    }

    const feedback = {
        name: name,
        rating: selectedRating,
        message: message
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    alert("Feedback submitted successfully!");

    // Reset form
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    selectedRating = 0;
    document.querySelectorAll(".stars span").forEach(star => star.style.color = "gray");

    // Redirect to home page
    window.location.href = "index.html";
}

// ================================
// DELETE FEEDBACK
// ================================

function deleteFeedback(index) {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.splice(index, 1); // remove feedback at index
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    window.location.reload(); // refresh to update testimonials
}

// ================================
// LOAD TESTIMONIALS ON HOME PAGE
// ================================

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("testimonials");
    if (!container) return;

    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    if (feedbacks.length === 0) {
        container.innerHTML = "<p>No feedback yet. Be the first to share!</p>";
        return;
    }

    feedbacks.forEach((fb, index) => {
        const card = document.createElement("div");
        card.className = "testimonial-card";

        const stars = "★".repeat(fb.rating) + "☆".repeat(5 - fb.rating);

        card.innerHTML = `
            <div class="rating">${stars}</div>
            <p>"${fb.message}"</p>
            <h4>- ${fb.name}</h4>
            <span class="delete-btn" onclick="deleteFeedback(${index})">&times;</span>
        `;

        container.appendChild(card);
    });
});