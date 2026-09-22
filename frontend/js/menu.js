
const API_URL = 'http://localhost:500/api/menu';

async function fetchMenu() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch menu');
        }

        const data = await response.json();

        console.log('Menu Data:', data.menuItems);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchMenu();