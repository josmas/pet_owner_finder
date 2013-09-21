// distance.js
// Finds the closest user match with n dimensions of compatability

// Expects a tag:count map from the user and a tag:count map from a blog
module.exports = {
	match: function(userTags, blogTags) {
		var counts = [];
		for tag in userTags {
			if tag in blogTags {
				counts.push[[userTags[tag], blogTags[tag]]];
			} else {
				counts.push[[userTags[tag], 0]];
			}
		}
		var sum = 0;
		for pair in counts {
			sum += Math.pow((pair[0] - pair[1]), 2);		
		}
		return Math.sqrt(sum);
	}
}