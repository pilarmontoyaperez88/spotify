
import axios from "axios";

export async function redirectToAuthCodeFlow(clientId) {
    
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
  
    
    localStorage.setItem("verifier", verifier);
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback"); 
    params.append("scope", "user-read-private user-read-email"); 
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
  
    
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
  
  
  function generateCodeVerifier(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  
  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  
  
  export async function getAccessToken(clientId, code) {
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET; 
    const redirectUri = "http://localhost:5173/callback"; 
  
    const verifier = localStorage.getItem("verifier");
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret); 
    params.append("code", code); 
    params.append("redirect_uri", redirectUri);
    params.append("grant_type", "authorization_code");
    params.append("code_verifier", verifier);
  
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    const { access_token } = await result.json();
    return access_token;
  }
  
  
  export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  }
  