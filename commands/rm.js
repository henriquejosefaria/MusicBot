module.exports = {
	name: 'rm',
	description: "This is a command to remove playlist!",
	execute(message,args,fs,playlist){

		if(!fs.existsSync('./playlists/' + playlist + ".txt")){
			message.channel.send('Sorry but that playlist doesn\'t exists!');
			return;
		} else if(playlist == '') {
			message.channel.send('Sorry but there is no playlist selected! Use the !use command and select a playlist!');
		} else{
			fs.unlinkSync('./playlists/' + playlist + ".txt");	
			message.channel.send("Playlist " +  playlist + " deleted successfully!");		
		}
	}
}