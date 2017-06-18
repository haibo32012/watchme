import { Index, MinimongoEngine } from 'meteor/easy:search';
import files from '/lib/collections/collection.js';

FilesIndex = new Index({
	collection: files,
	fields: ['name'],
	engine: new MinimongoEngine(),
	ignoreCollectionCheck: true,
});