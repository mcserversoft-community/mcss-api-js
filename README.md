# [MC ServerSoft API]("https://apidocs.mcserversoft.com")

# Overview
- [Docs]("https://docs.mcserversoft.com")
- [API Docs]("https://apidocs.mcserversoft.com")
- [Examples](#examples)
- [Discord]("https://discord.com/invite/DEn89PB")
- [Github]("https://github.com/mcserversoft")
- [Support]("https://ko-fi.com/fiahblade")

<h1 id="examples">Examples</h1>

## Creating Client 
```js
const mcss = require('../src/index.js');

const client = new mcss("IP", Port, "APIKEY");
```

## Server
</br>

### Getting Server
```js
    const serverID = "996ed93b-07df-450f-a25c-296f667338df"; 

    // GETS SERVERS 
    let servers = await client.getServers();

    // GETS SERVERS COUNT
    let serverCount = await client.getServerCount();

    // GET SERVER DETAILS
    let server = await client.server.get(serverID);

    // GET SERVER STATS
    let serverStats = await client.server.getStats(serverID);
    
    // GET SERVER ICON
    let serverIcon = await client.server.getIcon(serverID);    
```

### Executing Server Actions and Commands
```js
    /* 
    Sending a Server Action
    0 = InvalidOrEmpty
    1 = Stop
    2 = Start
    3 = Kill
    4 = Restart
    */
    await client.server.execute("996ed93b-07df-450f-a25c-296f667338df", 1);

    // Sending a Command
    await client.server.execute("996ed93b-07df-450f-a25c-296f667338df", "say Hello");

    // Sending Multiple Commands
    await client.server.execute("996ed93b-07df-450f-a25c-296f667338df", "say Hello", "say How is Everyone!");
```

### Editing Servers
```js
    let serverEdit = new mcss.ServerEditor()
    .setName("SkyWarriors")
    .setDescription("Kool SkyWars Server")
    .setAutoStartWithMcss(true || false)
    .setForceSaveOnStop(true || false)
    .setAllocatedMemoryInMegabytes(2048);

    // Edits Server Properties 
    await client.server.edit("db5a2c63-145e-4e2b-b832-476bf3695fbd", serverEdit);
```

## Scheduler
</br>

### Server Tasks
```js

    // GETS ALL SERVER TASKS
    let Tasks = await client.server.fetch(serverID).getTasks();

    // GET A SERVER TASK DETAILS
    let task = await client.server.fetch(serverID).scheduler.details();

    // GETS A SERVER TASK
    let task = await client.server.fetch(serverID).scheduler.get(taskID);

    let restart = new mcss.ServerTask()
    .setName("Restart") //Required
    .setEnabled(true || false)
    .setPlayerRequirement(1)
    .setTiming(150, true || false) //Required
    .setJobs([
        "say Hello" //Required
    ]);

    // Create Task
    let createdTask = await client.server.fetch(serverID).scheduler.create(restart);

    // Edit Task
    await client.server.fetch(serverID).scheduler.edit(taskID, restart);

    // Delete Task
    await client.server.fetch(serverID).scheduler.delete(taskID);

    // Run Task
    await client.server.fetch(serverID).scheduler.run(taskID);
```


