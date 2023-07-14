const { Client, ServerAction, Server } = require('../dist/index.js');

const client = new Client(
    "IP", 
    8050, 
    "DtY6HWI2csbnQ3JjeXaBtT5eudKVGDQxHzCPJ1aOznzo70OwgiRsXXv0VaDZQoUmGwyPPjbN5OFKPwainjKgU7xsSH9rfuKsFHo5u6SSqegwARHQzQQIygDp",
    false
);

(async () => {
    let server = await client.servers.get("42cc671e-4953-436e-9057-978c691a4901");
    console.log(server);

    let scheduler = await server.scheduler.get();
    console.log(scheduler);

})();