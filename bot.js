var Discord = require('discord.js'); //Necesario para usar API de discord
var bot = new Discord.Client(); //Necesario escucha cliente.

bot.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send("pong");
    }
    
    //Funciona
    if (message.content.startsWith('!random')) {
        var content = message.content.split(" ");

        if (content.length < 3) {
            message.channel.send("Error de formato: Insuficiente numero de argumentos");
            message.channel.send("Formato: !random <Limite Inf> <Limite Sup>");
            return;
        }
        var x = parseInt(content[1]);
        var y = parseInt(content[2]);

        if (x >= y) {
            message.channel.send("Error de formato: Primer argumento debe ser menor que el segundo");
            message.channel.send("Formato: !random <Limite Inf> <Limite Sup>");
            return;
        }

        if (isNaN(content[1]) || isNaN(content[2])) {
            message.channel.send("Error de formato: Uno de los argumentos especificados no es un numero");
            message.channel.send("Formato: !random <Limite Inf> <Limite Sup>");
            return;
        }

        if (x < 0 || y < 0) {
            message.channel.send("Error de formato: Uno de los argumentos especificados es menor que 0");
            message.channel.send("Formato: !random <Limite Inf> <Limite Sup>");
            return;
        }
        message.channel.send("Random entre " + x + " y " + y + ".");
        message.channel.send(Math.floor(Math.random() * ((y - x) + 1) + (x)));
    }
    
    
    if (message.content.startsWith('!purge')) {
        var content = message.content.split(" ");
        if (content.length < 2) {
            message.channel.send("Error de formato: Insuficiente numero de argumentos");
            message.channel.send("Formato: !purge <cantidad>");
            return;
        } else {
            if (message.author.id != 224571309420445698) {  //No tocar
                message.channel.send('No tienes privilegios');
                return;
            }

            if (isNaN(content[1])) {
                message.channel.send('Error de formato: Segundo argumento no es un numero');
                message.channel.send("Formato: !purge <cantidad>");
                return;
            }

            var cantidad = parseInt(content[1]);

            if (cantidad <= 0) {
                message.channel.send('Error de formato: Segundo argumento debe ser mayor de 0');
                message.channel.send("Formato: !purge <cantidad>");
                return;
            }
            message.channel.bulkDelete(cantidad + 1);
            message.channel.send("Eliminados " + cantidad + " mensajes.");
        }
    }
    
});

bot.on('guildMemberAdd', member => {
    member.sendMessage("Bienvenido! Para obtener acceso completo al servidor pide a un admin que te de el rango 'Member'.");
});

bot.on('ready', () => {

    console.log(`Logged in as ${bot.user.tag}!`);

});

bot.login(process.env.BOT_TOKEN);
