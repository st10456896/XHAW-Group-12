
document.getElementById('estimateBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const contactNumber = document.getElementById('contact-number').value.trim();
    const email = document.getElementById('email').value.trim();
    const selectedCourses = Array.from(document.querySelectorAll('input[name="course"]:checked'));

    const nameError = document.getElementById('nameError');
    const contactError = document.getElementById('contactError');
    const emailError = document.getElementById('emailError');
    const coursesError = document.getElementById('coursesError');

    // Clear previous errors
    clearErrors([nameError, contactError, emailError, coursesError]);

    let isValid = true;

    // Validation checks
    if (!name) {
        setError(nameError, 'Name is required.');
        isValid = false;
    }

    if (!contactNumber) {
        setError(contactError, 'Phone number is required.');
        isValid = false;
    } else if (!/^\d+$/.test(contactNumber)) {
        setError(contactError, 'Phone number must be numeric.');
        isValid = false;
    }

    if (!email) {
        setError(emailError, 'Email is required.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setError(emailError, 'Invalid email format.');
        isValid = false;
    }

    if (selectedCourses.length === 0) {
        setError(coursesError, 'Please select at least one course.');
        isValid = false;
    }

    if (isValid) {
        displayInvoice(selectedCourses);
    } else {
        document.getElementById('result').style.display = 'none';
    }
});

// Helper function to clear previous error messages
function clearErrors(elements) {
    elements.forEach(el => el.textContent = '');
}

// Helper function to set error message with matching colors
function setError(element, message) {
    element.textContent = message;
    element.style.color = '#FF4C4C'; // Error text in red
}

// Function to display the invoice with calculated fees and VAT
function displayInvoice(selectedCourses) {
    let totalAmount = selectedCourses.reduce((sum, course) => sum + parseInt(course.dataset.price), 0);
    const vat = totalAmount * 0.15;
    const finalAmount = totalAmount + vat;

    document.getElementById('selectedCourses').textContent = 
        `Selected Courses: ${selectedCourses.map(c => c.value).join(', ')}`;
    document.getElementById('totalAmount').textContent = `Total: R${totalAmount}`;
    document.getElementById('vat').textContent = `VAT (15%): R${vat.toFixed(2)}`;
    document.getElementById('finalAmount').textContent = `Final Amount (Including VAT): R${finalAmount.toFixed(2)}`;

    // Show the invoice section
    const result = document.getElementById('result');
    result.style.display = 'block';
    result.style.backgroundColor = '#1A2530'; // Matching invoice background color
}
