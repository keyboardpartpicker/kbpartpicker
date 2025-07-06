<script setup>
import ListItem from './ListItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'

</script>

<template>
  <ListItem>
    <template #icon>
      <ToolingIcon/>
    </template>
    <template #heading>Builder</template>

    The parts configurator for assembling and customizing keyboard builds.
  </ListItem>

  <ListItem>
    <template #icon>
      <DocumentationIcon/>
    </template>
    <template #heading>Builds</template>

    A showcase hub for finalized builds, including sound tests, photos, and user-generated build guides.
  </ListItem>

  <ListItem>
    <template #icon>
      <EcosystemIcon/>
    </template>
    <template #heading>Pulse</template>

    A real-time analytics dashboard for monitoring price trends and group buy status across the keyboard ecosystem.
  </ListItem>

  <ListItem>
    <template #icon>
      <CommunityIcon/>
    </template>
    <template #heading>Forum</template>

    A dedicated discussion space for topics spanning builds, components, troubleshooting, and general community chatter.
  </ListItem>
</template>