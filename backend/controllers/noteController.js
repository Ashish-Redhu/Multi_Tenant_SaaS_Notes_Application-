const NoteModel = require("../models/noteModel");
const UserModel = require("../models/userModel");

//1. Create a new note
exports.createNote = async (req, res)=>{
    try{
        const {heading, description} = req.body;

        // create note.
        const note = new NoteModel({
            heading, description, author: req.user._id
        });
        await note.save();
        res.status(201).json(note);
    }
    catch(err){
        res.status(500).json({message: `Server error while creating a new Note: ${err.message}`});
    }
}

//2. Get all notes from the current tenant
exports.getAllNotes = async (req, res)=>{
    try{
        //i. Get all users whose tenantId is same as the current loggedIn user.
        const usersInTenant = await UserModel.find({tenancy: req.user.tenancy}).select("_id"); // It gives array of objects (each object is having only userid)
        const userIds = usersInTenant.map(u => u._id); // array having only userid. 
        
        //ii. Find all notes whose authors are these. 
        const notes = await NoteModel.find({author: {$in: userIds}});
        res.json(notes);
    }
    catch(err){
        res.status(500).json({message: `Server error in getting all notes: ${err.message}`});
    }
}

//3. Get specific note by ID
exports.getNoteById = async (req, res)=>{
    try{
        const note = await NoteModel.findById(req.params.id).populate("author");
        if(!note) return res.status(404).json({message: "Note not found"});

        if(note.author.tenancy.toString() != req.user.tenancy.toString()){
            return res.status(403).json({message: "Access denied"});
        }
        res.json(note);
    }
    catch(err){
        res.status(500).json({messaeg: err.message});
    }
}

//4. Update a note
exports.updateNote = async (req, res)=>{
    try{
        const note = await NoteModel.findById(req.params.id).populate("author");
        if(!note) return res.status(404).json({message: "Note not found"});

        if(note.author.tenancy.toString() != req.user.tenancy._id.toString()){
            return res.status(403).json({message: "Access denied."});
        }

        note.heading = req.body.heading || note.heading;
        note.description = req.body.description || note.description;

        await note.save();
        res.json(note);
    }
    catch(err){
        res.status(500).json({message: `Server error while updating the note: err.message`});
    }
}

//5. Delete a note
exports.deleteNote = async (req, res)=>{
    try {
        
        const note = await NoteModel.findById(req.params.id).populate("author");
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.author.tenancy.toString() !== req.user.tenancy._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        await note.deleteOne();
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}