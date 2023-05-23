import React, {useEffect, useState} from 'react';
import {signOut} from "firebase/auth";
import {ref, get, remove} from 'firebase/database';
import {auth, database} from "../firebaseConfig";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // Récupérer la liste des utilisateurs Firebase
        const getUsers = async (callback) => {
            const usersRef = ref(database, 'utilisateurs');
            console.log('change')
            const snapshot = await get(usersRef);
            const usersData = snapshot.val();
            console.log('cc')
            callback(usersData);
        };

        getUsers((usersData) => {
            if (usersData) {
                const usersArray = Object.entries(usersData).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setUserList(usersArray);
            }
        }).then(() => {
            console.log('Récupération des utilisateurs réussi');
        });
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Déconnexion réussie
                console.log('Utilisateur déconnecté');
                navigate('/');
            })
            .catch((error) => {
                // Gestion des erreurs lors de la déconnexion
                console.log('Erreur lors de la déconnexion :', error.message);
            });
    }

    const handleDelete = (userId) => {
        try {
            // Supprimer l'entrée de la table "utilisateurs"
            const userRef = ref(database, `utilisateurs/${userId}`);
            remove(userRef).catch();

            navigate('/home');
        } catch (error) {
            console.log('Erreur lors de la récupération des données de l\'utilisateur :', error);
        }
    };

return (
    <div>
        <h1>Gestion administrateur</h1>
        <p>Bienvenue sur la page de gestion administrateur de l'application GameWatcher.</p>
        <h2>Liste des utilisateurs Firebase :</h2>
        <table style={tableStyle}>
            <thead>
            <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Username</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Image</th>
                <th style={tableHeaderStyle}>Action</th>
            </tr>
            </thead>
            <tbody>
            {userList.map((user) => (
                <tr key={user.id}>
                    <td style={tableCellStyle}>{user.id}</td>
                    <td style={tableCellStyle}>{user.username}</td>
                    <td style={tableCellStyle}>{user.email}</td>
                    <td style={tableCellStyle}>
                        <img src={user.image} alt="User" style={tableImage}/>
                    </td>
                    <td style={tableCellStyle}>
                        <button style={deleteButtonStyle} onClick={handleDelete(user.id)}>Supprimer</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={handleLogout}>Se deconnecter</button>
    </div>
);

}
;

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
}

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    border: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ddd',
};

const tableImage = {
    maxWidth: '100px',
}

const deleteButtonStyle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
};


export default HomePage;
