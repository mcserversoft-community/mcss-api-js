# MCSS API

## Table of Contents

- [MCSS API](#mcss-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Client](#client)
    - [Types](#types)
    - [Example](#example)
  - [Server](#server)
    - [Editing a Server](#editing-a-server)
    - [Types](#types-1)
    - [Example](#example-1)
  - [Users](#users)
    - [Example customServerPermissions](#example-customserverpermissions)
    - [Example](#example-2)
  - [Scheduler](#scheduler)
    - [Example](#example-3)
  - [Backups](#backups)


## Installation
```bash
npm install @mcserversoft/mcss-api
```
or 
```bash
pnpm install @mcserversoft/mcss-api
```

## Client
The client is the main class of the package. It is used to communicate with the server.
<br>
The constructor takes 4 parameters:
- `ip` - The ip of the server
- `port` - The port of the server
- `apiKey` - The api key of the server
- `https` - Whether the server is using https or not

The client has 3 methods:
- `client.getStats(): Promise<AppResponse>` - Used to get the stats of the api
- `client.getServers(): Promise<AppResponse>` - Used to get all servers created
- `client.getServerCount(): Promise<AppResponse>` - Used to get the amount of servers created

The client has 2 sub classes:
- [`client.servers`](#server) - Used to get information about servers
- [`client.users`](#users) - Used to get information about users

### Types
AppResponse - The response from the api
```ts
type AppResponse = {
    status: number
    data?: any
    error?: {
        message: string
    }
}
```

### Example
```js
const { Client } = require('mcss-api-js');

/**
 * @param {string} ip 
 * @param {number} port 
 * @param {string} apiKey
 * @param {boolean} https
 */
const client = new Client('localhost', 8080, 'key', false);
```

## Server
The server is a class that is used to get information about a server/s. It is a sub class of the client class.
<br>

The server has 1 main methods:
- `client.servers.get(): Promise<ServerResponse>` - Used to get a server by its id

A server response has 6 methods and 2 sub classes:
- `server.getStats(): Promise<AppResponse>` - Used to get the stats of the server
- `server.getIcon(): Promise<AppResponse>` - Used to get the icon of the server
- `server.execute(): Promise<AppResponse>` - Used to execute a command on the server
- `server.edit(): Promise<AppResponse>` - Used to edit the server
- `server.getConsole(): Promise<AppResponse>` - Used to get the console of the server
- `server.isConsoleOutdated(): Promise<AppResponse>` - Used to check if the console is outdated
- [`server.scheduler`](#scheduler) - Used to get information about the scheduler
- [`server.backups`](#backups) - Used to get information about the backups

### Editing a Server
The server can be edited by using the `server.edit()` method. The method takes 1 parameter that is an object with the following properties:
- `name` (optional) : string
- `description` (optional) : string
- `isSetToAutoStart` (optional) : boolean
- `forceSaveOnStop` (optional) : boolean
- `javaAllocatedMemory` (optional) : int
  
You can also use a Server Builder to edit the server. The Server Builder has the following methods:
- `server.setName(name: string): Server` - Sets the name of the server
- `server.setDescription(description: string): Server` - Sets the description of the server
- `server.setAutoStart(isSetToAutoStart: boolean): Server` - Sets whether the server is set to auto start
- `server.setForceSaveOnStop(forceSaveOnStop: boolean): Server` - Sets whether the server should force save on stop
- `server.setAllocatedMemory(javaAllocatedMemory: int): Server` - Sets the java allocated memory of the server
```js
const { Server, GB } = require('mcss-api-js');

let newServer = new Server()
    .setName('New Server')
    .setDescription('This is a new server')
    .setAutoStart(true)
    .setForceSaveOnStop(true)
    .setAllocatedMemory(GB.ONE)

let server = await client.servers.get('server-id');
await server.edit(newServer);
```

### Types
 ServerResponse - The response from the server
```ts
type ServerResponse = {
    status: number
    data?: any
    error?: {
        message: string
    }
    getStats?: () => Promise<AppResponse>
    getIcon?: () => Promise<AppResponse>
    execute?: (...command: any) => Promise<AppResponse>
    edit?: (obj: Server|object) => Promise<AppResponse>
    getConsole?: (AmountOfLines?: number, Reversed?: boolean, takeFromBeginning?: boolean) => Promise<AppResponse>
    isConsoleOutdated?: () => Promise<AppResponse>
    scheduler?: Scheduler
    backups?: Backups
}
```
ServerActions - The actions that can be done on a server
```ts
const { ServerAction } = require('mcss-api-js');

ServerAction.InvalidOrEmpty // Does nothing
ServerAction.Start // Starts the server
ServerAction.Stop // Stops the server
ServerAction.Restart // Restarts the server
ServerAction.Kill // Kills the server
```

### Example
```js
let server = await client.servers.get('server-id');
```

## Users
The users class is used to get information about users. It is a sub class of the client class.
<br>
The users class has 6 methods:
- `client.users.get(): Promise<AppResponse>` - Used to get all users
- `client.users.getUser(): Promise<AppResponse>` - Used to get a user by their id
- `client.users.createUser(): Promise<AppResponse>` - Used to create a user
- `client.users.deleteUser(): Promise<AppResponse>` - Used to delete a user
- `client.users.updateUser(): Promise<AppResponse>` - Used to edit a user
- `client.users.wipeSessions(): Promise<AppResponse>` - Used to wipe all sessions of a user

To create a user you need to pass an object with the following properties:
- `username` (required) : string
- `password` (required) : string
- `passwordRepeat` (required) : string
- `enabled` (optional) : boolean
- `isAdmin` (optional) : boolean
- `hasAccessToAllServers` (optional): boolean
- `customServerPermissions` (optional) : object[]
  - `serverId` (required) : string 
    - `viewStats` (required) : boolean,
    - `viewConsole` (required) : boolean,
    - `useConsole` (required) : boolean,
    - `useServerActions` (required) : boolean
### Example customServerPermissions
```json 
[
    "serverId": {
        "viewStats": true,
        "viewConsole": true,
        "useConsole": true,
        "useServerActions": true
    }
]
```
You can also use a User Builder to create a user. The User Builder has the following methods:
- `user.setUsername(username: string): User` - Sets the username of the user
- `user.setPassword(password: string): User` - Sets the password of the user
- `user.setPasswordRepeat(passwordRepeat: string): User` - Sets the password repeat of the user
- `user.setEnabled(enabled: boolean): User` - Sets whether the user is enabled
- `user.setAdmin(isAdmin: boolean): User` - Sets whether the user is an admin
- `user.setHasAccessToAllServers(hasAccessToAllServers: boolean): User` - Sets whether the user has access to all servers
- `user.setCustomServerPermissions(customServerPermissions: object[]): User` - Sets the custom server permissions of the user
- `addCustomServerPermission(serverId: any, viewStats: boolean, viewConsole: boolean, useConsole: boolean, useServerActions: boolean): User` - Adds a custom server permission to the user
### Example
```js
const { User } = require('mcss-api-js');

let newUser = new User()
    .setUsername('New User')
    .setPassword('password')
    .setPasswordRepeat('password')
    .setEnabled(true)
    .setAdmin(false)
    .setHasAccessToAllServers(false)
    .setCustomServerPermissions([
        {
            "serverId": {
                "viewStats": true,
                "viewConsole": true,
                "useConsole": true,
                "useServerActions": true
            }
        }
    ])
    .addServerPermission('serverId', true, true, true, true)

await client.users.createUser(newUser);
// or 
await client.users.updateUser(newUser);
```

## Scheduler
The scheduler class is used to get information about the scheduler of a server. It is a sub class of the server class.
<br>
The scheduler class has 7 methods:
- `server.scheduler.get(): Promise<AppResponse>` - Used to get the scheduler of the server
- `server.scheduler.getTasks(): Promise<AppResponse>` - Used to get the tasks of the scheduler
- `server.scheduler.getTask(): Promise<AppResponse>` - Used to get a task of the scheduler
- `server.scheduler.create(): Promise<AppResponse>` - Used to create a task for the scheduler
- `server.scheduler.delete(): Promise<AppResponse>` - Used to delete a task of the scheduler
- `server.scheduler.update(): Promise<AppResponse>` - Used to update a task of the scheduler
- `server.scheduler.run(): Promise<AppResponse>` - Used to run a task of the scheduler

To create a task you need to pass an object with the following properties:
- `name` (required) : string
- `enabled` (optional) : boolean
- `playerRequirement` (optional) : object
- `timing` (required) : object
- `job` (required): object
  
You can also use a Task Builder to create a task. The Task Builder has the following methods:
- `task.setName(name: string): Scheduler` - Sets the name of the task
- `task.setEnabled(enabled: boolean): Scheduler` - Sets whether the task is enabled
- `task.setPlayerRequirement(playerRequirement: object): Scheduler` - Sets the player requirement of the task
- `task.setTiming(timing: object): Scheduler` - Sets the timing of the task
- `task.addJob(action: object | ServerAction | string[]): Task` - Sets the job of the task
### Example
```js
const ms = require('ms'); // npm install ms or pnpm install ms ( for the timing )
const { Task, ServerAction } = require('mcss-api-js');

let task = new Task()
    .setName('New Task')
    .setEnabled(true)
    .setTiming(true, ms('1h'))
    .addJob(ServerAction.Restart)

await server.scheduler.create(task);
// or
await server.scheduler.update(task);
```

## Backups
API for backups is incomplete.