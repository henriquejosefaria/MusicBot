module.exports = {
	name: 'help',
	description: "This is a help command!",
	execute(message,args,fs){

		const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

		for(const file of commandFiles){
			const command = require(`./${file}`);
			message.channel.send('!' + file.substring(0, file.length - 3) + '(' + command.description + ')');
		}
	}
}