const chalk = require('chalk')
const getNotes = require('./notes.js')

var notes = getNotes()

console.log(notes)

console.log(chalk.black.bgRed.bold.underline('Error'))


