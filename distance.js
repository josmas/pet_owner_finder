// distance.js
// Finds the closest user match with n dimensions of compatability

// Expects a tag:count map from the user and a tag:count map from a blog
module.exports = {
	match: function(userTags, blogTags) {
		var counts = [];
		for (var tag in userTags) {
			if (tag in blogTags) {
				counts.push([userTags[tag], blogTags[tag]]);
			} else {
				counts.push([userTags[tag], 0]);
			}
		}

		var sum = 0;
		for (var i = counts.length - 1; i >= 0; i--) {
		 	sum += Math.pow((counts[i][0] - counts[i][1]), 2);
		}
		return Math.sqrt(sum);
	},
	normalize: function(distances) {
		var values = [];
		for (var match in distances) {
			values.push(match.distance);
		}
  		var min = values.slice(0).sort()[0];
  		var max = values.slice(0).sort().reverse()[0];
		for (var i = distances.length - 1; i >= 0; i--) {
			distances[i].distance = (distances[i].distance - min)/(max-min);
		}
		return distances;
	}
}