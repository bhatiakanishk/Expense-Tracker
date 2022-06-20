import React from 'react';

//Functional Component for Header
export const Header = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <h2>
            Welcome {user.result.name}
        </h2>
    )
}
