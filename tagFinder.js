var tumblr = require('tumblr.js');
var client = tumblr.createClient({
	consumer_key: 'mQ5SRRL7mbMZwBAfNxUZX9VNIrUgzeuVoCK080860XQVMM6Vah',
	consumer_secret: 'kRNPtQzpTr9cnmt61Dl48PMr1JQ3zEJ1DEVBAgbGq3bEfO2TgO',
	token: 'UoxLyRg9VUJi9UJOtR6K67YFV3osYclqQyhsgVbrDiYGxLZQHX',
	token_secret: 'yxoWX6sQVWyZiChKXrCp7nCL5bwIOPyUYqQYAfz1U1zCL0lz2h'
});

var tagMap = function(postList) {
	var tagMap = {};
	postList.forEach(function(post) {
		post.tags.forEach(function(tag) {
			if (Object.keys(tagMap).indexOf(tag) == -1) {
				tagMap[tag] = 1;
			} else {
				tagMap[tag] += 1;
			}
		})
	});
	console.log(tagMap);
}

var userSearch = function(blogname) {
	client.posts(blogname, function(err, data) {
		tagMap(data.posts);
	});
}

var tagSearch = function(tag) {
	client.tagged(tag, function(err, posts) {
		posts.forEach(function(post) {
			userSearch(post.blog_name);
		});
	});
}

module.exports = {
	tagMap: tagMap,
	userSearch: userSearch,
	tagSearch: tagSearch
}