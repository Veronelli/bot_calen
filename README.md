# Bot Calen
This bot can add tasks in a Json with commands in Discord 
## Run
If you want initialize the bot,but we need install all packeges for the bot can run.
```shell
    npm i
```
Once you install all packets, you will able write this command to initialize:
```shell
    npm start
``` 
## Commands
If you have initialized the bot, you will able interact with it.\
To config the bot in the server, you have to write this:
```shell 
    -config [ID]
```
Add a new task:
```shell
    -add [DAY] [TIME] [MESSAGE]
```
Remove a task
```shell
    -rmv [ID]
```
,or Update:
```shell
    -upt [OPTION] [ID] [VALUE]
```
So you can see all tasks:
```shell
    -list
```
If you don't remember the commands, you can use
```shell
    -help
```

### Update options table
| Option     | Description |
|---------  |-------|
|`msg`      |  This option allow to use message propetie     |
|`dt`       | Allow you manipulate the date

MY LINKEDIN: [Facundo Veronelli](https://www.linkedin.com/in/facundoveronelli/).\
(Pd: This bot isn't complete, I have to add some funtionalities)