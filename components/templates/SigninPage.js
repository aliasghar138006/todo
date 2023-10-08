import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function SigninPage(props) {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const router = useRouter();
    const {status} = useSession();
    useEffect(() => {
        if(status === "authenticated"){
            router.replace('/')
        }
    }, [status])
    const loginHandler = async () => {
        signIn("credentials" , {
            email,password,
            redirect : false
        });
    }
    return (
        <div className='signin-form'>
            <h3>Login Form</h3>
            <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={loginHandler}>Login</button>
            <div>
                <p>Create a account?</p>
                <Link href='/signup'>
                    Signup
                </Link>
            </div>
        </div>
    );
}

export default SigninPage;