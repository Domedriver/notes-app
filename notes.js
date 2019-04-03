const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()    
    const duplicateNote = notes.find(note => note.title === title)    
    if (!duplicateNote) {
        notes.push({title, body})
        saveNotes(notes)        
        console.log(chalk.bgGreen.black.bold('New note added!'))
    } else {        
        console.log(chalk.bold.bgRed('Note title taken'))
    }    
}

const removeNote = title => {
    const notes = loadNotes()
    const filteredList = notes.filter(note => note.title !== title)
    if (notes.length == filteredList.length) {
        console.log(chalk.bold.bgRed('No note found!'))
    } else {
        console.log(chalk.bgGreen.black.bold('Note removed!'))
        saveNotes(filteredList)
    }    
}

const listNotes = () => {
    console.log(chalk.blue.bold.inverse('Your Notes:'))
    loadNotes().forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const foundNote = loadNotes().find(note => note.title === title)    
    if (!foundNote) {
        console.log(chalk.red.bold.inverse('That note does not exist'))
    } else {        
        console.log(chalk.green.bold.inverse(foundNote.title))
        console.log(chalk.green(foundNote.body))
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }    
}

module.exports = {    
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}