module.exports = {
	name: 'start',
	description: "This is a command to start playing a playlist!",
	execute(message,args,fs,servers,played,ytdl){

		//private function to play a music
		function play(connection, message){

			var server = servers[message.guild.id];
			var server2 = played[message.guild.id];


			server.dispatcher = connection.play(server.queue[0]);

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
			server.dispatcher.on("finish",function(){
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

		if(fs.existsSync('./playlists/' + message.member.user.id +'/' + args[1] + ".txt")){

			var server = servers[message.guild.id];

			message.channel.send("Fetching all the playlist....").then(m =>{

				fs.readFile('./playlists/' + message.member.user.id + "/" + args[1] + '.txt', 'utf8', function(err, contents) {
    				// Loading all the contents and storing them for playing
    				var musics = contents.split("\n");
    				musics.pop();

    				// caso se queira começar numa música a meio da playlist
    				var idx = 0
    				if (args[2] && Number.isInteger(args[2])){
    					idx = args[2];
    				}

    				for(;idx < musics.length;idx++){
						server.queue.push(musics[idx].slice(0));
						console.log(musics[idx]);
						// Saving music on permanent history
						fs.appendFile('./history/played-musics.txt', musics[idx].slice(0) + "\n" , (err) => {
			 				if(err) throw err;
						});

					}
    			});
    			m.edit("All musics have been collected!");
    		})
		} else{
			message.channel.send("Sorry but that playlist doesn't exists!");
			return;
		}
		
		if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
			play(connection, message);
		})
	}
}