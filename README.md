# MCSS API JS

[![npm version](https://badge.fury.io/js/%40mcserversoft%2Fmcss-api.svg)](https://badge.fury.io/js/%40mcserversoft%2Fmcss-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple JavaScript/TypeScript package to interact with the [MCSS-API](https://github.com/mcserversoft/mcss).

## Installation

You can install the package using npm:

```bash
npm install @mcserversoft/mcss-api
```

## Usage

First, you need to create a new `Client` instance:

```javascript
import { Client } from '@mcserversoft/mcss-api';

const client = new Client("127.0.0.1", 8080, "YOUR_API_KEY", true);
```

### Get all servers

```javascript
async function getServers() {
    const servers = await client.getServers();
    if (Array.isArray(servers)) {
        servers.forEach(server => {
            console.log(server.name);
        });
    }
}

getServers();
```

### Get a specific server

```javascript
async function getServer() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.statusCode === 200) {
        console.log(server.name);
    }
}

getServer();
```

### Interact with a server

Once you have a server object, you can interact with it.

```javascript
import { ServerAction } from '@mcserversoft/mcss-api';

async function manageServer() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.statusCode === 200) {
        // Start the server
        await server.execute(ServerAction.Start);

        // Send a command
        await server.execute("say Hello from the API!");

        // Stop the server
        await server.execute(ServerAction.Stop);
    }
}

manageServer();
```

### Manage Users

```javascript
async function manageUsers() {
    // Get all users
    const users = await client.users.get();
    console.log(users.data);

    // Create a new user
    const newUser = {
        username: "testuser",
        password: "password123",
        email: "test@example.com",
        role: "user"
    };
    const createdUser = await client.users.createUser(newUser);
    console.log(createdUser.data);
}

manageUsers();
```

### Manage Backups

```javascript
async function manageBackups() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.statusCode === 200) {
        // Get all backups for a server
        const backups = await server.backups.get();
        console.log(backups.data);

        // Create a new backup
        const newBackup = {
            name: "My Backup",
            destination: "local"
        };
        const createdBackup = await server.backups.create(newBackup);
        console.log(createdBackup.data);
    }
}

manageBackups();
```

### Manage Scheduled Tasks

```javascript
async function manageTasks() {
    const server = await client.servers.get("YOUR_SERVER_ID");
    if (server.statusCode === 200) {
        // Get all tasks for a server
        const tasks = await server.scheduler.getTasks();
        console.log(tasks.data);
    }
}

manageTasks();
```

### Manage API Keys

```javascript
import { Key, ServerPermissions } from '@mcserversoft/mcss-api';

async function manageApiKeys() {
    // Get all API keys
    const keys = await client.apikeys.get();
    console.log(keys.data);

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
    console.log(createdKey.data);
}

manageApiKeys();
```

### Manage Webhooks

```javascript
import { WebhookTrigger } from '@mcserversoft/mcss-api';

async function manageWebhooks() {
    // Get all webhooks
    const webhooks = await client.webhooks.get();
    console.log(webhooks.data);

    // Create a new webhook
    const createdWebhook = await client.webhooks.create(
        "My Webhook",
        "https://example.com/webhook",
        0,
        [WebhookTrigger.SERVER_STATUS_CHANGED]
    );
    console.log(createdWebhook.data);
}

manageWebhooks();
```

## API Documentation

For more detailed information about the API, please refer to the [TypeDoc documentation](https://mcserversoft-community.github.io/mcss-api-js/).

To generate the documentation locally, run the following command:

```bash
npm run docs
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/mcserversoft-community/mcss-api-js).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
