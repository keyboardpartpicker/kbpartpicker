<template>
    <div class="main">
      <header class="navbar">
        <router-link to="/">
            <div class="logo-title">
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="25" height="25" />
            <h1 class="green">KBPP ALPHA</h1>
        </div>
        </router-link>
        <nav class="navigation">
            <router-link to="/builder" class="navigation">Builder</router-link>
        </nav>
    </header>
  
    <main class="content">
        <router-view></router-view>
        </main>
    </div>

    <footer class="footer">
        <div>
            <p class="green">KBPartPicker ALPHA 2025</p>
        </div>
    </footer>
</template>
  
<style scoped>
    .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 2rem;
    }

    .main {
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
    }
  
    .navbar {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.5rem;
        background-color: #252a2f;
        border-bottom: 1px solid hsla(160, 100%, 37%, 1);
    }

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
  
    .navigation {
        display: flex;
        margin-left: 3px;
    }
  
    .navigation a {
        margin-left: 1rem;
        text-decoration: none;
        color: #42b983;
      }

    .navigation a.router-link-active {
        font-weight: bold;
    }

    .footer {
        width: 100%;
        padding: 1rem;
        background-color: #252a2f;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
</style>