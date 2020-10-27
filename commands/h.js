module.exports = {
	name: 'h',
	description: "This is a history command! This history was recorded throughout my most recent summon!",
	execute(message,args,played){

		var server = played[message.guild.id];
		res = "History:\n\n" 
		
		for( music = 0; music < server.queue.length-1; music++){
			res += server.queue[music] + "\n";
		}
		message.channel.send(res);
	}
}