import { useEffect, useState } from 'react';

export function Cars() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/cars', {
            credentials: 'include' // If sessions or cookies are being managed
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error.message);
        });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>Liste des voitures</h3>
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map(car => (
                        <ul key={car.id}>
                            <li>Marque : {car.marque}</li>
                            <li>Description : {car.description}</li>
                            <li>Prix à l'heure : {car.prix}</li>
                            <li>Type : {car.type}</li>
                            <li>Puissance Fiscal : {car.puissance}</li>
                            <li>Consommation km/h : {car.consomation} l</li>
                            <li>Pollution : {car.pollution}</li>
                            <li>Carburant : {car.carburant}</li>
                            <li>Climatisation : {car.climatisation}</li>
                        </ul>
                    ))}
                </ul>
            )}
        </div>
    );
}