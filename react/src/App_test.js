import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        // Replace with the URL of your PHP API endpoint
        const apiUrl = 'http://127.0.0.1:8000/api/test';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>PHP to React Example</h1>
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
        </div>
    );
}

export default App;
