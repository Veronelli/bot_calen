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
    if(sentence == "" || date.toString() == "Invalid Date"){
        return "Invalid datas"

    }

    const task = {
        _id,
        message: sentence,
        alert: date,
        createdAt: date_now,
        author,
        alerted: false
        
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

const updateDate = (msg)=>{
    const date = createDate(msg[3],msg[4])
    const alert = new Date(date)
    const id = msg[2]

    const tasks = File.getCalen()
    const index = tasks.findIndex((tk) => tk._id == id)

    if(index == -1)
        return "Error with date"
    
    tasks[index].alert = alert.toISOString()

    console.log(tasks)
    File.setCalen(tasks)
    return "The update was successfully"

}

const createDate = (date,time)=>{
    return (date + " " + time)

}

const registry = (channel, client)=>{
    const tasks = File.getCalen()

    const now_alert = Date.now()
    const Now_Alert = new Date(now_alert)

    const Year = Now_Alert.getFullYear()
    const string_Mouth = addZero(Now_Alert.getMonth())
    const string_Day = addZero(Now_Alert.getDay())

    const string_Hours = addZero(Now_Alert.getHours())
    const string_Minutes = addZero(Now_Alert.getMinutes())

    const now_time = string_Hours + ":" + string_Minutes
    const now_day = string_Day + "/" + string_Mouth + "/" + Year

    for(let i = 0; i < tasks.length; i++){
        
        const alert = tasks[i].alert
        const alert_date = new Date(alert)

        const string_alert_Year = addZero(alert_date.getFullYear())
        const string_alert_Month = addZero(alert_date.getMonth())
        const string_alert_Day = addZero(alert_date.getDay())

        const string_alert_Hours = addZero(alert_date.getHours())
        const string_alert_Minutes = addZero(alert_date.getMinutes())

        const alert_time = string_alert_Hours + ":" + string_alert_Minutes
        const alert_day = string_alert_Day + "/" + string_alert_Month + "/" +string_alert_Year
        
        if(now_time == alert_time && now_day == alert_day)
            client.channels.cache.get(channel).send(tasks[i].message)

        
        if(tasks[i].alerted == false && now_day == alert_day){

            console.log("Alert of the day")
            console.log(`${alert_day} ${alert_time}`)
            tasks[i].alerted = true
            
            client.channels.cache.get(channel).send("**Remember**: " + tasks[i].message +", today at " + alert_time)
            File.setCalen(tasks)

        }

    }

}

const addZero = (dt)=>{
    return dt <= 10 ? "0" + dt : dt

}

module.exports = {
    add,
    remove,
    viewTasks,
    updateMessage,
    updateDate,
    registry
}