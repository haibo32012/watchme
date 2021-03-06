import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';
var ffmpeg = require('fluent-ffmpeg');
var ffmpegPath = '/home/haibo/bin/ffmpeg';
var filesize = require("filesize");
var fs = require('fs');
var path = require('path');


let defaultSchema = {
  size: {
    type: Number
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  path: {
    type: String
  },
  isVideo: {
    type: Boolean
  },
  isAudio: {
    type: Boolean
  },
  isImage: {
    type: Boolean
  },
  isText: {
    type: Boolean
  },
  isJSON: {
    type: Boolean
  },
  isPDF: {
    type: Boolean
  },
  extension: {
    type: String,
    optional: true
  },
  _storagePath: {
    type: String
  },
  _downloadRoute: {
    type: String
  },
  _collectionName: {
    type: String
  },
  public: {
    type: Boolean,
    optional: true
  },
  meta: {
    type: Object,
    blackbox: true,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  versions: {
    type: Object,
    blackbox: true
  }
};

var meta = {
  userPicture:{
  }
};


const files = new FilesCollection({
  debug: true,
  // throttle: false,
  // chunkSize: 1024*1024,
  storagePath: '/home/haibo/watchmeVideo',
  permissions: 0777,
  parentDirPermissions: 0777,
  collectionName: 'files',
  allowClientCode: true,
  protected(fileObj) {
    if (fileObj) {
      if (!(fileObj.meta && fileObj.meta.secured)) {
        return true;
      } else if ((fileObj.meta && fileObj.meta.secured === true)) {
        return true;
      }
    }
    return false;
  },
  onBeforeRemove(cursor) {
    const res = cursor.map((file) => {
      if (file) {
        return ;
      }
      return false;
    });
    return !~res.indexOf(false);
  },
  onBeforeUpload() {
    if (this.file.size <= 1024 * 1024 * 128) {
      switch(this.file.extension){
        case 'mp4':
          return true;
        case 'ogg':
          return true;
        case 'webm':
          return true;
        default:
          return "Your File Type ."+ (this.file.extension) + " Not Accept Now, Sorry!";
      }
    } else {
        return "Your File Size Is " + (filesize(this.file.size)) + "Excess 128M, Please Choose Another File";
    }
  },
  onAfterUpload(fileObj) {
    var command = ffmpeg(fileObj.path);
    console.log(fileObj.path);
    command.setFfmpegPath(ffmpegPath);
    command
      .on('filename', function(filenames) {
          console.log('Will generate ' + filename.join(', '));
      })
      .on('end', Meteor.bindEnvironment(function() {
          console.log('screenshots finished');

          /** store base64 to the database
          
          var pngname = fileObj._id + ".png";
          console.log(pngname);
          var src = path.join('/home/haibo/github/watchme/public', pngname);
          console.log(src);

          var bitmap = fs.readFileSync(src);
          var data = new Buffer(bitmap).toString('base64');
          console.log(data);
          files.update(fileObj._id,
            {$set: {
              'meta.poster': data
            }}
          );**/
          //var bitmap = fs.readFile(src, 'base64', function(err, data) {
          //  console.log(data);
          //  files.update(fileObj._id, 
           //   {$set: {
           //     'meta.poster': data
          //    }}
          //  );
         // });
       }))
      .on('error', function(err) {
          console.log('an error happened: ' + err.message);
      })
      .screenshots({
          timestamps: ['00:00:01:00'],
          filename: '%b.png',
          folder: '/home/haibo/github/watchme/public',
          size: '300x150'
      });
      //console.log(fileObj._id + ".png");
      //var pngname = fileObj._id + ".png";
      //console.log(pngname);
     // var src = path.join('/home/haibo/github/watchme/public', pngname);
     // console.log(src);
     // var bitmap = fs.readFile(src, 'base64', function(err, data) {
     //   console.log(data);
      //});
      //var base64 = new Buffer(bitmap).toString('base64');
      //console.log(base64);
  },

  downloadCallback(fileObj) {
    if (this.params && this.params.query && this.params.query.download === 'true') {
      Collections.files.collection.update(fileObj._id, {
        $inc: {
          'meta.downloads': 1
        }
      });
    }
    return true;
  },
  interceptDownload(http, fileRef, version) {
 
    return false;
  }
});

export default files;



if (Meteor.isClient) {
  Meteor.subscribe('files.all');
  Meteor.subscribe('files');
}

if (Meteor.isServer) {
  

  Meteor.publish('files.all', function(limit) {
    return files.find({}, {limit: limit}).cursor;
  });

  Meteor.publish('files', function() {
    return files.find().cursor;
  })
}