# MCSS API

**These Docs were AI Generated**

## Table of Contents

- [MCSS API](#mcss-api)
  - [Table of Contents](#table-of-contents)
  - [Information](#information)
    - [MC Server Soft Website](#mc-server-soft-website)
    - [MC Server Soft Discord](#mc-server-soft-discord)
    - [MC Server Soft Documentation](#mc-server-soft-documentation)
    - [MC Server Soft API Documentation](#mc-server-soft-api-documentation)
  - [Installation](#installation)
- [Client Documentation](#client-documentation)
  - [Table of Contents](#table-of-contents-1)
  - [Constructor](#constructor)
    - [`constructor(ip: string, port: string | number | null, apiKey: string, https: boolean = true)`](#constructorip-string-port-string--number--null-apikey-string-https-boolean--true)
  - [Methods](#methods)
    - [`getStats(): Promise<AppResponse>`](#getstats-promiseappresponse)
    - [`getServers(filter: ServerFilter | number = 0): Promise<AppResponse>`](#getserversfilter-serverfilter--number--0-promiseappresponse)
    - [`getServerCount(filter: ServerCountFilter | number = 0, serverType: ServerType | string): Promise<AppResponse>`](#getservercountfilter-servercountfilter--number--0-servertype-servertype--string-promiseappresponse)
    - [`getSettings(): Promise<AppResponse>`](#getsettings-promiseappresponse)
    - [`updateSettings(deleteOldBackupsThreshold: number): Promise<AppResponse>`](#updatesettingsdeleteoldbackupsthreshold-number-promiseappresponse)
  - [AppResponse Interface](#appresponse-interface)
  - [Enums](#enums)
    - [ServerFilter](#serverfilter)
    - [ServerCountFilter](#servercountfilter)
    - [ServerType](#servertype)
- [Servers Documentation](#servers-documentation)
  - [Table of Contents](#table-of-contents-2)
  - [Constructor](#constructor-1)
    - [`constructor(obj: Client)`](#constructorobj-client)
  - [Methods](#methods-1)
    - [`get(Id: string, filter: ServerFilter | number = 0): Promise<ServerResponse>`](#getid-string-filter-serverfilter--number--0-promiseserverresponse)
    - [`execute(servers: string[], ...command: any): Promise<AppResponse>`](#executeservers-string-command-any-promiseappresponse)
  - [ServerResponse Interface](#serverresponse-interface)
  - [Enums](#enums-1)
    - [ServerAction](#serveraction)
- [Scheduler Documentation](#scheduler-documentation)
  - [Table of Contents](#table-of-contents-3)
  - [Constructor](#constructor-2)
    - [`constructor(obj: Servers)`](#constructorobj-servers)
  - [Methods](#methods-2)
    - [`get(): Promise<AppResponse>`](#get-promiseappresponse)
    - [`getTasks(filter: TaskFilter | number = 0): Promise<AppResponse>`](#gettasksfilter-taskfilter--number--0-promiseappresponse)
    - [`getTask(Id: string): Promise<AppResponse>`](#gettaskid-string-promiseappresponse)
    - [`create(data: any | Task): Promise<AppResponse>`](#createdata-any--task-promiseappresponse)
    - [`update(Id: string, data: any | Task): Promise<AppResponse>`](#updateid-string-data-any--task-promiseappresponse)
    - [`delete(Id: string): Promise<AppResponse>`](#deleteid-string-promiseappresponse)
    - [`run(Id: string): Promise<AppResponse>`](#runid-string-promiseappresponse)
  - [Enums](#enums-2)
    - [TaskFilter](#taskfilter)
- [Backups Documentation](#backups-documentation)
  - [Table of Contents](#table-of-contents-4)
  - [Constructor](#constructor-3)
    - [`constructor(obj: Servers)`](#constructorobj-servers-1)
  - [Methods](#methods-3)
    - [`get(): Promise<AppResponse>`](#get-promiseappresponse-1)
    - [`getStats(): Promise<AppResponse>`](#getstats-promiseappresponse-1)
    - [`getBackup(backup: string): Promise<AppResponse>`](#getbackupbackup-string-promiseappresponse)
    - [`create(data: Backup): Promise<AppResponse>`](#createdata-backup-promiseappresponse)
    - [`update(backup: string, data: Backup): Promise<AppResponse>`](#updatebackup-string-data-backup-promiseappresponse)
    - [`delete(backup: string): Promise<AppResponse>`](#deletebackup-string-promiseappresponse)
    - [`run(backup: string): Promise<AppResponse>`](#runbackup-string-promiseappresponse)
    - [`getHistory(): Promise<AppResponse>`](#gethistory-promiseappresponse)
    - [`clearHistory(): Promise<AppResponse>`](#clearhistory-promiseappresponse)
- [Users Documentation](#users-documentation)
  - [Table of Contents](#table-of-contents-5)
  - [Constructor](#constructor-4)
    - [`constructor(obj: Client)`](#constructorobj-client-1)
  - [Methods](#methods-4)
    - [`get(): Promise<AppResponse>`](#get-promiseappresponse-2)
    - [`getUser(id: string): Promise<AppResponse>`](#getuserid-string-promiseappresponse)
    - [`createUser(user: object | User): Promise<AppResponse>`](#createuseruser-object--user-promiseappresponse)
    - [`updateUser(id: string, user: object | User): Promise<AppResponse>`](#updateuserid-string-user-object--user-promiseappresponse)
    - [`deleteUser(id: string): Promise<AppResponse>`](#deleteuserid-string-promiseappresponse)
    - [`wipeSessions(): Promise<AppResponse>`](#wipesessions-promiseappresponse)


## Information
### [MC Server Soft Website](https://www.mcserversoft.com)

### [MC Server Soft Discord](https://discord.com/invite/DEn89PB)

### [MC Server Soft Documentation](https://docs.mcserversoft.com)

### [MC Server Soft API Documentation](https://apidocs.mcserversoft.com)

## Installation
```bash
npm install @mcserversoft/mcss-api
```
or 
```bash
pnpm install @mcserversoft/mcss-api
```

# Client Documentation

The `Client` class is a JavaScript/TypeScript client for interacting with an API that manages Minecraft servers. This documentation provides an overview of the class and its methods.

## Table of Contents

- [Constructor](#constructor)
- [Methods](#methods)
  - [getStats](#getstats)
  - [getServers](#getservers)
  - [getServerCount](#getservercount)
  - [getSettings](#getsettings)
  - [updateSettings](#updatesettings)

## Constructor

### `constructor(ip: string, port: string | number | null, apiKey: string, https: boolean = true)`

Creates an instance of the `Client` class to interact with the Minecraft server management API.

- `ip`: The IP address of the server.
- `port`: The port number of the server (can be `null`).
- `apiKey`: The API key for authentication.
- `https`: A boolean indicating whether to use HTTPS (default is `true`).

**Example:**

```javascript
const client = new Client('127.0.0.1', 8080, 'your_api_key', true);
```

## Methods

### `getStats(): Promise<AppResponse>`

Gets the statistics of the panel.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const stats = await client.getStats();
```

### `getServers(filter: ServerFilter | number = 0): Promise<AppResponse>`

Gets all servers based on the specified filter.

- `filter`: The filter to use (default is `ServerFilter.NONE`).

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const servers = await client.getServers(ServerFilter.MINIMAL);
```

### `getServerCount(filter: ServerCountFilter | number = 0, serverType: ServerType | string): Promise<AppResponse>`

Gets the count of servers based on the specified filter and server type.

- `filter`: The filter to use (default is `ServerCountFilter.NONE`).
- `serverType`: The server type for counting.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const serverCount = await client.getServerCount(ServerCountFilter.ONLINE, ServerType.VANILLA);
```

### `getSettings(): Promise<AppResponse>`

Gets the MCSS settings.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const settings = await client.getSettings();
```

### `updateSettings(deleteOldBackupsThreshold: number): Promise<AppResponse>`

Updates the MCSS settings, specifically the number of backups to keep.

- `deleteOldBackupsThreshold`: The number of backups to keep.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const updatedSettings = await client.updateSettings(5);
```

## AppResponse Interface

The `AppResponse` interface represents the response from the API and has the following structure:

```typescript
interface AppResponse {
    status: number;
    data?: any;
    error?: {
        message: string;
    };
}
```

- `status`: The HTTP status code of the response.
- `data`: The data payload of the response (optional).
- `error`: An object containing an error message (optional).

## Enums

### ServerFilter

- `NONE`: 0
- `MINIMAL`: 1
- `STATUS`: 2

### ServerCountFilter

- `NONE`: 0
- `ONLINE`: 1
- `OFFLINE`: 2
- `BYSERVERTYPE`: 3

### ServerType

- `VANILLA`: "349bf6c7-2d19-4e42-bcee-592fa862bcee"
- `CRAFTBUKKIT`: "afa8b9d6-592d-4016-9dd7-eed4185ca8b8"
- `SPIGOT`: "de188054-f3ac-472d-81d6-c57f0412bfa6"
- `PAPER`: "f738fb40-223e-4010-bd07-af4caabdf3dd"
- `BUNGEECORD`: "1a1bb7be-219f-4dc8-9a6a-4a10dc725391"
- `WATERFALL`: "f49ad4bf-7900-45a4-940b-c97468fbba1f"
- `FORGE`: "8e3aecd7-b81b-4827-a3e2-93a701cdd3b4"
- `FABRIC`: "c45acfcf-b4a1-4733-aab0-f78e1091ae16"
- `BEDROCK`: "87c2620f-48a0-47e6-97c1-ff5fbbc128f3"
- `PURPUR`: "984ed3d3-636d-4535-82b2-7c1048782c64"

# Servers Documentation

The `Servers` class is a part of a JavaScript/TypeScript client for interacting with an API that manages Minecraft servers. This documentation provides an overview of the class and its methods.

## Table of Contents

- [Constructor](#constructor)
- [Methods](#methods)
  - [get](#get)
  - [execute](#execute)

## Constructor

### `constructor(obj: Client)`

Creates an instance of the `Servers` class to interact with the Minecraft server management API.

- `obj`: An instance of the `Client` class.

**Example:**

```javascript
const client = new Client('127.0.0.1', 8080, 'your_api_key', true);
const servers = new Servers(client);
```

## Methods

### `get(Id: string, filter: ServerFilter | number = 0): Promise<ServerResponse>`

Gets the server with the specified ID.

- `Id`: The server ID.
- `filter`: The filter to apply (default is `ServerFilter.NONE`).

**Returns:**
- A promise resolving to a `ServerResponse` object.

**Example:**

```javascript
const server = await servers.get('server_id', ServerFilter.MINIMAL);
```

### `execute(servers: string[], ...command: any): Promise<AppResponse>`

Executes a command on the specified servers.

- `servers`: An array of server IDs.
- `command`: The command to execute.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const response = await servers.execute(['server_id'], ServerAction.Restart);
```

## ServerResponse Interface

The `ServerResponse` interface represents the response from the server-related API calls and has the following structure:

```typescript
interface ServerResponse {
    status: number;
    data?: any;
    error?: {
        message: string;
    };
    getStats?: () => Promise<AppResponse>;
    getIcon?: () => Promise<AppResponse>;
    execute?: (...command: any) => Promise<AppResponse>;
    edit?: (obj: Server | object) => Promise<AppResponse>;
    getConsole?: (AmountOfLines?: number, Reversed?: boolean, takeFromBeginning?: boolean) => Promise<AppResponse>;
    isConsoleOutdated?: () => Promise<AppResponse>;
    scheduler?: Scheduler;
    backups?: Backups;
}
```

- `status`: The HTTP status code of the response.
- `data`: The data payload of the response (optional).
- `error`: An object containing an error message (optional).
- Additional methods for interacting with the server, such as `getStats`, `getIcon`, `execute`, `edit`, `getConsole`, `isConsoleOutdated`, `scheduler`, and `backups`.

## Enums

### ServerAction

- `InvalidOrEmpty`: 0
- `Stop`: 1
- `Start`: 2
- `Kill`: 3
- `Restart`: 4

# Scheduler Documentation

The `Scheduler` class is part of a JavaScript/TypeScript client for interacting with an API that manages tasks and scheduling on Minecraft servers. This documentation provides an overview of the class and its methods.

## Table of Contents

- [Constructor](#constructor)
- [Methods](#methods)
  - [get](#get)
  - [getTasks](#gettasks)
  - [getTask](#gettask)
  - [create](#create)
  - [update](#update)
  - [delete](#delete)
  - [run](#run)

## Constructor

### `constructor(obj: Servers)`

Creates an instance of the `Scheduler` class to interact with the Minecraft server scheduler API.

- `obj`: An instance of the `Servers` class.

**Example:**

```javascript
const client = new Client('127.0.0.1', 8080, 'your_api_key', true);
const servers = new Servers(client);
const scheduler = new Scheduler(servers);
```

## Methods

### `get(): Promise<AppResponse>`

Gets the current status of the scheduler.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const schedulerStatus = await scheduler.get();
```

### `getTasks(filter: TaskFilter | number = 0): Promise<AppResponse>`

Gets all tasks based on the specified filter.

- `filter`: The filter to apply (default is `TaskFilter.None`).

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const tasks = await scheduler.getTasks(TaskFilter.FixedTime);
```

### `getTask(Id: string): Promise<AppResponse>`

Gets a specific task by ID.

- `Id`: The ID of the task.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const taskDetails = await scheduler.getTask('task_id');
```

### `create(data: any | Task): Promise<AppResponse>`

Creates a new task.

- `data`: The task data.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const newTask = await scheduler.create({ name: 'Task 1', type: 'fixed', time: '12:00' });
```

### `update(Id: string, data: any | Task): Promise<AppResponse>`

Updates an existing task by ID.

- `Id`: The ID of the task.
- `data`: The updated task data.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const updatedTask = await scheduler.update('task_id', { name: 'Updated Task', type: 'interval', interval: 300 });
```

### `delete(Id: string): Promise<AppResponse>`

Deletes a task by ID.

- `Id`: The ID of the task to delete.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const deleteResponse = await scheduler.delete('task_id');
```

### `run(Id: string): Promise<AppResponse>`

Executes a task by ID.

- `Id`: The ID of the task to execute.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const executionResponse = await scheduler.run('task_id');
```

## Enums

### TaskFilter

- `None`: 0
- `FixedTime`: 1
- `Interval`: 2
- `Timeless`: 3

# Backups Documentation

The `Backups` class is part of a JavaScript/TypeScript client for interacting with an API that manages backups on Minecraft servers. This documentation provides an overview of the class and its methods.

## Table of Contents

- [Constructor](#constructor)
- [Methods](#methods)
  - [get](#get)
  - [getStats](#getstats)
  - [getBackup](#getbackup)
  - [create](#create)
  - [update](#update)
  - [delete](#delete)
  - [run](#run)
  - [getHistory](#gethistory)
  - [clearHistory](#clearhistory)

## Constructor

### `constructor(obj: Servers)`

Creates an instance of the `Backups` class to interact with the Minecraft server backups API.

- `obj`: An instance of the `Servers` class.

**Example:**

```javascript
const client = new Client('127.0.0.1', 8080, 'your_api_key', true);
const servers = new Servers(client);
const backups = new Backups(servers);
```

## Methods

### `get(): Promise<AppResponse>`

Gets all backups.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const allBackups = await backups.get();
```

### `getStats(): Promise<AppResponse>`

Gets backup statistics.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const backupStats = await backups.getStats();
```

### `getBackup(backup: string): Promise<AppResponse>`

Gets details about a specific backup by ID.

- `backup`: The ID of the backup.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const backupDetails = await backups.getBackup('backup_id');
```

### `create(data: Backup): Promise<AppResponse>`

Creates a new backup.

- `data`: The backup data.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const newBackup = await backups.create({ name: 'Backup 1', destination: '/path/to/backup' });
```

### `update(backup: string, data: Backup): Promise<AppResponse>`

Updates an existing backup by ID.

- `backup`: The ID of the backup.
- `data`: The updated backup data.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const updatedBackup = await backups.update('backup_id', { name: 'Updated Backup', destination: '/new/path' });
```

### `delete(backup: string): Promise<AppResponse>`

Deletes a backup by ID.

- `backup`: The ID of the backup.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const deleteResponse = await backups.delete('backup_id');
```

### `run(backup: string): Promise<AppResponse>`

Runs a backup by ID.

- `backup`: The ID of the backup.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const runResponse = await backups.run('backup_id');
```

### `getHistory(): Promise<AppResponse>`

Gets the backup history for the server.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const backupHistory = await backups.getHistory();
```

### `clearHistory(): Promise<AppResponse>`

Clears the backup history for the server.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const clearHistoryResponse = await backups.clearHistory();
```

# Users Documentation

The `Users` class is part of a JavaScript/TypeScript client for interacting with an API that manages users on Minecraft servers. This documentation provides an overview of the class and its methods.

## Table of Contents

- [Constructor](#constructor)
- [Methods](#methods)
  - [get](#get)
  - [getUser](#getuser)
  - [createUser](#createuser)
  - [updateUser](#updateuser)
  - [deleteUser](#deleteuser)
  - [wipeSessions](#wipesessions)

## Constructor

### `constructor(obj: Client)`

Creates an instance of the `Users` class to interact with the Minecraft server users API.

- `obj`: An instance of the `Client` class.

**Example:**

```javascript
const client = new Client('127.0.0.1', 8080, 'your_api_key', true);
const users = new Users(client);
```

## Methods

### `get(): Promise<AppResponse>`

Gets all users.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const allUsers = await users.get();
```

### `getUser(id: string): Promise<AppResponse>`

Gets details about a specific user by ID.

- `id`: The ID of the user.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const userDetails = await users.getUser('user_id');
```

### `createUser(user: object | User): Promise<AppResponse>`

Creates a new user.

- `user`: The user data.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const newUser = await users.createUser({ username: 'new_user', password: 'password123' });
```

### `updateUser(id: string, user: object | User): Promise<AppResponse>`

Updates an existing user by ID.

- `id`: The ID of the user.
- `user`: The updated user data.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const updatedUser = await users.updateUser('user_id', { username: 'updated_user', password: 'new_password' });
```

### `deleteUser(id: string): Promise<AppResponse>`

Deletes a user by ID.

- `id`: The ID of the user.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const deleteUserResponse = await users.deleteUser('user_id');
```

### `wipeSessions(): Promise<AppResponse>`

Wipes all user sessions.

**Returns:**
- A promise resolving to an `AppResponse` object.

**Example:**

```javascript
const wipeSessionsResponse = await users.wipeSessions();
```