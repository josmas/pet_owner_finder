var async = require ('async')
var tumblr = require('tumblr.js');
var distance = require('./distance.js');
var client = tumblr.createClient({
	consumer_key: 'mQ5SRRL7mbMZwBAfNxUZX9VNIrUgzeuVoCK080860XQVMM6Vah',
	consumer_secret: 'kRNPtQzpTr9cnmt61Dl48PMr1JQ3zEJ1DEVBAgbGq3bEfO2TgO',
	token: 'UoxLyRg9VUJi9UJOtR6K67YFV3osYclqQyhsgVbrDiYGxLZQHX',
	token_secret: 'yxoWX6sQVWyZiChKXrCp7nCL5bwIOPyUYqQYAfz1U1zCL0lz2h'
});

var getBlogs = function(pet, userBlog) {
	client.tagged(pet, function(err, posts) {
		blogs = [];
		var userObj = {};
		userObj["blogTitle"] = userBlog;
		userObj["imgUrl"] = '';
		userObj["tagMap"] = {};
		userObj["distance"] = -1;
		userObj["pet"] = pet;
		userObj["user"] = true;
		blogs.push(userObj);
		posts.forEach(function(post) {
			var blogObj = {};
			blogObj["blogTitle"] = post.blog_name;
			blogObj["imgUrl"] = '';
			blogObj["tagMap"] = {};
			blogObj["distance"] = -1;
			blogObj["pet"] = pet;
			blogs.push(blogObj);
		});
		async.map(blogs, getTags, function(err, results) {
			var userTags = {};
			results.forEach(function(obj) {
				if ("user" in obj) userTags = obj["tagMap"];
			});
			console.log(getDistances(userTags, results));
		});
	});
}

var getTags = function (blogObj, doneCallback) {
	client.posts(blogObj.blogTitle, function(err, data) {
		data.posts.forEach(function(post) {
			if (post.type == "photo" && post.tags.indexOf(blogObj.pet) != -1) {
				blogObj["imgUrl"] = post.photos[0]['alt_sizes'][0]['url'];
			}
			post.tags.forEach(function(tag) {
				if (Object.keys(blogObj["tagMap"]).indexOf(tag) == -1) {
					blogObj["tagMap"][tag] = 1;
				} else {
					blogObj["tagMap"][tag]++;
				}
			});
		});
		return doneCallback(null, blogObj);
	});
}

var getDistances = function (userTags, blogs) {
	blogs.forEach(function(obj) {
		obj["distance"] = (distance.match(userTags, obj["tagMap"]));
	});
	return distance.normalize(blogs);
}

exports.getBlogs = getBlogs;
exports.getTags = getTags;
exports.getDistances = getDistances;










