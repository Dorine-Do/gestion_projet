import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function Inscription() {

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        telephone: '',
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

    const addUser = async (e) => {

        e.preventDefault();

        console.log( JSON.stringify(formData))

        try {
            const response = await fetch('http://localhost:3000/add-user', {
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
            navigate('/connexion')

        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            alert('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur. Veuillez réessayer.');
        }
    };

  

  return (
    <form onSubmit={addUser}>
        <label htmlFor="firstname">Prénom</label>
        <input type="text" id="firstname" name="name" onChange={handleChange} required />

        <label htmlFor="lastname">Nom</label>
        <input type="text" id="lastname" name="lastname" onChange={handleChange} required/>

        <label htmlFor="phoneNumbner">Téléphone</label>
        <input type="text" id="phoneNumbner" name="telephone" onChange={handleChange} required/>

        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" onChange={handleChange} required/>

        <label htmlFor="passwords">Mot de passe</label>
        <input type="password" id="passwords" name="passwords" onChange={handleChange} required/>

        <button type="submit">S'inscrire</button>
    </form>
  )
}