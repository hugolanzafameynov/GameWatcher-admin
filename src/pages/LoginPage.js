import React, {useState} from 'react';
import {auth} from '../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        setError('');
        let isValid = true;

        // Vérifier si les champs email et mot de passe sont remplis
        if (email === '' || password === '') {
            setError('Veuillez remplir tous les champs.');
            isValid = false;
        }

        // Connexion à Firebase avec l'email et le mot de passe
        if (isValid) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Connexion réussie
                    console.log('Utilisateur connecté :', userCredential.user);
                    navigate('/home');
                })
                .catch((error) => {
                    // Erreur lors de la connexion
                    console.log('Erreur de connexion :', error.message);
                    setError('Adresse e-mail ou mot de passe incorrect.');
                });
        }
    };

    return (
        <div>
            <h1>Connexion Administrateur</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
                type="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
};

export default LoginPage;
