const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note => note.title === title)    
    if (duplicateNotes.length == 0) {
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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}