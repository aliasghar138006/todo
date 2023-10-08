import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function SignupPage(props) {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const router = useRouter();
    const {status} = useSession();
    useEffect(() => {
        if(status === "authenticated"){
            router.replace('/')
        }
    }, [status])
    
    const signupHandler = async () => {
        const res = await fetch('/api/auth/signup' , {
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email , password})
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <div className='signin-form'>
            <h3>Registration Form</h3>
            <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={signupHandler}>Register</button>
            <div>
                <p>Have a account?</p>
                <Link href='/signin'>
                    Sign in
                </Link>
            </div>
        </div>
    );
}

export default SignupPage;