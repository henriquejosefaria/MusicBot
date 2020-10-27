module.exports = {
	name: 'add',
	description: "This is a command to add a music to a predefined playlist!",
	execute(message,args,fs,playlist,ytdl){

		function doIt( message, sSuffix) {
			const { exec } = require("child_process");
		    return Promise
		    .all([
		        promiseTitle(sSuffix)
		    ])
		    .then(function(results) {
		        let stream = ytdl(sSuffix, {filter : 'audioonly',});
		        let aData = [];

		        stream.on('data', function(data) {
		          aData.push(data);
		        });

		        stream.on('end', function() {
		            let buffer = Buffer.concat(aData);
		            let title = results[0].replace(/[^a-zA-Z0-9-]/g,'');
		            console.log(title);
		            exec("ytdl \"" + sSuffix  + "\" > ./musics/" + title + ".mp4 ",
				    	function (error, stdout, stderr) {
				        if (error !== null) {
				             console.log('exec error: ' + error);
				        }
	    			});
		            fs.appendFile("./playlists/" + message.member.user.id + '/' + playlist + ".txt", './musics/'+ title +'.mp4\n', function (err) {
					  	if (err) throw err;
					  	console.log('Saved!');
					  	message.channel.send("** Music added to "+ playlist + " **");
					});
		        });
		    })
		    .catch(error => console.error(error));
		}

		function promiseTitle(sSuffix) {
		    return new Promise(function (resolve, reject) {
		        ytdl.getInfo(sSuffix, function(err, info) {
		            if (err) reject(err);
		            console.log(info);
		            resolve(info.videoDetails.title);
		        });
		    });
		}

		async function getInfo(url){
			var info = await ytdl(args[i]).on('info', (info) => {
					return resolve(info.videoDetails.title); // the video title
				});
		}

		if(!fs.existsSync('./playlists/' +message.member.user.id + '/' + playlist + ".txt")){
			message.channel.send('Sorry but that playlist doesn\'t exists!');
			return;
		} else if(playlist == '') {
			message.channel.send('Sorry but there is no playlist selected! Use the !use command and select a playlist!');
		} else{


			for(var i = 1; i<= args.length-1;i++){
				doIt( message, args[i]);
				/*var info = getInfo(args[1]);

				exec("ytdl \"" + args[i]  + "\" > ./musics/" + info + ".mp4 ",
			    	function (error, stdout, stderr) {
			        if (error !== null) {
			             console.log('exec error: ' + error);
			        }
	    		});
				fs.appendFile("./playlists/" + message.member.user.id + '/' + playlist + ".txt", './musics/'+ info +'.mp4\n', function (err) {
			  	if (err) throw err;
			  	console.log('Saved!');
			  	message.channel.send("** Music added to "+ playlist + " **");
			});*/

			}
			
		}
	}
}