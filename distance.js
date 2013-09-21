// distance.js
// Finds the closest user match with n dimensions of compatability

// Expects a tag:count map from the user and a tag:count map from a blog
module.exports = {
	match: function(userTags, blogTags) {
		var counts = [];
		for (var tag in userTags) {
			if (tag in blogTags) {
				counts.push[[userTags[tag], blogTags[tag]]];
			} else {
				counts.push[[userTags[tag], 0]];
			}
		}
		var sum = 0;
		for (var i = counts.length - 1; i >= 0; i--) {
		 	sum += counts[i][0] + counts[i][1];
		};
	}
}