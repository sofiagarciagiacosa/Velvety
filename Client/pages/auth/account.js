import { userCard } from "../../components/userCard.js";

export const getUserData= (key)=> {
    return JSON.parse(sessionStorage.getItem(key));
}

export const logOut = (key)=> {
    //elimino la sesion
    sessionStorage.removeItem(key);
}

export const renderUserCard = () => {
    const userInfo = getUserData('userData');
    const userContainer = document.getElementById('userContainer');

    if (userInfo && userContainer) {
        const card = userCard(userInfo);
        userContainer.innerHTML = card;

        // Agrega el evento de clic después de inyectar el HTML
        document.getElementById('btnLogOut').addEventListener('click', () => {
            console.log("Botón de cerrar sesión presionado");
            logOut('userData');
        });

    }
};