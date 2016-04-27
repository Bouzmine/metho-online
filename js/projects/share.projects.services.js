angular.module('metho.services.projects.share', [])

// Service to share project info from project tab to project detail
.factory('ShareProject', function() {
    var name = "";
    var matter = "";

    return {
        setName: function(settingVal) {
            name = settingVal;
        },
        getName: function() {
            return name;
        },
        setMatter: function(settingVal) {
            matter = settingVal;
        },
        getMatter: function() {
            return matter;
        }
    };
})

// Service to share source info from project detail to source detail
.factory('ShareSource', function() {
    var source = null;

    return {
        setSource: function(settingVal) {
            source = settingVal;
        },
        getSource: function() {
            return source;
        }
    };
})

// Service to share pending items between project_detail and pending view
.factory('SharePendings', function() {
    var pendings = [];
    var sources = [];

    return {
        setPendings: function(settingVal) {
            pendings = settingVal;
        },
        getPendings: function() {
            return pendings;
        },
        setSources: function(settingVal) {
            sources = settingVal;
        },
        getSources: function() {
            return sources;
        }
    };
});
