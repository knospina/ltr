lotart.service('PageTitle', function() {
    var title = 'Lotart.lv';
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
});

lotart.service('MetaInformation', function() {
    var metaDescription = '';
    var metaKeywords = '';
    return {
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        reset: function() {
            metaDescription = '';
            metaKeywords = '';
        },
        setMetaDescription: function(newMetaDescription) {
            metaDescription = newMetaDescription;
        },
        appendMetaKeywords: function(newKeywords) {
            for (var key in newKeywords) {
                if (metaKeywords === '') {
                    metaKeywords += newKeywords[key].name;
                } else {
                    metaKeywords += ', ' + newKeywords[key].name;
                }
            }
        }
    };
});