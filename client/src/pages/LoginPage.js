import React from "react";

const LoginPage = () =>{
    return (
        // <div>LoginPage...</div>
        <form className="login">
            <h1>
                Loing Page
            </h1>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>Login</button>
        </form>
    );

}

export default LoginPage;