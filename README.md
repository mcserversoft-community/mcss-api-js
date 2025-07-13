# MCSS API JS

<div align="center">

[![npm version](https://img.shields.io/npm/v/@mcserversoft/mcss-api)](https://www.npmjs.com/package/@mcserversoft/mcss-api)
[![Downloads](https://img.shields.io/npm/dt/@mcserversoft/mcss-api.svg)](https://www.npmjs.com/package/@mcserversoft/mcss-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Documentation](https://img.shields.io/badge/docs-typedoc-blue.svg)](https://mcserversoft-community.github.io/mcss-api-js/)

</div>

A powerful and easy-to-use JavaScript/TypeScript package to interact with the [MCSS (MC Server Soft) API](https://www.mcserversoft.com/). This library provides a complete interface for managing Minecraft servers, users, backups, scheduled tasks, API keys, and webhooks.

## 📦 Installation

You can install the package using your preferred package manager:

```bash
# Using npm
npm install @mcserversoft/mcss-api
# Using pnpm
pnpm add @mcserversoft/mcss-api
# Using bun
bun install @mcserversoft/mcss-api
```

## 🚀 Quick Start

First, you need to create a new `Client` instance:

```javascript
import { Client } from '@mcserversoft/mcss-api';

const client = new Client("127.0.0.1", 8080, "YOUR_API_KEY", true);
```

### 🎮 Server Management

#### Get all servers

```javascript
async function getServers() {
    const servers = await client.getServers();
    if (Array.isArray(servers)) {
        servers.forEach(server => {
            console.log(`Server: ${server.name} (${server.status})`);
            console.log(`Players: ${server.players}/${server.maxPlayers}`);
        });
    }
}

getServers();
```

#### Get a specific server

```javascript
async function getServer() {
    const response = await client.servers.get("YOUR_SERVER_ID");
    if (response.status === 200) {
        console.log(`Server data:`, response.data);
    }
}

getServer();
```

#### Control server operations

```javascript
import { ServerAction } from '@mcserversoft/mcss-api';

async function manageServer() {
    // First get all servers to find the one we want
    const servers = await client.getServers();
    if (Array.isArray(servers) && servers.length > 0) {
        const server = servers[0]; // Use the first server as example
        
        // Start the server
        const startResult = await server.execute(ServerAction.Start);
        console.log('Start result:', startResult.status);

        // Send a command
        const commandResult = await server.execute("say Hello from the API!");
        console.log('Command result:', commandResult.status);

        // Stop the server
        const stopResult = await server.execute(ServerAction.Stop);
        console.log('Stop result:', stopResult.status);
    }
}

manageServer();
```

### 👥 User Management

```javascript
async function manageUsers() {
    // Get all users
    const usersResponse = await client.users.get();
    if (usersResponse.status === 200) {
        console.log('Users:', usersResponse.data);
    }

    // Get a specific user
    const userResponse = await client.users.getUser("USER_ID");
    if (userResponse.status === 200) {
        console.log('User:', userResponse.data);
    }

    // Create a new user
    const newUser = {
        username: "testuser",
        password: "password123",
        email: "test@example.com",
        role: "user"
    };
    const createdUser = await client.users.createUser(newUser);
    if (createdUser.status === 200) {
        console.log('User created:', createdUser.data);
    }
}

manageUsers();
```

### 💾 Backup Management

```javascript
async function manageBackups() {
    // First get all servers to find the one we want
    const servers = await client.getServers();
    if (Array.isArray(servers) && servers.length > 0) {
        const serverId = servers[0].id; // Use the first server's ID
        
        // Get all backups for a server
        const backupsResponse = await servers[0].backups.get();
        if (backupsResponse.status === 200) {
            console.log('Backups:', backupsResponse.data);
        }

        // Create a new backup
        const newBackup = {
            name: "My Backup",
            destination: "local"
        };
        const createdBackup = await servers[0].backups.create(newBackup);
        if (createdBackup.status === 200) {
            console.log('Backup created:', createdBackup.data);
        }
    }
}

manageBackups();
```

### ⏰ Scheduled Tasks

```javascript
async function manageTasks() {
    // First get all servers to find the one we want
    const servers = await client.getServers();
    if (Array.isArray(servers) && servers.length > 0) {
        // Get all tasks for a server
        const tasksResponse = await servers[0].scheduler.getTasks();
        if (tasksResponse.status === 200) {
            console.log('Tasks:', tasksResponse.data);
        }

        // Create a new scheduled task
        const newTask = {
            name: "Daily Restart",
            action: "restart",
            schedule: "0 6 * * *" // Daily at 6 AM
        };
        const createdTask = await servers[0].scheduler.create(newTask);
        if (createdTask.status === 200) {
            console.log('Task created:', createdTask.data);
        }
    }
}

manageTasks();
```

### 🔑 API Key Management

```javascript
import { Key, ServerPermissions } from '@mcserversoft/mcss-api';

async function manageApiKeys() {
    // Get all API keys
    const keysResponse = await client.apikeys.get();
    if (keysResponse.status === 200) {
        console.log('API Keys:', keysResponse.data);
    }

    // Create a new API key
    const newKey = new Key(
        "My API Key",
        [
            {
                serverId: "YOUR_SERVER_ID",
                permissions: [ServerPermissions.Start, ServerPermissions.Stop]
            }
        ]
    );
    const createdKey = await client.apikeys.create(newKey);
    if (createdKey.status === 200) {
        console.log('API Key created:', createdKey.data);
    }
}

manageApiKeys();
```

### 🪝 Webhook Management

```javascript
import { WebhookTrigger } from '@mcserversoft/mcss-api';

async function manageWebhooks() {
    // Get all webhooks
    const webhooksResponse = await client.webhooks.get();
    if (webhooksResponse.status === 200) {
        console.log('Webhooks:', webhooksResponse.data);
    }

    // Create a new webhook
    const createdWebhook = await client.webhooks.create(
        "My Webhook",
        "https://example.com/webhook",
        0,
        [WebhookTrigger.SERVER_STATUS_CHANGED]
    );
    if (createdWebhook.status === 200) {
        console.log('Webhook created:', createdWebhook.data);
    }
}

manageWebhooks();
```

## 📚 API Documentation

For comprehensive API documentation with detailed examples, type definitions, and method signatures, visit our [TypeDoc documentation](https://mcserversoft-community.github.io/mcss-api-js/).

### 🔧 Generate Documentation Locally

To generate the documentation locally, run:

```bash
npm run docs
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔀 **Open** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mcserversoft-community/mcss-api-js.git

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## 📋 Requirements

- Node.js 16.x or higher
- MCSS (MC Server Soft) instance with API enabled
- Valid API key with appropriate permissions

## 🆘 Support

- 📖 **Documentation**: [TypeDoc Documentation](https://mcserversoft-community.github.io/mcss-api-js/)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/mcserversoft-community/mcss-api-js/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the MCSS Community**

[Website](https://mcserversoft.com) • [GitHub](https://github.com/mcserversoft-community) • [Documentation](https://mcserversoft-community.github.io/mcss-api-js/)

</div>
