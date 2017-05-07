import { FilesCollection } from 'meteor/ostrio:files';
var ffmpeg = require('fluent-ffmpeg');
var ffmpegPath = '/home/haibo/bin/ffmpeg';


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


files = new FilesCollection({
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
      return true;
    } else {
      alert("Max file size is 128MB you've tried to upload a file larger, please check your file size again!");
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
      .on('end', function() {
          console.log('screenshots finished');
       })
      .on('error', function(err) {
          console.log('an error happened: ' + err.message);
      })
      .screenshots({
          timestamps: ['00:00:01:00'],
          filename: '%b.png',
          folder: '/home/haibo/github/watchme/public',
          size: '300x150'
      });
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





if (Meteor.isClient) {
  Meteor.subscribe('files.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('files.all', function(limit) {
    return files.find({}, {limit: limit}).cursor;
  });
}