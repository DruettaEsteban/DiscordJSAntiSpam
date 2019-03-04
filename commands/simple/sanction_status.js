const commando = require('discord.js-commando');

class SanctionsStatement extends commando.Command{
    constructor(client){
        super(client,{
            name: 'sortear',
            group: 'simple',
            memberName: 'sortear',
            description: 'Sortea entre varias personas Ej: !sortear Juan, Pepe, Martin (No olvidar las comas)'
        });
    }

    async run(message, args){
        if(!args.length < 1){
            let participantes = args;
            let nombres = [];
            var nameCounter = 0;
            nombres[nameCounter] = "";
            for(var i = 0; i < participantes.length ; i++){
                if(participantes[i] == ","){
                    nombres[nameCounter] = nombres[nameCounter].trim();
                    nameCounter++;
                    nombres[nameCounter] = "";
                }else{
                    nombres[nameCounter] += participantes[i];
                }
            }
            var winner = Math.floor(Math.random() * (nameCounter + 1));
            message.channel.send("Ehh wacho, " + nombres[winner] + " ha ganado el sorteo");
        }else{
            message.reply("Ehh wacho, le erraste para la bosta");
        }

    }
}

module.exports = SanctionsStatement;