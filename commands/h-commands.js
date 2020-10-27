module.exports = {
	name: 'h-commands',
	description: "This is a commands history command! Goes back to version 1.0 of the Merlinian century!",
	execute(message,args,fs){

		fs.readFile('./history/commandsUsed.txt', 'utf8', function(err, contents) {
    		// Printing permanent History
    		var res = "My life long commands History:\n\n";
    		if(contents) res += contents;
    		else res += "** Got you! There was no internet back there! **";
    		message.channel.send(res);
		});

	}
}