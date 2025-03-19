document.getElementById('login_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('All fields are required');
        return;
    }

    const loginEndpoints = [
        { url: 'http://localhost:8000/v1/auth/admin-login', redirect: 'admin/' },
        { url: 'http://localhost:8000/v1/auth/lecture-login', redirect: 'lecture/' }
    ];

    try {
        for (const { url, redirect } of loginEndpoints) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',  // Ensures cookies are sent with the request
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = redirect;  // Redirect to respective dashboard
                return;
            }
        }

        alert('Invalid credentials');  // If both logins fail
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again.');
    }
});
