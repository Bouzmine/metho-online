angular.module("metho.controller.projects.source", [])

.controller('SourceDetailCtrl', function($scope, $stateParams, $translate, $ionicPopup, $ionicModal, ParseSource, ShareSource) {
    $scope.source = ShareSource.getSource();
    $scope.loading = false;
    $scope.sourceRepo = new PouchDB("sources");
    $scope.projectRepo = new PouchDB("projects");

    $ionicModal.fromTemplateUrl('templates/edit.source.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
        $scope.editSourceModal = modal;
    });

    $scope.solveError = function(id) {
        $translate(["PROJECT.SOURCE.CONFIRM", "PROJECT.SOURCE.CANCEL"]).then(function (translations) {
            if (!!window.cordova) {
                cordova.plugins.Keyboard.disableScroll(false);
            }
            if ($scope.source.errors[id].complex) {
                $ionicPopup.prompt({
                    title: $scope.source.errors[id].promptTitle,
                    subTitle: $scope.source.errors[id].promptText,
                    template: $scope.source.errors[id].template,
                    inputType: 'text',
                    cancelText: translations["PROJECT.SOURCE.CANCEL"],
                    okText: "<b>" + translations["PROJECT.SOURCE.CONFIRM"] + "</b>"
                }).then(function(res) {
                    if (res != null) {
                        var e = document.getElementById($scope.source.errors[id].id);
                        switch ($scope.source.errors[id].type) {
                            case "select":
                                $scope.source[$scope.source.errors[id].var] = e.options[e.selectedIndex].value;
                                break;
                            case "input":
                                $scope.source[$scope.source.errors[id].var] = e.value;
                                break;
                            default:

                        }
                        $scope.source = ParseSource.parseSource($scope.source);
                        $scope.sourceRepo.put($scope.source, $scope.source._id, $scope.source._rev).then(function(response) {
                            if (response.ok) {
                                $scope.source._rev = response.rev;
                            } else {
                                console.log("not ok");
                            }
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }
                });
            } else {
                $ionicPopup.prompt({
                    title: $scope.source.errors[id].promptTitle,
                    subTitle: $scope.source.errors[id].promptText,
                    inputType: 'text',
                    cancelText: translations["PROJECT.SOURCE.CANCEL"],
                    okText: "<b>" + translations["PROJECT.SOURCE.CONFIRM"] + "</b>"
                }).then(function(res) {
                    if (res != null) {
                        $scope.source[$scope.source.errors[id].var] = res;
                        $scope.source = ParseSource.parseSource($scope.source);
                        $scope.sourceRepo.put($scope.source, $scope.source._id, $scope.source._rev).then(function(response) {
                            if (response.ok) {
                                $scope.source._rev = response.rev;
                            } else {
                                console.log("not ok");
                            }
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }
                });
            }
        });
    }

    $scope.solveWarning = function(id) {
        $translate(["PROJECT.SOURCE.CONFIRM", "PROJECT.SOURCE.CANCEL"]).then(function (translations) {
            if (!!window.cordova) {
                cordova.plugins.Keyboard.disableScroll(false);
            }
            $ionicPopup.prompt({
                title: $scope.source.warnings[id].promptTitle,
                subTitle: $scope.source.warnings[id].promptText,
                inputType: 'text',
                cancelText: translations["PROJECT.SOURCE.CANCEL"],
                okText: "<b>" + translations["PROJECT.SOURCE.CONFIRM"] + "</b>"
            }).then(function(res) {
                if (res != null) {
                    $scope.source[$scope.source.warnings[id].var] = res;
                    $scope.source = ParseSource.parseSource($scope.source);
                    $scope.sourceRepo.put($scope.source, $scope.source._id, $scope.source._rev).then(function(response) {
                        if (response.ok) {
                            $scope.source._rev = response.rev;
                        } else {
                            console.log("not ok");
                        }
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            });
        });
    }

    $scope.edit = function() {
        if (!!window.cordova) {
            cordova.plugins.Keyboard.disableScroll(false);
        }
        $scope.newsource = JSON.parse(JSON.stringify($scope.source));
        if ($scope.newsource.consultationDate != null && $scope.newsource.consultationDate != "") {
            $scope.newsource.consultationDate = new Date($scope.newsource.consultationDate);
        }
        $scope.editSourceModal.show();
    }

    $scope.cancelEdit = function() {
        $scope.newsource = {};
        $scope.editSourceModal.hide();
    }

    $scope.submitEdit = function() {
        $scope.source = ParseSource.parseSource($scope.newsource);
        $scope.editSourceModal.hide();
        $scope.newsource = {};
        $scope.sourceRepo.put($scope.source, $scope.source._id, $scope.source._rev).then(function(response) {
            if (response.ok) {
                $scope.source._rev = response.rev;
            } else {
                console.log("not ok");
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Init if service is unavailable (debug when reloading the page)
    if ($scope.source == null) {
        $scope.loading = true;
        $scope.sourceRepo.get($stateParams.sourceID).then(function(result) {
            $scope.source = result;
            $scope.loading = false;
        });
    }
});
