const Commando = require('discord.js-commando');
const bot = new Commando.Client({ unknownCommandResponse: false});
const TOKEN = 'NTUxNDQyNDM1NTIwMjAwNzQz.D1xC-w.k3f12Ry4kByUGJFZoKfqS1Ib394';
const forbiddenWords = ["nopor","trola","ptm","verga", "tetas","chota","orto", "culo","puto", "pelotudo", "estupido", "mongolo", "retrasado", "test", "trolo", "idiota", "maricon", "marica", "concha", "pija", "sorete"];
const MAX_INFRACTIONS_NUMER = 7;
const EXPIRATION_TIME = 80000;

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerDefaults();

bot.registry.registerCommandsIn(__dirname + "/commands");


bot.on('message', (message) =>{
    if(message.content.toLowerCase() == 'hola' ){
        message.channel.send('Bienvenido '+message.author+ ', cómo estás?');
    }
});

bot.on('ready', function(){
    console.log('ready');
});

//IGNORE
class CorruptPerson{
    constructor(user){
        this.date = new Date();
        this.user = user;
        this.infactionNumber = 0;
    }

    getAge(){
        return (new Date() - this.date);
    } 
    
    getUser(){
        return this.user;
    }

    addInfraction(){
        this.infactionNumber++;
    }
    

}

//IGNORE
let channel; //DELETE
class CorruptionCollection{ 
    
    constructor(){
        this.set = new Set();
    }

    addCorrupt(corruptPerson){
        this.set.add(corruptPerson);
    }

    removeCorrupt(corruptPerson){
        for(let user of this.set){
            if(user.getUser().username == corruptPerson.getUser().username){
                this.set.delete(user);
                break;
            }
        }
    }

    getCorrupt(name){
        for(let person of this.set){
            if(person.getUser().username == name) return person;
        }
    }

    checkExpiration(expirationT){
        this.set.forEach(person => {
            console.log(person.getUser().username + ": " + person.getAge());
            if(person.getAge() > expirationT){
                //channel.send(person.getUser().username + " has escaped from prison");
                this.removeCorrupt(person)};
        });
    }

    checkLegality(maxInfraction, message){
        
        for(let person of this.set){
            if(person.getUser().username == message.author.username && person.infactionNumber > maxInfraction){
                message.guild.member(message.author).kick("Because you have been such a bad boy!");
                //message.channel.send("You've just been kicked. Well, or at least that's the idea... (Contact my creator to enable this functionality xD)");
                message.channel.send("Sayoranara Baby!!");
                this.removeCorrupt(person);
            }
        }
        return false;
    }

    hasUser(user){
        
        for(let person of this.set){
            console.log(user.username + " here");
            console.log(person.getUser().username + " here");
            var contains = person.getUser().username.trim() == user.username.trim();
            if(contains) return true;
        }
        
        return false; 
    }

    getJailSize(){
        return this.set.size;
    }
}


const corruptionCollection = new CorruptionCollection();


//Garbage Collector
setInterval(()=>{
    corruptionCollection.checkExpiration(EXPIRATION_TIME);
    console.log("searching..")
},1000);

bot.on('message', (message) =>{
    channel = message.channel;
    if(!message.content.startsWith("!") && !message.content.startsWith(";")){
        for(word of forbiddenWords){
            //if(message.content.toLowerCase().includes("pitusas")) message.reply("naa wacho, tan muy cara");
            if(message.content.toLowerCase().includes(word) && !corruptionCollection.checkLegality(MAX_INFRACTIONS_NUMER, message)){
                var autor = message.author;
                let contains = corruptionCollection.hasUser(autor);
                console.log(contains);
                if(contains){
                    let corrupto = corruptionCollection.getCorrupt(autor.username);
                    corrupto.addInfraction(); //Add infraction

                    //message.reply(((MAX_INFRACTIONS_NUMER - corrupto.infactionNumber + 1)>0) ? "Deja de bardear - Advertencias restantes: " + (MAX_INFRACTIONS_NUMER - corrupto.infactionNumber + 1) : "ULTIMA ADVERTENCIA"); 
                    if(!(MAX_INFRACTIONS_NUMER - corrupto.infactionNumber + 1)>0) message.reply("ULTIMA ADVERTENCIA - DEJA DE BARDEAR");
                    if((MAX_INFRACTIONS_NUMER - corrupto.infactionNumber + 1) != 0 && (MAX_INFRACTIONS_NUMER - corrupto.infactionNumber + 1)<3) message.reply("Deja de bardear - Advertencias restantes: " + (MAX_INFRACTIONS_NUMER - corrupto.infactionNumber + 1));
                    //message.channel.send("Hay "+corruptionCollection.getJailSize()+" user en la carcel actualmente");
                    //message.channel.send("User: "+ corrupto.getUser().username + " tiene "+ corrupto.infactionNumber + " infracciones");
                }else{
                    //message.reply("wacho deja de joder o te saco de mi boliche"); 
                    var corruptAutor = new CorruptPerson(autor);
                    corruptAutor.addInfraction();
                    corruptionCollection.addCorrupt(corruptAutor);
                }
                break;
            }
        }
    }
});


bot.login(TOKEN);





//551442435520200743
//https://discordapp.com/api/oauth2/authorize?client_id=551442435520200743&permissions=0&scope=bot