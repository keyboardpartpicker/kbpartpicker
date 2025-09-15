<template>
    <div id="app">
      <!-- Header -->
      <header class="header">
        <div class="container flex h-16 items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="logo">
            <img src="./assets/logo.svg" alt="KBPartPicker Logo" />
            <span>KBPartPicker</span>
          </router-link>
  
          <!-- Navigation -->
          <nav class="navigation">
            <router-link to="/builder">Builder</router-link>
            <router-link to="/builds">Builds</router-link>
            <router-link to="/pulse">Pulse</router-link>
            <router-link to="/forum">Forum</router-link>
          </nav>
  
          <!-- Auth Buttons -->
          <div class="auth-buttons">
            <router-link to="/signin" class="signin">Sign In</router-link>
            <router-link to="/signup" class="signup">Sign Up</router-link>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <router-view />
  
      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <!-- Logo and Description -->
            <div class="footer-logo">
              <img src="./assets/logo.svg" alt="KBPartPicker Logo" />
              <span>KBPartPicker</span>
            </div>
            <p>© 2025 KBPartPicker. All rights reserved.</p>
            <nav class="footer-links">
              <router-link to="/privacy">Privacy</router-link>
              <router-link to="/terms">Terms</router-link>
              <router-link to="/cookies">Cookies</router-link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
  };
  </script>
  
  <style>
  /* Header styles */
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    background-color: #121212;
    border-bottom: 1px solid #333;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .logo img {
    height: 24px;
    width: 24px;
  }
  
  .logo span {
    font-size: 1.125rem;
    font-weight: bold;
    color: white;
  }
  
  .navigation {
    display: flex;
    gap: 1.5rem;
  }
  
  .navigation a {
    font-size: 0.875rem;
    color: white;
    transition: color 0.3s;
  }
  
  .navigation a:hover {
    color: #ccc;
  }
  
  .auth-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .auth-buttons .signin {
    font-size: 0.875rem;
    color: white;
    transition: color 0.3s;
  }
  
  .auth-buttons .signin:hover {
    color: #ccc;
  }
  
  .auth-buttons .signup {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(to right, #6a0dad, #ff1493);
    border-radius: 0.375rem;
    transition: opacity 0.3s;
  }
  
  .auth-buttons .signup:hover {
    opacity: 0.9;
  }
  
  /* Footer styles */
  .footer {
    background-color: #121212;
    border-top: 1px solid #333;
    padding: 2rem 0;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .footer-logo img {
    height: 24px;
    width: 24px;
  }
  
  .footer-logo span {
    font-size: 1.125rem;
    font-weight: bold;
    color: white;
  }
  
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .footer-links a {
    font-size: 0.875rem;
    color: #ccc;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: white;
  }
  
  .footer p {
    font-size: 0.875rem;
    color: #ccc;
  }
  </style>