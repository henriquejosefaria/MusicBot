module.exports = {
	name: 'playlists',
	description: "This is a command to show all the playlists!",
	execute(message,args,fs){
		const commandFiles = fs.readdirSync('./playlists/').filter(file => file.endsWith('.txt'));
		if(commandFiles.length == 0){
			message.channel.send("No playlists have been created so far!")
		} else{
			message.channel.send("The currentlly existent playlists are:\n\n");
			for(const file of commandFiles){
				message.channel.send(file.substring(0, file.length - 4));
			}
		}
	}
}