import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function Connexion() {

    const [formData, setFormData] = useState({
        email: '',
        passwords: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const connectUser = async (e) => {

        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:3000/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut : ${response.status}`);
            }

            // Une fois que l'utilisateur s'est inscrit, lui afficher le componnent connexion
            navigate('/voitures')

        } catch (error) {
            console.error('Erreur lors de la connexion de l\'utilisateur :', error);
            alert('Une erreur s\'est produite lors de la connexion de l\'utilisateur. Veuillez réessayer.');
        }
    };

  

  return (
    <form onSubmit={connectUser}>
        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" onChange={handleChange} required/>

        <label htmlFor="passwords">Mot de passe</label>
        <input type="password" id="passwords" name="passwords" onChange={handleChange} required/>

        <button type="submit">Se connecter</button>
    </form>
  )
}

