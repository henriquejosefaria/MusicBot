module.exports = {
	name: 'play',
	description: "This is a music player command!",
	execute(message,args,servers,played,ytdl,fs){

			var search = require('yt-search')

			var musics = ['https://www.youtube.com/watch?v=9jI-z9QN6g8','https://www.youtube.com/watch?v=lEakbKn-lVk','https://www.youtube.com/watch?v=lcg6wekmCRA'];

			//private function to play a music
			function play(connection, message){

				var server = servers[message.guild.id];
				var server2 = played[message.guild.id];

				server.dispatcher = connection.play(ytdl(server.queue[0], { filter: format => format.container === 'mp4' }));

				// Saving music on permanent history
				fs.appendFile('./history/played-musics.txt', server.queue[0].slice(0) + "\n" , (err) => {
     				if(err) throw err;
  				});

  				// Saving music on recent history
				server2.queue.push(server.queue[0].slice(0));

				//remove a música que acabou de tocar da queue
				server.queue.shift();

				server.dispatcher.on("end",function(){
					if(server.queue[0]){
						play(connection, message);
					} else{
						connection.disconnect();
					}
				});
			}

			if(!message.member.voice.channel){
				message.channel.send("You must be in a voice channel before i can play the music!");
				return;
			}

			var server = servers[message.guild.id];

			if(!args[1]){ // previously selected musics
				for(music in musics){
					server.queue.push(musics[music]);
				}
				if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
					play(connection, message);
				})
			} else if(args[1].match('http[s]*://')){ //a given youtube music
				if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
					var server = servers[message.guild.id];
					fs.appendFile('./history/played-musics.txt', args[1] + "\n" , (err) => {
     					if(err) throw err;
  					});
					server.dispatcher = connection.play(ytdl(args[1], {filter: "audioonly"}));
				})
			} else { // search for a music
				args2 = []
				for(i=1;i < args.length-1;i++) args2.push(args[i])
				
				search(args2.join(' '), function(err, res) {
					// Error Handlling
					if (err) return message.channel.send('Sorry, something went wrong!!!')

					//Vamos ficar com os 10 primeiros resultados
					let videos = res.videos.slice(0,10);

					// Criação de uma string de output
					let resp = '';
					for (var i in videos){
						resp += `**[${parseInt(i)+1}]:**\`${videos[i].title}\`\n`;
					}

					// Adicionar texto informativo
					resp += `\n**Choose a number between\`1-${videos.length}\``;

					// Send output
					message.channel.send(resp);

					//Then, we can create a message collector
					const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
					// This is a filter, it will only accept text that is a number between the set range earlier defined
					const collector = message.channel.createMessageCollector(filter);

					//Update collector Variable
					collector.once('collect', function(m){
						//message.channel.send(parseInt(m.content)-1);
						server.queue.push(videos[parseInt(m.content)-1].url);
						m.member.voice.channel.join().then(function(connection){
							play(connection, message);
						})
					})
				});
			}
	}
}