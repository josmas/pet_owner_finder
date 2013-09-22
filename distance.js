// distance.js
// Finds the closest user match with n dimensions of compatability

// Expects a tag:count map from the user and a tag:count map from a blog
module.exports = {
    match: function(userTags, blogTags) {
        var counts = [];
        for (var tag in userTags) {
            if (tag in blogTags) {
                counts.push([userTags[tag], blogTags[tag]]);
            } else { // user tag not present in matched blog
                counts.push([userTags[tag], 0]);
            }
        };
        // Calculate Euclidian distance between tag counts
        var sum = 0;
        for (var i = counts.length - 1; i >= 0; i--) {
            sum += Math.pow((counts[i][0] - counts[i][1]), 2);
        };
        return Math.sqrt(sum);
    },
    // Order results - closest result gets highest score
    normalize: function(distances) {
        distances.sort(function(a,b) {
            return a.distance - b.distance;
        });
        distances.sort();
        for (var i = distances.length - 1; i >= 0; i--) {
            distances[i].distance = i;
        };
        return distances;
    }
}