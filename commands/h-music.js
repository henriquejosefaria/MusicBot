module.exports = {
	name: 'h-music',
	description: "This is a full music history command! Goes back to anciente times!",
	execute(message,args,fs){

		fs.readFile('./history/played-musics.txt', 'utf8', function(err, contents) {
    		// Printing permanent History
    		var res = "My life long History:\n\n";
    		if(contents) res += contents;
    		else res += "Sorry i\'m not that old! Play a music or something :)";
    		message.channel.send(res);
		});
	}
}