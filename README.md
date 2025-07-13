# MCSS API JS

<div align="center">

[![npm version](https://img.shields.io/npm/v/@mcserversoft/mcss-api)](https://www.npmjs.com/package/@mcserversoft/mcss-api)
[![Downloads](https://img.shields.io/npm/dt/@mcserversoft/mcss-api.svg)](https://www.npmjs.com/package/@mcserversoft/mcss-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Documentation](https://img.shields.io/badge/docs-typedoc-blue.svg)](https://mcserversoft-community.github.io/mcss-api-js/)

</div>

A powerful and easy-to-use JavaScript/TypeScript package to interact with the [MCSS (MC Server Soft) API](https://www.mcserversoft.com/). This library provides a complete interface for managing Minecraft servers, users, backups, scheduled tasks, API keys, and webhooks.

## 🔗 Useful Links

- **Website**: [https://mcserversoft.com](https://mcserversoft.com)
- **MCSS Documentation**: [MCSS Documentation](https://docs.mcserversoft.com/)
- **MCSS API Documentation**: [API Documentation](https://docs.mcserversoft.com/apis/v2)
- **Documentation**: [https://mcserversoft-community.github.io/mcss-api-js/](https://mcserversoft-community.github.io/mcss-api-js/)
- **GitHub**: [https://github.com/mcserversoft-community/mcss-api-js](https://github.com/mcserversoft-community/mcss-api-js)

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

The `client` object is your main entry point and provides access to:

- **Modules**:
    - `client.servers`: Manage servers.
    - `client.users`: Manage users.
    - `client.webhooks`: Manage webhooks.
    - `client.apikeys`: Manage API keys.
- **Direct Methods**:
    - `client.getStats()`: Get panel stats.
    - `client.getServers()`: Get all servers.
    - `client.getServerCount()`: Get server count.
    - `client.getSettings()`: Get MCSS settings.
    - `client.updateSettings()`: Update MCSS settings.

## ✨ Builder Classes

This library includes builder classes to make creating complex objects straightforward. These builders use a fluent interface, allowing you to chain methods together.

- `Server`: For creating new server configurations.
- `User`: For creating new users.
- `Backup`: For creating new backup configurations.
- `Task`: For creating new scheduled tasks.
- `Key`: For creating new API keys.

### Example Usage of a Builder

```javascript
import { Backup, Compression } from '@mcserversoft/mcss-api';

const newBackup = new Backup("My Important Backup", "local_destination")
    .setCompression(Compression.HIGH)
    .setSuspend(true)
    .setDeleteOldBackups(true);

// You can then use this `newBackup` object in the API methods.
// For example:
// await server.backups.create(newBackup);
```

## 🎮 Server Management

When you fetch a server, you get a `ServerObject` which has its own methods and properties.

### The `ServerObject`

A `ServerObject` contains all the information about a server, as well as instance-specific modules for backups and scheduling.

- **Properties**: `id`, `name`, `status`, `players`, `maxPlayers`, etc.
- **Modules**:
    - `server.backups`: Manage backups for this specific server.
    - `server.scheduler`: Manage scheduled tasks for this specific server.
- **Methods**:
    - `server.getStats()`: Get server-specific stats.
    - `server.execute()`: Execute commands or actions.
    - `server.edit()`: Edit the server's properties.

### Get a specific server

```javascript
async function getServer() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.status === 200) {
        console.log(`Server Name: ${server.name}`);
        console.log(`Status: ${server.status}`);
        
        // You can access backups and scheduler directly
        const backups = await server.backups.get();
        console.log('Backups:', backups.data);
    }
}

getServer();
```

### Control server operations

```javascript
import { ServerAction } from '@mcserversoft/mcss-api';

async function manageServer() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.status === 200) {
        // Start the server
        const startResult = await server.execute(ServerAction.Start);
        console.log('Start result:', startResult.status);

        // Send a command
        const commandResult = await server.execute("say Hello from the API!");
        console.log('Command result:', commandResult.status);
    }
}

manageServer();
```

## 👥 User Management

```javascript
import { User } from '@mcserversoft/mcss-api';

async function manageUsers() {
    // Get all users
    const usersResponse = await client.users.get();
    if (usersResponse.status === 200) {
        console.log('Users:', usersResponse.data);
    }

    // Create a new user using the User builder
    const newUser = new User("testuser", "password123", true, false, false)
        .setUsername("new-test-user")
        .setPassword("securePassword123");

    const createdUser = await client.users.createUser(newUser);
    if (createdUser.status === 200) {
        console.log('User created:', createdUser.data);
    }
}

manageUsers();
```

## 💾 Backup Management

```javascript
import { Backup, Compression } from '@mcserversoft/mcss-api';

async function manageBackups() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.status === 200) {
        // Get all backups for a server
        const backupsResponse = await server.backups.get();
        if (backupsResponse.status === 200) {
            console.log('Backups:', backupsResponse.data);
        }

        // Create a new backup using the Backup builder
        const newBackup = new Backup("My New Backup", "local")
            .setCompression(Compression.HIGH)
            .setSuspend(true);
            
        const createdBackup = await server.backups.create(newBackup);
        if (createdBackup.status === 200) {
            console.log('Backup created:', createdBackup.data);
        }
    }
}

manageBackups();
```

## ⏰ Scheduled Tasks

```javascript
import { Task, ServerAction } from '@mcserversoft/mcss-api';

async function manageTasks() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.status === 200) {
        // Get all tasks for a server
        const tasksResponse = await server.scheduler.getTasks();
        if (tasksResponse.status === 200) {
            console.log('Tasks:', tasksResponse.data);
        }

        // Create a new scheduled task using the Task builder
        const newTask = new Task("Daily Restart", true, 0)
            .setTiming(true, 86400) // Repeat every 24 hours
            .addJob(ServerAction.Restart);

        const createdTask = await server.scheduler.create(newTask);
        if (createdTask.status === 200) {
            console.log('Task created:', createdTask.data);
        }
    }
}

manageTasks();
```

## 🔑 API Key Management

```javascript
import { Key, ServerPermissions } from '@mcserversoft/mcss-api';

async function manageApiKeys() {
    // Get all API keys
    const keysResponse = await client.apikeys.get();
    if (keysResponse.status === 200) {
        console.log('API Keys:', keysResponse.data);
    }

    // Create a new API key using the Key builder
    const newKey = new Key("My Test Key")
        .setIsAdmin(false)
        .setHasAccessToAllServers(false)
        .addCustomServerPermission("YOUR_SERVER_ID", {
            [ServerPermissions.VIEW_STATS]: true,
            [ServerPermissions.USE_CONSOLE]: true,
        });

    const createdKey = await client.apikeys.create(newKey);
    if (createdKey.status === 200) {
        console.log('API Key created:', createdKey.data);
    }
}

manageApiKeys();
```

## 🪝 Webhook Management

```javascript
import { WebhookTrigger } from '@mcserversoft/mcss-api';

async function manageWebhooks() {
    // Get all webhooks
    const webhooksResponse = await client.webhooks.get();
    if (webhooksResponse.status === 200) {
        console.log('Webhooks:', webhooksResponse.data);
    }

    // Create a new webhook using the Webhook builder
    const newWebhook = new Webhook("My Webhook", "https://example.com/webhook")
        .setMessageFormat(0) // 0 for JSON
        .setWebhookTriggers([WebhookTrigger.SERVER_STATUS_CHANGED])
        .addOptionalHeader("X-Custom-Header", "SomeValue");

    const createdWebhook = await client.webhooks.create(newWebhook);
    if (createdWebhook.status === 200) {
        console.log('Webhook created:', createdWebhook.data);
    }
}

manageWebhooks();
```

## 📚 API Reference

### Enums

The library exports several enums to make working with specific values easier:

- `GB`: Memory allocation for servers (e.g., `GB.ONE`).
- `Compression`: Backup compression levels (`HIGH`, `LOW`, `NONE`).
- `KeepOnline`: Server keep-online strategies.
- `ServerAction`: Actions like `Start`, `Stop`, `Restart`.
- `ServerFilter`: Filters for listing servers.
- `ServerCountFilter`: Filters for counting servers.
- `ServerType`: Specific server types (e.g., `VANILLA`, `PAPER`).
- `TaskFilter`: Filters for scheduled tasks.
- `WebhookTrigger`: Events that trigger webhooks.
- `WebhookMessageFormat`: Message formats for webhooks (e.g., `GENERAL`, `DISCORD`).
- `ServerPermissions`: Permissions for API keys.

## 📚 API Documentation

For comprehensive API documentation with detailed examples, type definitions, and method signatures, visit our [TypeDoc documentation](https://mcserversoft-community.github.io/mcss-api-js/).

### 🔧 Generate Documentation Locally

To generate the documentation locally, run:

```bash
npm run docs
```
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

- Node.js 18.x or higher
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