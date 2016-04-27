angular.module('metho.controller.projects.tab', [])

.controller('ProjectsCtrl', function($scope, $rootScope, $state, $translate, $ionicModal, $ionicPlatform, $ionicPopup, $ionicListDelegate, ShareProject) {
    $scope.projects = [];
    $scope.project = {
        name: "",
        matter: ""
    };
    $scope.editingProject = {};
    $scope.err = "";
    $scope.errorName = false;
    $scope.loading = true;
    // Initialize the DB
    $scope.projectsRepo = new PouchDB("projects");
    // Load the projects
    $scope.loadProjects = function () {
        $translate("PROJECT.TAB.UNKNOWN_MATTER").then(function (unknown) {
            $scope.projectsRepo.allDocs({
                include_docs: true
            }).then(function(result) {
                $scope.projects = [];
                for (var i = 0; i < result.rows.length; i++) {
                    var obj = {
                        name: result.rows[i].doc.name,
                        matter: result.rows[i].doc.matter,
                        id: result.rows[i].doc._id
                    }
                    if (obj.matter == "") {
                        obj.matter = unknown;
                    }
                    $scope.projects.push(obj);
                }
                $scope.loading = false;
                $scope.projects.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                $scope.$apply();
            }).catch(function(err) {
                console.log(err);
            });
        });
    }

    $rootScope.$on("$translateChangeSuccess", function () {
        $scope.loadProjects();
    });

    setTimeout(function () {
        if ($scope.loading) {
            $scope.loadProjects();
        }
    }, 2000);

    $ionicModal.fromTemplateUrl('templates/new.project.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
        $scope.newProjectModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/edit.project.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
        $scope.editProjectModal = modal;
    });

    $scope.$on("modal.hidden", function () {
        $ionicListDelegate.closeOptionButtons();
    });

    $scope.closeModal = function() {
        $scope.newProjectModal.hide();
        $ionicListDelegate.closeOptionButtons();
        $scope.errorName = false;
    }

    $scope.closeEditModal = function() {
        $scope.editProjectModal.hide();
        $ionicListDelegate.closeOptionButtons();
        $scope.errorName = false;
    }

    $scope.newProject = function() {
        $scope.newProjectModal.show();
    }

    $scope.submitProject = function() {
        if ($scope.project.name == "" ||  $scope.project.name == null) {
            $scope.errorName = true;
            $translate(["PROJECT.TAB.POPUP.ERROR_TEXT", "PROJECT.TAB.POPUP.NO_PROJECT_NAME"]).then(function (translations) {
                $ionicPopup.alert({
                    title: translations["PROJECT.TAB.POPUP.ERROR_TEXT"],
                    template: '<p class="center">' + translations["PROJECT.TAB.POPUP.NO_PROJECT_NAME"] + '</p>'
                });
            });
        } else {
            $translate("PROJECT.TAB.UNKNOWN_MATTER").then(function (unknown) {
                $scope.errorName = false;
                if ($scope.project.matter == "" || $scope.project.matter == null) {
                    var theMatter = "";
                } else {
                    var theMatter = $scope.project.matter;
                }
                var creatingProj = {
                    name: $scope.project.name,
                    matter: theMatter
                };

                $scope.projectsRepo.post(creatingProj).then(function(response) {
                    creatingProj.id = response.id;
                    if (creatingProj.matter == "") {
                        creatingProj.matter = unknown;
                    }
                    $scope.projects.push(creatingProj);
                    $scope.project = {
                        name: "",
                        matter: ""
                    };
                    $scope.newProjectModal.hide();
                    $scope.projects.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    $scope.$apply();
                }).catch(function(err) {
                    console.log(err);
                });
            });
        }
    }

    $scope.deleteProject = function(id) {
        $translate(['PROJECT.TAB.POPUP.DELETE_PROJECT_TITLE', 'PROJECT.TAB.POPUP.DELETE_PROJECT', 'PROJECT.TAB.POPUP.CANCEL', 'PROJECT.TAB.POPUP.DELETE']).then(function (translations) {
            $ionicPopup.confirm({
                title: translations['PROJECT.TAB.POPUP.DELETE_PROJECT_TITLE'],
                template: '<p class="center">' + translations['PROJECT.TAB.POPUP.DELETE_PROJECT'] + '</p>',
                cancelText: translations['PROJECT.TAB.POPUP.CANCEL'],
                okText: '<b>' + translations['PROJECT.TAB.POPUP.DELETE'] + '</b>',
                okType: 'button-assertive',
                cssClass: 'deleteProject'
            }).then(function(res) {
                if (res) {
                    $scope.projectsRepo.get(id).then(function(doc) {
                        return $scope.projectsRepo.remove(doc);
                    }).then(function(result) {
                        for (var i = 0; i < $scope.projects.length; i++) {
                            if ($scope.projects[i].id == result.id) {
                                $scope.projects.splice(i, 1);
                                $scope.$apply();
                                return;
                            }
                        }
                    }).catch(function(err) {
                        console.log(err);
                    });
                } else {
                    $ionicListDelegate.closeOptionButtons();
                }
            });
        });
    }

    $scope.editProject = function(id) {
        $translate("PROJECT.TAB.UNKNOWN_MATTER").then(function (unknown) {
            $scope.editingProject = {};
            $scope.projectsRepo.get(id).then(function(doc) {
                $scope.editingProject.name = doc.name;
                $scope.editingProject.matter = doc.matter;
                $scope.editingProject.id = doc._id;
                $scope.editProjectModal.show();
            });
        });
    }

    $scope.submitEditProject = function() {
        if ($scope.editingProject.name == "") {
            $translate(["PROJECT.TAB.POPUP.ERROR_TEXT", "PROJECT.TAB.POPUP.MUST_HAVE_TYPE"]).then(function (translations) {
                $scope.errorName = true;
                $ionicPopup.alert({
                    title: translations["PROJECT.TAB.POPUP.ERROR_TEXT"],
                    template: '<p class="center">' + translations["PROJECT.TAB.POPUP.MUST_HAVE_TYPE"] + '</p>'
                });
            });
        } else {
            $translate("PROJECT.TAB.UNKNOWN_MATTER").then(function (unknown) {
                // make the change in the database
                $scope.projectsRepo.get($scope.editingProject.id).then(function(doc) {
                    return $scope.projectsRepo.put($scope.editingProject, $scope.editingProject.id, doc._rev);
                }).then(function(response) {
                    // edit the table's entry
                    for (var i = 0; i < $scope.projects.length; i++) {
                        if ($scope.projects[i].id == response.id) {
                            $scope.projects[i].name = $scope.editingProject.name;
                            if ($scope.editingProject.matter == "") {
                                $scope.projects[i].matter = unknown;
                            } else {
                                $scope.projects[i].matter = $scope.editingProject.matter;
                            }
                        }
                    }
                }).catch(function(err) {
                    console.log(err);
                });
                $scope.editProjectModal.hide();
                $ionicListDelegate.closeOptionButtons();
            });
        }
    }

    $scope.openProjectDetail = function(id) {
        for (var i = 0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == id) {
                var index = i;
                break;
            }
        }
        ShareProject.setName($scope.projects[index].name);
        ShareProject.setMatter($scope.projects[index].matter);
        $state.go("tab.project-detail", {
            projectID: id
        });
    }
});
