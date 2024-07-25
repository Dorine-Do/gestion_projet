

export function Cars() {
    
    const cars = [
        { 
            id: 1,
            marque: 'toyota', 
            description: '', 
            prix : 50,
            type: 'Manuelle',
            puissance: '3w',
            consomation: '5.4',
            pollution: '....',
            carburant: 'Diesel',
            climatisation: 'Oui',
        },
        { 
            id: 2,
            marque: 'toyota', 
            description: '', 
            prix : 50,
            type: 'Manuelle',
            puissance: '3w',
            consomation: '5.4',
            pollution: '....',
            carburant: 'Diesel',
            climatisation: 'Oui',
        },
        { 
            id: 3,
            marque: 'toyota', 
            description: '', 
            prix : 50,
            type: 'Manuelle',
            puissance: '3w',
            consomation: '5.4',
            pollution: '....',
            carburant: 'Diesel',
            climatisation: 'Oui',
        },
        { 
            id: 4,
            marque: 'toyota', 
            description: '', 
            prix : 50,
            type: 'Manuelle',
            puissance: '3w',
            consomation: '5.4',
            pollution: '....',
            carburant: 'Diesel',
            climatisation: 'Oui',
        },
    
       ]

    const listCars = cars.map(car => (
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
    ));


    return (
    <div>
        <h3>Liste des voitures</h3>
        <ul> {listCars} </ul>
    </div>


    )
}