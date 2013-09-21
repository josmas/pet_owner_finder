var tumblr = require('tumblr.js');
var distance = require('./distance.js');
var client = tumblr.createClient({
	consumer_key: 'mQ5SRRL7mbMZwBAfNxUZX9VNIrUgzeuVoCK080860XQVMM6Vah',
	consumer_secret: 'kRNPtQzpTr9cnmt61Dl48PMr1JQ3zEJ1DEVBAgbGq3bEfO2TgO',
	token: 'UoxLyRg9VUJi9UJOtR6K67YFV3osYclqQyhsgVbrDiYGxLZQHX',
	token_secret: 'yxoWX6sQVWyZiChKXrCp7nCL5bwIOPyUYqQYAfz1U1zCL0lz2h'
});

var matchObject = function() {
	_matches = []
	_matchCount = 0;
}

matchObject.prototype.tagMap = function(postList, b) {
	var matchMap = {'tagCount': {}};
	postList.forEach(function(post) {
		if (post.type == "photo") {
			matchMap['photo'] = post.photos[0]['alt_sizes'][0]['url'];
			matchMap['user'] = post.blog_name;
		}
		post.tags.forEach(function(tag) {
			if (Object.keys(matchMap['tagCount']).indexOf(tag) == -1) {
				matchMap['tagCount'][tag] = 1;
			} else {
				matchMap['tagCount'][tag] += 1;
			}
		})
	});
	if (b) {
		return matchMap['tagCount'];
	} else {
		client.posts('hedgehogsofasgard', function(err, data) {
			userTagMap = tagMap(data.posts, true);
			console.log(distance.match(userTagMap, matchMap['tagCount']));
			console.log(matchMap);
			if (Object.keys(matchMap).indexOf('user') != -1) {
				this._matches.push(matchMap);
			}
		});
	}
}

matchObject.prototype.userSearch = function(blogname, b) {
	client.posts(blogname, function(err, data) {
		tagMap(data.posts, b);
	});
}

matchObject.prototype.tagSearch = function(tag) {
	client.tagged(tag, function(err, posts) {
		posts.forEach(function(post) {
			userSearch(post.blog_name, false);
		});
	});
}

module.exports.matchObject = matchObject;