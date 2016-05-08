angular.module("metho.controller.settings.tab", [])

.controller('SettingsCtrl', function($scope, $rootScope, $translate, $ionicConfig, $ionicPopup, localStorageService, Settings, ParseSource, Storage) {
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
        Storage.parseSources();
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

    $scope.$watch("settings.advanced", function () {
        if (!!window.cordova) {
            ThreeDeeTouch.isAvailable(function (avail) {
                if (avail) {
                    $translate(["3D_TOUCH.NEW_SOURCE", "3D_TOUCH.NEW_SOURCE_DESC", "3D_TOUCH.SCAN", "3D_TOUCH.SCAN_DESC"]).then(function (translations) {
                        if ($scope.settings.advanced) {
                            ThreeDeeTouch.configureQuickActions([
                                {
                                    type: 'newsource',
                                    title: translations["3D_TOUCH.NEW_SOURCE"],
                                    subtitle: translations["3D_TOUCH.NEW_SOURCE_DESC"],
                                    iconType: "Add"
                                },
                                {
                                    type: 'scan',
                                    title: translations["3D_TOUCH.SCAN"],
                                    subtitle: translations["3D_TOUCH.SCAN_DESC"],
                                    iconType: "CapturePhoto"
                                }
                            ]);
                        }else {
                            ThreeDeeTouch.configureQuickActions([
                                {
                                    type: 'newsource',
                                    title: translations["3D_TOUCH.NEW_SOURCE"],
                                    subtitle: translations["3D_TOUCH.NEW_SOURCE_DESC"],
                                    iconType: "Add"
                                }
                            ]);
                        }
                    });
                }
            });
        }
    });
});
