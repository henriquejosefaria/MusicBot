module.exports = {
	name: 'add to',
	description: "This is a command to define the playlist to witch the musics will be added and the music being added!",
	execute(message,args,fs,ytdl){

		if(args[1] == '' || args[2] == '') {
			message.channel.send('Sorry but there is no playlist/music selected!');
		} else{
			var exec = require('child_process').exec, child;

			const songInfo = ytdl.getInfo(args[2]);

			exec("ytdl \"" + args[2]  + "\" > ./musics/" + songInfo.title + ".mp4 ",
		    	function (error, stdout, stderr) {
		        console.log('stdout: ' + stdout);
		        console.log('stderr: ' + stderr);
		        if (error !== null) {
		             console.log('exec error: ' + error);
		        }
    		});

			playlist = args[1];
			fs.appendFile("./playlists/" + message.member.user.id + '/' + playlist + ".txt", './musics/'+ songInfo.title +'.mp4\n', function (err) {			  	if (err) throw err;
			  	console.log('Saved!');
			  	message.channel.send("** Music added to "+ args[1] + " **");
			});
		}
	}
}