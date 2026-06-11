import Note from "../models/Notes.js"



export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt : -1}) // -1 will sort in desc from the latest created note 
        return res.status(200).json(notes)
    } catch (error) {
        console.log("error in getting all notes", error);


        return res.status(500).json({ message: "internal sever error" })
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params
        
        const note = await Note.findById(id)
        console.log(note);
        
        if (!note) {
            return res.status(404).json({ message: "not found note" })

        }
        return res.status(200).json(note)
    } catch (error) {
        console.log("error in getting note", error);


        return res.status(500).json({ message: "internal sever error" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        console.log(title, content);

        const newNote = await Note.create({ title, content })
        return res.status(201).json({ message: "note created successfully", newNote })

    } catch (error) {
        console.log("error in creating note", error);


        return res.status(500).json({ message: "internal sever error" })
    }
}

export const updateNote = async (req, res) => {

    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        return res.status(200).json({ message: "note modified successfully", updatedNote })

    } catch (error) {


        console.log("error in updating note", error);


        return res.status(500).json({ message: "internal sever error" })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id, { new: true })
        return res.status(200).json({ message: "note deleted successfully", deletedNote })

    } catch (error) {


        console.log("error in deleting note", error);


        return res.status(500).json({ message: "internal sever error" })
    }
}