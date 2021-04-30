const fs = require('fs');
const inquirer = require('inquirer');

const existingConfig = fs.existsSync('info.json'); 
const question = []

function buildConfig(){
    console.log("Harap tunggu...")
}

if(existingConfig){
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'overwrite',
            message: 'info.json sudah tersedia! ingin membuatnya lagi?',
            default: 'false'
        }
    ])
    .then(answers =>{
        if(answers.overwrite){
            buildConfig();
        } else (
            console.log("Okeh, terima kasih! 👋")
        )
    })
}

console.log(`work in progress`);
