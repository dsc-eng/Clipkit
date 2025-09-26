"use client";
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


function RegisterPage() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword ,setConfirmPassword] = useState("");
//     const [error,setError] = useState("");
//     const [loading,setLoading] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || "Registration Failed");
            }

            console.log(data);
            router.push("/login");

        } catch (error) {
            console.error("Registration Error: ", error);
        }
    }   

  return (

    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />   
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button> 
        </form>    
        <div>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage


// add : react query , loading , debouncing , error handling , password strength meter , password visibility toggle , form validation , redirect if logged in