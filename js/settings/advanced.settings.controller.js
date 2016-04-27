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
            // Buy
            
            // Activate
            Settings.set("advanced", true);
            $state.go("tab.settings", {});
        }
    }
});
