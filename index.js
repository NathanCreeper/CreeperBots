//------ Connection ------//
const Discord = require("discord.js")
const config = require("./index.json")
const ytdl = require("ytdl-core")
const Client = new Discord.Client()
const prefix = "c/";
const { MessageAttachment } = require("discord.js");

Client.login(config.token)
Client.on("ready", message => {
    console.log("Connecter")
    Client.user.setStatus("online")
    Client.user.setActivity("En développement")
});

//------ Bienvenu ------//
Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "452223123111018548").send("**" + member.displayName + "**" + " Je te souhaite la bienvenue sur mon serveur Discord :tada::hugging:!\nVa dans le salon #⭐➖bienvenue➖⭐  pour découvrir mon serveur. \nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur !");
    const attachment = new MessageAttachment("http://4.bp.blogspot.com/-7BcY3Lh0gng/UBBePooBAPI/AAAAAAAAAxw/WqRdaCCkbiM/s1600/minecraft+band.gif");
    member.guild.channels.cache.find(channel => channel.id === "452223123111018548").send(attachment).then(mbr => {
        console.log("Il est bien arrivé")
    }).catch(() => {
        console.log("Erreur au niveau des bienvenues")

    });
});

//------ Départ ------//
Client.on("guildMemberRemove", member => {
    console.log("Un membre nous a quitté");
    member.guild.channels.cache.find(channel => channel.id === "558179271927922709").send("**" + member.displayName + "**" + " à quitté le serveur :slight_frown: \nTellement triste de te voir partir maintenant \nNous sommes désormais **" + member.guild.memberCount + "** sur le serveur !");
    const attachment = new MessageAttachment("https://64.media.tumblr.com/a24173d8cb34e5571064a0bad49b7aa0/tumblr_o0lfmmRGOd1rc6ytdo1_r1_400.gif");
    member.guild.channels.cache.find(channel => channel.id === "558179271927922709").send(attachment).then(mbr => {
        console.log("Il est bien parti")
    }).catch(() => {
        console.log("Erreur au niveau des partants")

    });
});

//------ Musique ------//
Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                if(!args[1]){
                    message.reply("Il manque le lien de la musique")
                    connection.disconnect();
                }
                else {
                    let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }));

                    dispatcher.on("finish", () => {
                        dispatcher.destroy();
                        connection.disconnect();
                    });
                
                    dispatcher.on("error", err => {
                        console.log("erreur de dispatcher : " + err)
                    });
                }    
            }).catch(err => {
                message.reply("Erreur lors de la connexion : " + err);
            });
        } 
        else {
            message.reply("Vous n'êtes pas connecté dans un vocal.")
        }
    }
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "Salut"){
        message.reply("Salut et bienvenu sur le serveur si tu as besoin d'aide fais c/Info");
    }
});

//------ Message ------//
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(message.content == prefix + "Info")

    var embed = new Discord.MessageEmbed()
        .setColor("#3cff00")
        .setTitle("**Info**")
        .setDescription("c/BanList pour voir les mots interdit\nc/Music pour tous connais sur le vocal musique \nc/Ad pour savoir comment mettre sa pub")
        .setTimestamp()

    message.channel.send(embed);
});
    
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "BanList"){
        message.reply("Les mots interdits sont : Bâtard, Con, Conne, Connasse, Connard, Enculé, Fils de pute, Ferme ta gueule, Nique ta mère, Nique ta race, Pd, Salope\nSi vous utilisez ces mots vous pouvez être ban donc attention au langage.");
    }
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "Music"){
        message.reply("Pour pouvoir avoir la musique il faut être au moins grade Sanguinaire ou Super Membre\nPour mettre une musique c'est !play (lien)\nPour mettre en pause c'est !pause\nPour reprendre c'est !resume\nPour arrêter c'est !stop\nAh et aussi tu peux faire un quiz musical c'est !start-quiz pour commencer et !stop-quiz pour arrêter");
    }
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "Ad"){
        message.reply("D'abord il faut au moins être Sanguinaire ou Super Membre\nLa publicité c'est simple, pas de lien direct, vous devez avoir une belle présentation de ce que vous proposez et aussi bien expliqué ce que c'est ");
    }
});
