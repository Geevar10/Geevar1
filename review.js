document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the rating from the radio buttons
    const rating = document.querySelector('input[name="rate"]:checked').value;
    // Get the review text
    const reviewText = document.getElementById('reviewText').value;

    // Create the review data object
    const reviewData = {
        restaurant_id: 1, // Set the restaurant ID as needed
        user_name: 'Anonymous', // Replace with actual user name if available
        rating: rating,
        review_text: reviewText,
    };

    try {
        // Send the review data to the server
        const response = await fetch('http://localhost:3000/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        // Check if the response is successful
        if (response.ok) {
            // Display the thank you message
            document.getElementById('thankYouMessage').innerText = 'Thanks for reviewing!';
            // Clear the form after submission
            document.getElementById('reviewForm').reset();
        } else {
            const errorData = await response.json();
            document.getElementById('thankYouMessage').innerText = `Error: ${errorData.message}`;
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        document.getElementById('thankYouMessage').innerText = 'An error occurred while submitting your review. Please try again.';
    }
});
