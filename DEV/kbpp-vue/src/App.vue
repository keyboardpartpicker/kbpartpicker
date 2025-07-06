<template>
    <div class="main">
      <header class="navbar">
        <div class="logo-title">
          <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="25" height="25" />
          <h1 class="green">KBPP ALPHA</h1>
        </div>
        <nav class="navigation">
          <router-link to="/">Home</router-link>
          <router-link to="/builder">Builder</router-link>
        </nav>
      </header>
  
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <style scoped>
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0rem;
  }

  .main {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
  
  /* Top bar styling */
  .navbar {
    width: 100%;
    padding: 0.5rem;
    background-color: #252a2f;
    border-bottom: 1px solid  hsla(160, 100%, 37%, 1);
  }
  
  /* Logo and title styling */
  .logo-title {
    display: flex;
    align-items: center;
  }
  
  .logo {
    margin-right: 1rem;
  }
  
  .green {
    color: #42b983;
    margin: 0;
  }
  
  /* Navigation styling */
  .navigation {
    display: flex;
    gap: 1rem;
  }
  
  .navigation a {
    text-decoration: none;
    color: #42b983;
  }
  
  .navigation a.router-link-active {
    font-weight: bold;
  }
  </style>