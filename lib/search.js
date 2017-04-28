import { Index, MinimongoEngine } from 'meteor/easy:search';

FilesIndex = new Index({
	collection: files,
	fields: ['name'],
	engine: new MinimongoEngine(),
	ignoreCollectionCheck: true,
});