// VerificarConexion.js
import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import SinConexion from './SinConexion';



// Componente reutilizable para verificar conexión
const VerificarConexion = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            const state = await NetInfo.fetch();
            setIsConnected(state.isConnected);
        };

        // Verificar la conexión al inicio
        checkConnection();

        // Suscripción a cambios en la conexión
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        // Limpiar la suscripción cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    

    // Si no hay conexión, mostrar el componente SinConexion
    if (!isConnected) {
        return <SinConexion />;
    }

    // Si hay conexión, renderizar los hijos (contenido del componente principal)
    return <>{children}</>;
};

export default VerificarConexion;
