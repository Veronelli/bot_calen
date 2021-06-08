const fs = require('fs')

const getCalen = ()=>{
    try{
        const reader = fs.readFileSync('data.json','utf8')
        return JSON.parse(reader)

    }
    catch(err){
        return {error: 'Falta'}

    }

}

const setCalen = (calen)=>{
    let calen_aux = JSON.stringify(calen)
    fs.writeFileSync('data.json',calen_aux)

}

module.exports = {
    setCalen,
    getCalen

}