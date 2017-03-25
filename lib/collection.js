import { FilesCollection } from 'meteor/ostrio:files';

files = new FilesCollection({
  // debug: true,
  // throttle: false,
  // chunkSize: 1024*1024,
  storagePath: 'assets/app/uploads/files',
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
    }
    return "Max. file size is 128MB you've tried to upload " + (filesize(this.file.size));
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
    if (useDropBox || useS3) {
      const path = (fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipeFrom) ? fileRef.versions[version].meta.pipeFrom : void 0;
      if (path) {
        // If file is successfully moved to Storage
        // We will pipe request to Storage
        // So, original link will stay always secure

        // To force ?play and ?download parameters
        // and to keep original file name, content-type,
        // content-disposition and cache-control
        // we're using low-level .serve() method
        this.serve(http, fileRef, fileRef.versions[version], version, Request({
          url: path,
          headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
        }));
        return true;
      }
      // While file is not yet uploaded to Storage
      // We will serve file from FS
      return false;
    }
    return false;
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('files.all', function() {
    return files.find().cursor;
  });
}