import { useState } from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev){
        ev.preventDefault();
        await fetch('http://localhost:4000/register',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
        })
    }
    return (
        // <div>LoginPage...</div>
        <form className="register" onSubmit={register}>
            <h1>
                Register page
            </h1>
            <input 
                type="text" 
                placeholder="username"  
                value={username} 
                onChange={ev=>setUsername(ev.target.value)}
                //change ev to event
                />
            <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)}    
                //change ev to event
            />
            <button>Register</button>
        </form>
    );
}