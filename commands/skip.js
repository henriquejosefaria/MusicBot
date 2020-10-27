module.exports = {
	name: 'skip',
	description: "This is a music player skip command!",
	execute(message,args,servers,played,ytdl,fs,client){
		var server = servers[message.guild.id];
		server.dispatcher.end();
		return;
		/*
		//private function to play a music
		function play(connection, message){

			var server = servers[message.guild.id];
			var server2 = played[message.guild.id];

			if(!server.queue[0]){
				connection.disconnect();
				return;
			}

			server.dispatcher = connection.play(server.queue[0]);

			// Saving music on permanent history
			fs.appendFile('./history/played-musics.txt', server.queue[0].slice(0) + "\n" , (err) => {
 				if(err) throw err;
				});

			// Saving music on recent history
			server2.queue.push(server.queue[0].slice(0));

			//remove a música que acabou de tocar da queue
			server.queue.shift();

			server.dispatcher.on("end",function(){
					play(connection, message);
			});
		}

		var server = servers[message.guild.id];

		if (loop_var){
			server.dispatcher.end();
			return;
		}

		if(server.dispatcher){
			if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){

				play(connection, message);
			})
		}
		message.channel.send("Skipping the song!");
	*/
	}
}