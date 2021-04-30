/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable default-case */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { spawn, exec, execSync } = require('child_process');

const existingConfig = fs.existsSync('info.json');
const config = {
  version: 2,
};

console.log(__dirname);

function buildConfig() {
  inquirer
    .prompt([{
      type: 'text',
      name: 'name',
      message: 'Nama yang ingin anda gunakan?',
      default: path.basename(process.cwd()),
    },
    {
      type: 'list',
      name: 'type',
      message: 'Library apa yang ingin anda gunakan?',
      choices: [
        '@adiwajshing/baileys',
        '@open-wa/automate',
        'pedroslopez/whatsappweb',
      ],
      default: '@adiwajshing/baileys',
    },
    ])
    .then((answers) => {
      config.name = answers.name;
      switch (answers.type) {
        case '@adiwajshing/baileys':
          inquirer
            .prompt([{
              type: 'list',
              name: 'stable',
              choices: [
                'stable',
                'latest',
              ],
              default: 'stable',
            }])
            .then((answers) => {
              config.type = answers.name;
              switch (answers.type) {
                case 'stable':
                  exec('npm install @adiwajshing/baileys', (err, stdout) => {
                    if (err) return console.log(`Error saat memuat...\n ${err}`);
                    if (stdout) {
                      console.log(stdout);
                    }
                  });
                  break;
                case 'latest':
                  exec('npm install github:adiwajshing/baileys', (err, stdout) => {
                    if (err) return console.log(`Error saat memuat...\n ${err}`);
                    if (stdout) {
                      console.log(stdout);
                    }
                  });
                  break;
              }
            });
          break;
        case '@open-wa/automate':
          exec('npm i --save @open-wa/wa-automate@latest', (err, stdout) => {
            if (err) return console.log(`Error saat memuat...\n ${err}`);
            if (stdout) {
              console.log(stdout);
            }
          });
          break;
        case 'pedroslopez/whatsappweb':
          exec('npm i whatsapp-web.js', (err, stdout) => {
            if (err) return console.log(`Error saat memuat...\n ${err}`);
            if (stdout) {
              console.log(stdout);
            }
          });
          break;
      }
    });
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'info.json sudah tersedia! ingin membuatnya lagi?',
        default: 'false',
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        (
          console.log('Okeh, terima kasih! 👋')
        );
      }
    });
} else {
  buildConfig();
}
