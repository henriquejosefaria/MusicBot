module.exports = {
	name: 'create-playlist',
	description: "This is a playlist create command!",
	execute(message,args,fs){
		
		if (!fs.existsSync('./playlists/'+message.member.user.id)){

		    fs.mkdir('./playlists/' + message.member.user.id, function (err) {
		        if (err) console.error(err)
		        else console.log('Done!')
    		});
		}
		if(fs.existsSync('./playlists/' + message.member.user.id + "/" + args[1] + ".txt")){
			message.channel.send('Sorry but that playlist alredy exists!');
			return;
		} else{
			fs.writeFile('./playlists/' + message.member.user.id + "/" + args[1] + ".txt", '', function (err) {
			  	if (err) throw err;
			  	console.log('Saved!');
			  	message.channel.send("** Playlist created **");
			});
		}
	}
}