<script setup lang="ts">
    import {
		NavigationMenu,
  		//NavigationMenuContent,
		//NavigationMenuIndicator,
		//NavigationMenuItem,
  		NavigationMenuLink,
  		NavigationMenuList,
  		//NavigationMenuTrigger,
  		//NavigationMenuViewport,
	} from '@/components/ui/navigation-menu'
	import { Button } from '@/components/ui/button'
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="header-container">
        <!-- Left-aligned Home button -->
        <div class="left-section">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuLink>
                        <RouterLink to="/">Home</RouterLink>
                    </NavigationMenuLink>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

        <!-- Centered navigation buttons -->
        <div class="center-section">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuLink>
                        <RouterLink to="/builder">Builder</RouterLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                        <RouterLink to="/builds">Builds</RouterLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                        <RouterLink to="/pulse">Pulse</RouterLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                        <RouterLink to="/forum">Forum</RouterLink>
                    </NavigationMenuLink>
                </NavigationMenuList>
            </NavigationMenu>
			
        </div>

        <!-- Right-aligned login/signup buttons -->
        <div class="right-section">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch; /* Ensures all child elements have the same height */
    padding: 0 16px;
    height: 60px; /* Set a fixed height for the header */
    background: var(--background); /* Use the app's background color */
    color: var(--foreground); /* Use the app's foreground color for text */
    backdrop-filter: blur(10px); /* Frosted glass effect */
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow for better separation */
    position: sticky; /* Makes the header sticky */
    top: 0; /* Sticks the header to the top of the viewport */
    z-index: 1000; /* Ensures the header stays above other content */
}

.left-section,
.center-section,
.right-section {
    flex: 1;
    display: flex;
    align-items: center; /* Centers content vertically */
    height: 100%; /* Matches the height of the header container */
}

.center-section {
    justify-content: center;
}

.left-section {
    justify-content: flex-start;
}

.right-section {
    justify-content: flex-end;
}

a {
    color: var(--foreground); /* Use the app's foreground color for better readability */
    text-decoration: none;
}
</style>