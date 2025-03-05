const express = require('express') 
const app = express() 
const { v4: uuidv4 } = require('uuid');


let tasks = [
    {
        id : uuidv4(),
        task : "test_task",
        description : "this is a test task",
        completed : false
    }
]

app.use(express.json())

app.get("/" , (req, res) => {
    res.send("Task manager API")
})

//get all tasks
app.get("/tasks" , (req, res) => {
    res.send(tasks)
    
})


//get task by id
app.get("/tasks/:id" , (req, res) => {
    let {id} = req.params

    let task = tasks.find(task => task.id == id)
    res.send(task)
})


//add task
app.post("/tasks" , (req, res) => {
    let {title, description, completed} = req.body
    let id = uuidv4()
    tasks.push({id,
        title,
        description,
        completed})

    res.status(201).json({
        message: "task added successfully",
        data : {
            id,
            title,
            description,
            completed
        }
    })
})

//update task
app.put("/tasks/:id" , (req, res) => {
    let {id} = req.params

    let {title, description, completed} = req.body

    let task = tasks.find(task => task.id == id)
    
    if (task) {
        task.title = title
        task.description = description
        task.completed = completed


        res.status(200).json({
            message : "task updated successfully",
            data : task
        })

    } else {
        res.status(404).json({
            message : "task not found"
        })
    }
})


//delete task
app.delete("/tasks/:id" , (req, res) => {
    let {id} = req.params
    tasks = tasks.filter(task => task.id != id)

    res.status(200).json({
        message: "task deleted successfully"
    })
})


//imp
app.listen(3000 , () => {
    console.log("Server is running on port 3000")
})