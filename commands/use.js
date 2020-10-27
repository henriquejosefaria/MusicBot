module.exports = {
	name: 'use',
	description: "This is a command to define the playlist to witch the musics will be added!",
	execute(message,args,fs,playlist){

		if(!fs.existsSync('./playlists/' + message.member.user.id + '/' + args[1] + ".txt")){
			message.channel.send('Sorry but that playlist doesn\'t exists!');
			return;
		} else if(args[1] == '') {
			message.channel.send('Sorry but you didn\'t select a playlist!');
		} else{
			playlist = args[1].slice(0);
			message.channel.send("playlist " + playlist + " Selected! Use the command !add to add as many playlists as u want!");
			return playlist;
		}
	}
}