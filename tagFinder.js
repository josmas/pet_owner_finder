var tumblr = require('tumblr.js');
var distance = require('./distance.js');
var client = tumblr.createClient({
	consumer_key: 'mQ5SRRL7mbMZwBAfNxUZX9VNIrUgzeuVoCK080860XQVMM6Vah',
	consumer_secret: 'kRNPtQzpTr9cnmt61Dl48PMr1JQ3zEJ1DEVBAgbGq3bEfO2TgO',
	token: 'UoxLyRg9VUJi9UJOtR6K67YFV3osYclqQyhsgVbrDiYGxLZQHX',
	token_secret: 'yxoWX6sQVWyZiChKXrCp7nCL5bwIOPyUYqQYAfz1U1zCL0lz2h'
});

var MatchObject = function() {
	this._matches = [];
	this._matchCount = -1;
	this._matchesProcessed = 0;
}

var tagMap = function(postList, b, tag, userBlog) {
	var matchMap = {'tagCount': {}};
	postList.forEach(function(post) {
		if (post.type == "photo" && post.tags.indexOf(tag) != -1) {
			matchMap['photo'] = post.photos[0]['alt_sizes'][0]['url'];
			matchMap['user'] = post.blog_name;
		}
		post.tags.forEach(function(tag) {
			if (Object.keys(matchMap['tagCount']).indexOf(tag) == -1) {
				matchMap['tagCount'][tag] = 1;
			} else {
				matchMap['tagCount'][tag]++;
			}
		})
	});
	if (b) {
		return matchMap['tagCount'];
	} else {
		var that = this;
		client.posts(userBlog, function(err, data) {
			userTagMap = tagMap(data.posts, true);
			matchMap['distance'] = (distance.match(userTagMap, matchMap['tagCount']));
			if (Object.keys(matchMap).indexOf('user') != -1) {
				that._matches.push(matchMap);
			}
			that._matchesProcessed++;
		});
	}
}

var userSearch = function(blogname, b, tag, userBlog) {
	var that = this;
	client.posts(blogname, function(err, data) {
		that.tagMap(data.posts, b, tag, userBlog);
	});
}

var tagSearch = function(tag, userBlog) {
	var that = this;
	client.tagged(tag, function(err, posts) {
		that._matchCount = posts.length;
		posts.forEach(function(post) {
			that.userSearch(post.blog_name, false, tag, userBlog);
		});
	});
}

var getMatches = function(userBlog, tag) {
	this.tagSearch(tag, userBlog);
	while (this._matchCount == -1 || this._matchCount != this._matchesProcessed) {
		setTimeout(function(){}, 100);
	}
	this._matches = distance.normalize(this._matches);
	return this._matches;
}

MatchObject.prototype.tagMap = tagMap;
MatchObject.prototype.userSearch = userSearch;
MatchObject.prototype.tagSearch = tagSearch;
MatchObject.prototype.getMatches = getMatches;

module.exports = MatchObject;