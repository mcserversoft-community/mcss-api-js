const { MCSS, Server } = require('./dist')

const mcss = new MCSS('172.20.10.7', 25560, '16BH5hpQaCJrSVlkFAfX9eU0U66gO60JIWgra2AupBS0Kp3JdwONii8oSR2DC5rcx5obtqNlT7kiuI4xKozW1eOVSffUeetHu92zCTBEh40BS6Mk7PEnkSmi')
const test = new Server( mcss, {
	'guid': 'ae6f5da5-743c-4cbb-9307-6119eca4e19c',
	'status': 0,
	'name': 'Paper',
	'description': '',
	'pathToFolder': 'C:\\Users\\eliot\\Desktop\\MCSS\\servers\\Paper\\',
	'folderName': 'Paper',
	'creationDate': '2022-09-12T16:06:39.6505852+02:00',
	'isSetToAutoStart': false,
	'forceSaveOnStop': true,
	'keepOnline': 0,
	'javaAllocatedMemory': 2048,
	'javaStartupLine': 'java -Xms256M -Xmx[RAM]M -jar [SERVERTYPE.NAME].jar'
} )
async function main() {
    const data = await mcss.getServers()
	mcss.saveServers()
}

main()