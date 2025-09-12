# PROJECT OVERVIEW

## 📁 Site Structure Overview

### **Builder**
- The parts configurator for assembling and customizing keyboard builds.
### **Builds**
- A showcase hub for finalized builds, including sound tests, photos, and user-generated build guides.
### **Pulse**
- A real-time analytics dashboard for monitoring price trends and group buy status across the keyboard ecosystem.
### **Forum**
- A dedicated discussion space for topics spanning builds, components, troubleshooting, and general community chatter.

## 🔨 Services Overview

### **Global Services**
- **Cloudflare Tunnel**: Proxies traffic to NGINX while protecting the server.

### **External-facing Local Services**
- **NGINX**: Serves static assets to Cloudflare.

### **Internal-facing Local Services**
- **PostgreSQL**: Handles all site data and processes database actions.
- **SuperTokens**: Manages user accounts and authentication.
- **Postfix** (`bokysan/docker-postfix`): Delivers one-time passwords (OTPs).
- **Flarum**: Powers the forum backend via API, integrated with SuperTokens for unified login using the SSO for Flarum (`maicol07/flarum-ext-sso`) extension.

### **Frameworks & Deployment Services**

- **Host Machine**: Debian 12 desktop PC running as the server.
- **Version Control**: Project files managed remotely using GitHub.
- **Frontend Framework**: Vue.js.
- **Service Deployment**: Docker images coordinated via Docker Compose.
- **Automation Scripts**: Shell script automates Docker Compose deployment.
- **Remote Deployment**: Webhook (`adnanh/webhook`) automates `git pull` actions and enables remote development workflows.