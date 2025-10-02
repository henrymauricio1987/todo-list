import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>404 - Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
                ← Go back to Home
            </Link>
        </div>
    );
}

export default NotFound;