const Todo = require('../models/Todo')
const User = require('../models/User')


module.exports = {
    getTodos: async (req,res)=>{
        try{
            //Returns user making the req
            const user = await User.findById(req.user)
            //Returns all todos by requesting user
            const todoItems = await Todo.find({googleId: req.user})
            //Counts all documents from reuqesting user
            const itemsLeft = await Todo.find({googleId: req.user}).countDocuments({completed: false})
            //returns array with todos only
            const itemString = await todoItems.map(s => s.todo)
            res.render('dashboard',{todo: itemString, left: itemsLeft, user: user.firstName,})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, googleId: req.user})
            console.log('Todo has been added!')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        try{
            await Todo.findOneAndDelete(req.body.todoIdFromJSFile)
            console.log('Todo Deleted!')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
}    

// markComplete: async (req, res)=>{
//     try{
//         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
//             completed: true
//         })
//         console.log('Marked Complete')
//         res.json('Marked Complete')
//     }catch(err){
//         console.log(err)
//     }
// },
// markIncomplete: async (req, res)=>{
//     try{
//         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
//             completed: false
//         })
//         console.log('Marked Incomplete')
//         res.json('Marked Incomplete')
//     }catch(err){
//         console.log(err)
//     }
// },