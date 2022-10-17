const mcss = require('../src/index.js');

const client = new mcss("192.168.1.198", 8050, "DtY6HWI2csbnQ3JjeXaBtT5eudKVGDQxHzCPJ1aOznzo70OwgiRsXXv0VaDZQoUmGwyPPjbN5OFKPwainjKgU7xsSH9rfuKsFHo5u6SSqegwARHQzQQIygDp");

(async() => {

    // Scheduler 
    let restart = new mcss.ServerTask()
    .setName("HOi")
    .setEnabled(true)
    .setTiming(150, true)
    .setJobs([
        "say Hoi"
    ]);

    //console.log(restart);

    let tasks = await client.server.scheduler.getAll();

    console.log(tasks);


    // GETS SERVERS 
    //let servers = await client.getServers();
    // GETS SERVERS COUNT
    //let serverCount = await client.getServerCount();

    // Get Server Details
    //let server = await client.server.get("996ed93b-07df-450f-a25c-296f667338df");

    // Gets Server Stats
    //let serverStats = await client.server.getStats("996ed93b-07df-450f-a25c-296f667338df");
    
    // Gets Server Icon
    //await client.server.getIcon("996ed93b-07df-450f-a25c-296f667338df");

    // Executes Server Command
    //await client.server.execute("996ed93b-07df-450f-a25c-296f667338df", "say Hoi");

    // Builder for Editing Server Properties 
    /*
    let serverEdit = new mcss.ServerEditor()
    .setName("SkyWarriors")
    .setDescription("Kool SkyWars Server")
    .setAutoStartWithMcss(false)
    .setForceSaveOnStop(true)
    .setAllocatedMemoryInMegabytes(2048);
    */

    // Edits Server Properties 
    //let edits = await client.server.edit("db5a2c63-145e-4e2b-b832-476bf3695fbd", serverEdit);

    //console.log(servers);
    //console.log(serverCount);

    //console.log(server);
    //console.log(serverStats);

    //console.log(serverEdit);
    //console.log(edits);

})();
