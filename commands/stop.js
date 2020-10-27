module.exports = {
	name: 'stop',
	description: "This is a music player stop command!",
	execute(message,args,servers,ytdl){

		function play(connection, message){

			var server = servers[message.guild.id];

			server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

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

		var server = servers[message.guild.id];
		for(var i = server.queue.length - 1; i >= 0; i--){
			server.queue.splice(i, 1);
		}
		if(server.dispatcher){
			if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
				connection.disconnect();
			})
		}
		message.channel.send("Stopping the queue and leaving the voice channel!");
		console.log('stopped the queue!');

	}
}