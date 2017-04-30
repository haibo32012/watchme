var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg('/home/haibo/Iraqi.mp4');

var ffmpegPath = '/home/haibo/bin/ffmpeg';

command.setFfmpegPath(ffmpegPath);

command
	.on('filenames', function(filenames) {
		console.log('Will generate ' + filenames.join(', '));
	})
	.on('end', function() {
		console.log('Finished processing');
	})
	.on('error', function(err) {
		console.log('an error happened: ' + err.message);
	})
	.screenshots({
		timestamps: ['00:00:01'],
		filename: 'poster-%s-seconds.png',
		folder: '/home/haibo',
		//size: '320x240'
	});