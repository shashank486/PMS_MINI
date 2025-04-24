
    document.getElementById('patientForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Show success message
            } else {
                alert(result.error); // Show error message
            }
        } catch (error) {
            alert('An unexpected error occurred.');
            console.error('Error:', error);
        }
    });