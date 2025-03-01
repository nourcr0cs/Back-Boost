const fs = require('fs');
const os = require('os');
const path = require('path');


const folderName = 'test-folder';
const folderPath = path.join(__dirname, folderName);
const filePath = path.join(folderPath, 'info.txt');

//1.creating folder
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
  console.log(`FOLDER CREATED : '${folderPath}' `);
} else {
  console.log(`FOLDER '${folderPath}' already exists.`);
}

//2.writing OS info into info.txt
const infoToFile = `File Content:\nOS: ${os.platform()}\nArchitecture: ${os.arch()}\nHome Directory: ${os.homedir()}`; //req
fs.writeFileSync(filePath, infoToFile);
console.log(`OS info written into info.txt`);

//3.reading and printing info.txt
console.log(`Content of info.txt :`);
console.log(fs.readFileSync(filePath).toString());

//4.renaming info.txt
const renamed = path.join(folderPath,'system-info.txt'); //to log full path
fs.renameSync(filePath,renamed);
console.log(`file renamed to : ${renamed}`);

//5.deleting system-info.txt after 5 seconds
console.log('deleting file in 5 seconds..');
setTimeout(() => {
  fs.unlinkSync(renamed);
  console.log(`file deleted: ${renamed}`);

}, 5000);


//6. monitoring system function
function monitorSystem() {
  console.log('monitoring system...');
}

//run every 10s = 10000ms
setInterval(monitorSystem, 10000);

