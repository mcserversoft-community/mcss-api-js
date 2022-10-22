const mcss = require('../src/index.js');

const client = new mcss("192.168.1.198", 8050, "DtY6HWI2csbnQ3JjeXaBtT5eudKVGDQxHzCPJ1aOznzo70OwgiRsXXv0VaDZQoUmGwyPPjbN5OFKPwainjKgU7xsSH9rfuKsFHo5u6SSqegwARHQzQQIygDp");

(async() => {

    // Scheduler 
    let restart = new mcss.ServerTask()
    .setName("Edited Server Task") //Required
    .setEnabled(false)
    .setPlayerRequirement(2)
    .setTiming(150, true) //Required
    .setJobs([
        "say Hello", //Required
        "say Blob"
    ]);


    await client.server.fetch("996ed93b-07df-450f-a25c-296f667338df").scheduler.create(restart).then((data) => {
        console.log(data);
    });

    /*
    await client.server.fetch("996ed93b-07df-450f-a25c-296f667338df").scheduler.create(restart).then((data) => {
        console.log(data);
    });
    await client.server.fetch("996ed93b-07df-450f-a25c-296f667338df").scheduler.details().then((data) => {
        console.log(data);
    });
    */
   
    //let tasks = await client.server.fetch("996ed93b-07df-450f-a25c-296f667338df").getTasks();

})();
