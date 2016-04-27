angular.module("metho.controller.settings.tab", [])

.controller('SettingsCtrl', function($scope, $rootScope, $translate, $ionicConfig, $ionicPopup, localStorageService, Settings, ParseSource) {
    // Get settings from service
    $scope.settings = Settings.all();
    $scope.name = {
        firstname: $scope.settings["firstName"],
        lastname: $scope.settings["lastName"]
    };

    // Commit changes to settings service
    $scope.changeSettings = function(setting) {
        Settings.set(setting, $scope.settings[setting]);
    }

    $scope.editName = function () {
        $translate(["SETTINGS.EDIT_NAME", "SETTINGS.CANCEL", "SETTINGS.EDIT"]).then(function (translations) {
            $ionicPopup.show({
                template: "<input type='text' ng-model='name.firstname'><br><input type='text' ng-model='name.lastname'>",
                title: translations["SETTINGS.EDIT_NAME"],
                scope: $scope,
                buttons: [
                    {
                        text: translations["SETTINGS.CANCEL"],
                        onTap: function (e) {
                            $scope.name.firstname = $scope.settings["firstName"];
                            $scope.name.lastname = $scope.settings["lastName"];
                        }
                    },
                    {
                        text: "<b>" + translations["SETTINGS.EDIT"] + "</b>",
                        type: "button-positive",
                        onTap: function (e) {
                            Settings.set("firstName", $scope.name.firstname);
                            Settings.set("lastName", $scope.name.lastname);
                            $scope.settings = Settings.all();
                        }
                    }
                ]
            });
        });
    }

    $scope.deleteName = function () {
        Settings.set("firstName", "");
        Settings.set("lastName", "");
        $scope.settings = Settings.all();
    }
    $scope.$on("$ionicView.afterEnter", function() {
        $scope.settings = Settings.all();
    });

    $rootScope.$on("$translateChangeSuccess", function () {
        $scope.sourceRepo = new PouchDB("sources");
        // Reparse every source
        $scope.sourceRepo.allDocs({include_docs:true}).then(function (docs) {
            for (var i = 0; i < docs.rows.length; i++) {
                $scope.sourceRepo.put(ParseSource.parseSource(docs.rows[i].doc));
            }
        });
    });

    $scope.changeLanguage = function () {
        $scope.changeSettings("overideLang");
        if ($scope.settings.overideLang == "") {
            if (typeof navigator.globalization !== "undefined") {
                navigator.globalization.getPreferredLanguage(function(language) {
                    $translate.use((language.value).split("-")[0]).then(function(data) {
                        console.log("SUCCESS -> " + data);
                    }, function(error) {
                        console.log("ERROR -> " + error);
                    });
                    numeral.language((language.value).split("-")[0]);
                }, null);
            }
        }else {
            $translate.use($scope.settings.overideLang);
            numeral.language($scope.settings.overideLang);
        }
    }
});
