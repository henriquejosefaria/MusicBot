module.exports = {
	name: 'ping',
	description: "This is a ping command!",
	execute(message,args){

		message.channel.send('Pinging...').then(m => {

			// The math thing to calculate the user's ping
			var ping = m.createdTimestamp - message.createdTimestamp;

       		// Then It Edits the message with the ping variable embed that you created
	    	m.edit("...Pong! Your ping is " + ping + "!");
		});

	}
}