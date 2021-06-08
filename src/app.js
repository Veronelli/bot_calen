require('dotenv').config()

const Discord = require('discord.js')
const Order = require('./utils/calen')

const client = new Discord.Client()
const TOKEN = process.env.Token_Bot

client.on('ready',(msg)=>{
    console.log("Looged!!")

})

client.on("message", (message) => {

    const msg = message.content.split(' ')//"fdsfdsgdf gfgfdgf s fdsf" String ['fdsf', ]
    
    switch(msg[0]){
        case "-help":
            message.reply("Commands:\n**ADD** a new task: `-add [DAY] [TIME] [MESSAGE]`\n**REMOVE** a task: `-rmv [ID]`\n **UPDATE** a task: `-upd [DATA] [ID] [VALUE]`\n       **DATA:** `msg(message), dt(date)`")

            break
        case "-list":
            message.channel.send("Looking your tasks " + message.author.username)
            console.log("Buscar...")
            Order.viewTasks(message)

            break
        case "-add":
            console.log("Agregar...")
            const info = Order.add(msg, message.author)
            message.channel.send(info)
            break

        case "-rmv":
            
            console.log("Remover...")

            Order.remove(msg[1],message)
            break
        
        case "-upd":
            console.log('Update...')
            
            switch(msg[1]){
                case "msg":
                    console.log("messages")
                    Order.updateMessage(msg, message)
                    console.log("FIn")

                    break

            }


            break

    }
})

client.login(TOKEN)