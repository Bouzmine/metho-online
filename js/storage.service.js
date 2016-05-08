angular.module("metho.service.storage", [])

.factory("Storage", function (localStorageService, ParseSource, $q, $rootScope) {
    var theresProjects = localStorageService.get("theresProjects");
    var sourceRepo = new PouchDB("sources");
    var projectRepo = new PouchDB("projects");
    var pendingRepo = new PouchDB("pendings");

    var projects = {};

    var sources = {};
    var sourcesByProject = {};
    var loadingSources = true;

    var pendings = {};
    var loadingPendings = true;

    if (theresProjects == true) {
        var loadingProjects = true;
        projectRepo.allDocs({include_docs: true}).then(function (docs) {
            for (var i = 0; i < docs.rows.length; i++) {
                projects[docs.rows[i].doc._id] = docs.rows[i].doc;
                if (sourcesByProject[docs.rows[i].doc._id] == null) {
                    sourcesByProject[docs.rows[i].doc._id] = {};
                }
            }
            loadingProjects = false;
            $rootScope.$broadcast("projectLoadingEnded");
        }).catch(function (err) {
            $rootScope.$broadcast("projectLoadingError", err);
            loadingProjects = false;
        });
    }else {
        var loadingProjects = false;
    }

    sourceRepo.allDocs({include_docs: true}).then(function (docs) {
        for (var i = 0; i < docs.rows.length; i++) {
            sources[docs.rows[i].doc._id] = docs.rows[i].doc;
            if (sourcesByProject[docs.rows[i].doc.project_id] == null) {
                sourcesByProject[docs.rows[i].doc.project_id] = {};
            }
            sourcesByProject[docs.rows[i].doc.project_id][docs.rows[i].doc._id] = docs.rows[i].doc;
        }
        loadingSources = false;
        $rootScope.$broadcast("sourceLoadingEnded");
    }).catch(function (err) {
        $rootScope.$broadcast("sourceLoadingError", err);
        loadingSources = false;
        console.log(err);
    });

    pendingRepo.allDocs({include_docs: true}).then(function (docs) {
        for (var i = 0; i < docs.rows.length; i++) {
            pendings[docs.rows[i].doc._id] = docs.rows[i].doc;
        }
        loadingPendings = false;
        $rootScope.$broadcast("pendingLoadingEnded");
    }).catch(function (err) {
        $rootScope.$broadcast("pendingLoadingError", err);
        loadingPendings = false;
        console.log(err);
    });

    return {
        getProjects: function () {
            var p = $q.defer();
            if (loadingProjects) {
                p.notify("loading");
                $rootScope.$on("projectLoadingEnded", function () {
                    p.resolve(Array.prototype.fromObject(projects));
                });
                $rootScope.$on("projectLoadingError", function (err) {
                    p.reject("error : " + err);
                });
            }else {
                p.resolve(Array.prototype.fromObject(projects));
            }

            return p.promise;
        },
        deleteProject: function (id) {
            var p = $q.defer();

            var doc = projects[id];
            delete projects[id];
            var arr_sourcesToDelete = [];
            for (var i = 0; i < sourcesByProject[id].length; i++) {
                delete sources[sourcesByProject[id][i]._id];
                arr_sourcesToDelete.append(sourcesByProject[id][i]);
            }
            delete sourcesByProject[id];

            // Apply
            // Delete project
            projectRepo.remove(doc).then(function(result) {
                p.resolve(result);
            }).catch(function(err) {
                p.reject(err);
            });

            // Delete sources of project
            for (var i = 0; i < arr_sourcesToDelete.length; i++) {
                sourceRepo.remove(arr_sourcesToDelete[i]);
            }

            if (Array.prototype.fromObject(projects) == 0) {
                localStorageService.set("theresProjects", false);
            }

            return p.promise;
        },
        setProjectFromId: function (id, set) {
            var p = $q.defer();

            projectRepo.put(set, id, projects[id]._rev).then(function(response) {
                set._rev = response.rev;
                projects[id] = set;
                p.resolve(response);
            }).catch(function(err) {
                p.reject(err);
            });

            return p.promise;
        },
        getProjectFromId: function (id) {
            var p = $q.defer();

            if (loadingProjects) {
                $rootScope.$on("projectLoadingEnded", function () {
                    p.resolve(projects[id]);
                });
                $rootScope.$on("projectLoadingError", function (err) {
                    p.reject(err);
                });
            }else {
                p.resolve(projects[id]);
            }

            return p.promise;
        },
        createProject: function (newproject) {
            var p = $q.defer();
            projectRepo.post(newproject).then(function(response) {
                sourcesByProject[response.id] = {};
                newproject._id = response.id;
                newproject._rev = response.rev;
                projects[response.id] = newproject;
                p.resolve(response);
            }).catch(function(err) {
                p.reject(err);
            });

            localStorageService.set("theresProjects", true);

            return p.promise;
        },
        getSourcesFromProjectId: function (id) {
            var p = $q.defer();

            if (loadingSources) {
                p.notify("loading");
                $rootScope.$on("sourceLoadingEnded", function () {
                    p.resolve(Array.prototype.fromObject(sourcesByProject[id]));
                });
                $rootScope.$on("sourceLoadingError", function (err) {
                    p.reject(err);
                });
            }else {
                p.resolve(Array.prototype.fromObject(sourcesByProject[id]));
            }

            return p.promise;
        },
        getSourceFromId: function (id) {
            var p = $q.defer();

            if (loadingSources) {
                p.notify("loading");
                $rootScope.$on("sourceLoadingEnded", function () {
                    p.resolve(sources[id]);
                });
                $rootScope.$on("sourceLoadingError", function (err) {
                    p.reject(err);
                });
            }else {
                p.resolve(sources[id]);
            }

            return p.promise;
        },
        parseSources: function () {
            var p = $q.defer();
            loadingSources = true;
            var errors = [];
            var arr_sources = Array.prototype.fromObject(sources);
            for (var i = 0; i < arr_sources.length; i++) {
                var source = ParseSource.parseSource(arr_sources[i]);
                if (i == arr_sources.length - 1) {
                    sourceRepo.put(source).then(function (response) {
                        source._id = response.id;
                        source._rev = response.rev;
                        sources[source._id] = source;
                        sourcesByProject[source.project_id][source._id] = source;
                        p.resolve({ok:true});
                        $rootScope.$broadcast("sourceLoadingEnded");
                        loadingSources = false;
                    }).catch(function (err) {
                        errors.push(err);
                        p.reject(errors);
                        $rootScope.$broadcast("sourceLoadingEnded");
                        loadingSources = false;
                    });
                }else {
                    sourceRepo.put(source).then(function (response) {
                        source._id = response.id;
                        source._rev = response.rev;
                        sources[source._id] = source;
                        sourcesByProject[source.project_id][source._id] = source;
                    }).catch(function (err) {
                        errors.push(err);
                    });
                }
            }

            return p.promise;
        },
        setSourceFromId: function (id, set) {
            var p = $q.defer();

            if (loadingSources) {
                $rootScope.$on("sourceLoadingEnded", function () {
                    loadingSources = true;
                    sourceRepo.put(set, id, sources[id]._rev).then(function (response) {
                        sources[id] = set;
                        sources[id]._rev = response.rev;
                        sourcesByProject[sources[id].project_id][id] = set;
                        sourcesByProject[sources[id].project_id][id]._rev = response.rev;
                        $rootScope.$broadcast("sourceLoadingEnded");
                        loadingSources = false;
                        p.resolve(response);
                    }).catch(function (err) {
                        p.reject(err);
                        $rootScope.$broadcast("sourceLoadingError");
                        loadingSources = false;
                    });
                });
            }else {
                loadingSources = true;
                sourceRepo.put(set, id, sources[id]._rev).then(function (response) {
                    sources[id] = set;
                    sources[id]._rev = response.rev;
                    sourcesByProject[sources[id].project_id][id] = set;
                    sourcesByProject[sources[id].project_id][id]._rev = response.rev;
                    $rootScope.$broadcast("sourceLoadingEnded");
                    p.resolve(response);
                    loadingSources = false;
                }).catch(function (err) {
                    p.reject(err);
                    $rootScope.$broadcast("sourceLoadingError");
                    loadingSources = false;
                });
            }
            return p.promise;
        },
        createSource: function (newsource) {
            var p = $q.defer();

            sourceRepo.post(newsource).then(function (response) {
                newsource._id = response.id;
                newsource._rev = response.rev;

                sourcesByProject[newsource.project_id][newsource._id] = newsource;
                sources[newsource._id] = newsource;

                p.resolve(response);
            }).catch(function (err) {
                p.reject(err);
            });

            return p.promise;
        },
        deleteSource: function (id) {
            var p = $q.defer();

            var doc = sources[id];
            delete sources[id];
            delete sourcesByProject[doc.project_id][id];

            sourceRepo.remove(doc).then(function(result) {
                p.resolve(result);
            }).catch(function(err) {
                p.reject(err);
            });

            return p.promise;
        },
        getPendings: function () {
            var p = $q.defer();

            if (loadingPendings) {
                p.notify("loading");
                $rootScope.$on("sourceLoadingEnded", function () {
                    p.resolve(Array.prototype.fromObject(pendings));
                });
                $rootScope.$on("sourceLoadingError", function (err) {
                    p.reject(err);
                });
            }else {
                p.resolve(Array.prototype.fromObject(pendings));
            }

            return p.promise;
        },
        createPending: function (newpending) {
            var p = $q.defer();

            pendingRepo.post(newpending).then(function(response) {
                newpending._id = response.id;
                newpending._rev = response.rev;

                pendings[newpending._id] = newpending;

                p.resolve(response);
            }).catch(function (err) {
                p.reject(err);
            });

            return p.promise;
        },
        deletePending: function (id) {
            var p = $q.defer();

            pendingRepo.remove(pendings[id]).then(function (response) {
                delete pendings[id];
                p.resolve(response);
            }).catch(function (err) {
                p.reject(err);
            });

            return p.promise;
        },
        setPendingFromId: function (id, set) {
            var p = $q.defer();

            pendingRepo.put(set, id, pendings[id]._rev).then(function (response) {
                set._rev = response.rev;

                pendings[id] = set;

                p.resolve(response);
            }).catch(function (err) {
                p.reject(err);
            })

            return
        }
    };
});
