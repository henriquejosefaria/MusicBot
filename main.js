const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

const ytdl = require("ytdl-core");

var loop_var = 0;

const token = 'NzY4ODU3NDQ5MTY3NDU0MjE5.X5GkTA.9TyFcycfxsvaf3sOyG87ajrmpd0';

var servers = {};
var played = {};

var playlist = '';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command); 
}


client.once('ready', () => {
	console.log('LastLagosta\'s music bot is online!!');
});

client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	let args = message.content.substring(prefix.length).split(" ");
	//const command = args.shift().toLowerCase();

	if(!servers[message.guild.id]) servers[message.guild.id] = {
		queue: []
	}
	if(!played[message.guild.id]) played[message.guild.id] = {
		queue: []
	}

	fs.appendFile('./history/commandsUsed.txt', message.content + "\n" , (err) => {
     			if(err) throw err;
  	});

	switch (args[0]){
		case 'ping':
			client.commands.get('ping').execute(message,args);
		break;

		case 'youtube':
			client.commands.get('youtube').execute(message,args);
		break;

		case 'play':
			client.commands.get('play').execute(message,args,servers,played,ytdl,fs);
		break;

		case 'skip':
			client.commands.get('skip').execute(message,args,servers,played,ytdl,fs,client);
		break;

		case 'stop':
			client.commands.get('stop').execute(message,args,servers,ytdl);
		break;

		case 'help':
			client.commands.get('help').execute(message,args,fs);
		break;

		case 'h':
			client.commands.get('h').execute(message,args,played);
		break;

		case 'h-music':
			client.commands.get('h-music').execute(message,args,fs);
		break;

		case 'h-commands':
			client.commands.get('h-commands').execute(message,args,fs);
		break;

		case 'h-cmds':
			client.commands.get('h-commands').execute(message,args,fs);
		break;

		case 'create-playlist':
			client.commands.get('create-playlist').execute(message,args,fs);
		break;

		case 'add_to':
			client.commands.get('add to').execute(message,args,fs,ytdl);
		break;

		case 'use':
			playlist = client.commands.get('use').execute(message,args,fs,playlist);
		break;

		case 'add':
			client.commands.get('add').execute(message,args,fs,playlist,ytdl);
		break;

		case 'playlists':
			client.commands.get('playlists').execute(message,args,fs,playlist);
		break;
		case 'rm':
			playlist = args[1]; 
			client.commands.get('rm').execute(message,args,fs,playlist);
			playlist = '';
		break;
		case 'start':
			client.commands.get('start').execute(message,args,fs,servers,played,ytdl);
		break;
		case 'loop':
			client.commands.get('loop').execute(message,args,fs,servers,played,ytdl);
		break;

	}

});


client.login(token);
