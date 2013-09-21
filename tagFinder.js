var tumblr = require('tumblr.js');
var client = tumblr.createClient({
	consumer_key: 'mQ5SRRL7mbMZwBAfNxUZX9VNIrUgzeuVoCK080860XQVMM6Vah',
	consumer_secret: 'kRNPtQzpTr9cnmt61Dl48PMr1JQ3zEJ1DEVBAgbGq3bEfO2TgO',
	token: 'UoxLyRg9VUJi9UJOtR6K67YFV3osYclqQyhsgVbrDiYGxLZQHX',
	token_secret: 'yxoWX6sQVWyZiChKXrCp7nCL5bwIOPyUYqQYAfz1U1zCL0lz2h'
});

module.exports = {
	tagSearch: function(tag) {
		client.tagged(tag, function(err,data) {
			return data;
		});
	},
	userSearch: function(blogname) {
		client.posts(blogname, function(err,data) {
			console.log(data);
		})
	}
}