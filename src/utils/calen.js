const File = require('./file')
const uid =  require('uniqid')

const viewTasks = (msg)=>{
    const tasks = File.getCalen()
    const user_tag = msg.author.username + "#" + msg.author.discriminator
    let sentence = ""
    for(let i = 0; i < tasks.length; i++){
        if(user_tag == tasks[i].author){
            console.log(tasks[i])
            sentence += '```id: '+ tasks[i]._id +'\nDate:' + tasks[i].alert + '.\nAuthor:' + tasks[i].author +'.\nMessage: \n' + tasks[i].message +'``` '

        }

        

    }
    msg.channel.send(sentence)

}

const add = (msg,author)=>{

    let sentence = ""
    
    let date_string = createDate(msg[1],msg[2])
    let date = new Date(date_string)
    let date_now_aux = Date.now()
    let date_now = new Date(date_now_aux)
    
    author = author.username + "#"+ author.discriminator

    let _id = uid(msg[1])
    let tasks = File.getCalen()
    
    for(let i = 3 ; i < msg.length; i++){
        sentence = msg[i] + " "

    }
    console.log(date.toString())

    if(sentence == "" || date.toString() == "Invalid Date"){
        return "Invalid datas"

    }

    const task = {
        _id,
        message: sentence,
        alert: date,
        createdAt: date_now,
        author
        
    }

    if(tasks.error == 'Falta'){
        File.setCalen([task])
        return task

    }
    tasks.push(task)
    console.log(tasks)
    File.setCalen(tasks)
    return "Task was added"

}

const remove = (_id, message)=>{
    let tasks = File.getCalen()
    let user_tag = message.author.username + "#" + message.author.discriminator
    
    const index = tasks.findIndex(tsk=>{
        return tsk._id == _id

    })

    if(index != -1  && tasks[index].author == user_tag){
        tasks.splice(index,1)[0]
        message.channel.send("The task was removed")
        return File.setCalen(tasks)

    }
    message.reply("You Have not access to this task")

}

const updateMessage = (msg, message)=>{
    let tasks = File.getCalen()
    let sentence = ""
    
    const user_tag = message.author.username + "#" + message.author.discriminator

    const i_task = tasks.findIndex((tsk)=>{
        return tsk._id == msg[2]

    })
    
    if(i_task == -1 || tasks[i_task].author != user_tag){
        console.log("Error")
        return {error: 'Tasks was not found' }

    }
    console.log(msg.length)
    for(let i = 3; i < msg.length; i++){
        sentence += msg[i] + " "

    }

    tasks[i_task].message = sentence
    console.log(tasks)
    message.reply(`The message **${tasks[i_task]._id}** was updated successfully`)
    File.setCalen(tasks)

}

const createDate = (date,time)=>{
    return (date + " " + time)

}

module.exports = {
    add,
    remove,
    viewTasks,
    updateMessage
}