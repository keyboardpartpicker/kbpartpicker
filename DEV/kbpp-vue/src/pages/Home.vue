<script setup>
    import PageList from '../components/PageList.vue'
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
        
        <div class="description">
        <h3>
            A smart configuration tool for building custom mechanical keyboards with precision and confidence. KBPartPicker lets users efficiently explore, compare, and combine components as a community with automatic compatibility checks and sound profile predictions.
            <br/>
            <a href="https://github.com/EthanChin/kbpartpicker/" target="_blank" rel="noopener">GitHub</a>
        </h3>
    </div>
    </header>

    <main>
        <PageList/>
    </main>
</template>

<style scoped>
    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    header {
        line-height: 1.5;
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    @media (min-width: 1024px) {
        .description h3 {
            text-align: center;
            font-size: 1.2rem;
        }
    }
</style>