angular.module("metho.controller.settings.advanced", [])

.controller("InfosAdvancedCtrl", function($scope, Settings, $ionicPopup, $state, $translate) {
    $scope.buy = function() {
        if (Settings.get("advanced")) {
            $translate(["SETTINGS.ADVANCED_MODE.POPUP.ALREADY_TEXT", "SETTINGS.ADVANCED_MODE_LABEL"]).then(function (translations) {
                $ionicPopup.alert({
                    title: translations["SETTINGS.ADVANCED_MODE_LABEL"],
                    template: '<p class="center">' + translations["SETTINGS.ADVANCED_MODE.POPUP.ALREADY_TEXT"] + '</p>'
                }).then(function() {
                    $state.go("tab.settings", {});
                });
            });
        } else {
            // Restore purchases
            // Buy
            // Add Quick Actions
            if (!!window.cordova) {
                ThreeDeeTouch.isAvailable(function (avail) {
                    if (avail) {
                        $translate(["3D_TOUCH.NEW_SOURCE", "3D_TOUCH.NEW_SOURCE_DESC", "3D_TOUCH.SCAN", "3D_TOUCH.SCAN_DESC"]).then(function (translations) {
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
                        });
                    }
                });
            }
            // Activate
            Settings.set("advanced", true);
            $state.go("tab.settings", {});
        }
    }
});
