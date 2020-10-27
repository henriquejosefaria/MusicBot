module.exports = {
	name: 'skip',
	description: "This is a music player skip command!",
	execute(message,args,servers){
		var server = servers[message.guild.id];
		server.dispatcher.end();
		return;
	}
}