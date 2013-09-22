var async = require ('async');
var tumblr = require('tumblr.js');
var distance = require('./distance.js');
var client = tumblr.createClient({
    consumer_key: 'mQ5SRRL7mbMZwBAfNxUZX9VNIrUgzeuVoCK080860XQVMM6Vah',
    consumer_secret: 'kRNPtQzpTr9cnmt61Dl48PMr1JQ3zEJ1DEVBAgbGq3bEfO2TgO',
    token: 'UoxLyRg9VUJi9UJOtR6K67YFV3osYclqQyhsgVbrDiYGxLZQHX',
    token_secret: 'yxoWX6sQVWyZiChKXrCp7nCL5bwIOPyUYqQYAfz1U1zCL0lz2h'
});

var getBlogs = function(pet, userBlog, renderCallback) {
    client.tagged(pet, function(err, posts) {
        blogs = [];
        var userObj = {};
        userObj["blogTitle"] = userBlog;
        userObj["imgUrl"] = '';
        userObj["tagMap"] = {};
        userObj["distance"] = -1;
        userObj["pet"] = pet;
        userObj["user"] = true; // set unique user object
        blogs.push(userObj);
        posts.forEach(function(post) {
            var blogObj = {};
            blogObj["blogTitle"] = post.blog_name;
            blogObj["imgUrl"] = '';
            blogObj["tagMap"] = {};
            blogObj["distance"] = -1;
            blogObj["pet"] = pet;
            blogObj["hide"] = false;
            blogs.push(blogObj);
        });
        // Populate empty object fields
        async.map(blogs, getTags, function(err, results) {
            var userTags = {};
            var usernames = {};
            // Grab user tags
            results.forEach(function(obj) {
                if ("user" in obj) userTags = obj["tagMap"];
                if (obj[imgUrl] === '')  blogObj["hide"] = true;
                if (obj["blogTitle"] in usernames) {
                    blogObj["hide"] = true;
                } else {
                    usernames[obj["blogTitle"]] = true;
                }
            });
            var uniqueBlogs = [];
            results.forEach(function(blog) {
                if (blog["hide"] == false) uniqueBlogs.push(blog);
            });
            // Populate distances and render
            renderCallback(getDistances(userTags, uniqueBlogs));
        });
    });
}

var getTags = function (blogObj, doneCallback) {
    client.posts(blogObj.blogTitle, function(err, data) {
        data.posts.forEach(function(post) {
            if (post.type == "photo" && post.tags.indexOf(blogObj.pet) != -1) {
                // Link to full-size image if tag includes pet
                blogObj["imgUrl"] = post.photos[0]['alt_sizes'][0]['url'];
            }
            // Create tag maps for each object
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
    // Calculate Euclidian distance of blogs from user
    blogs.forEach(function(obj) {
        obj["distance"] = (distance.match(userTags, obj["tagMap"]));
    });
    // Return ordered results [is this properly asynchronous?]
    return distance.normalize(blogs);
}

exports.getBlogs = getBlogs;
exports.getTags = getTags;
exports.getDistances = getDistances;
