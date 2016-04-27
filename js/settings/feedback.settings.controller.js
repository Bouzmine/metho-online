angular.module("metho.controller.settings.feedback", [])

.controller('FeedbackCtrl', function($scope, $cordovaDevice, $translate) {
    $scope.newFeedback = function(name) {
        switch (name) {
            case "projects":
                $translate(['SETTINGS.FEEDBACK.EMAIL.PROJECT', 'SETTINGS.FEEDBACK.EMAIL.PROJECT_TITLE']).then(function (translations) {
                    window.plugins.socialsharing.shareViaEmail(
                        translations['SETTINGS.FEEDBACK.EMAIL.PROJECT'] + $cordovaDevice.getPlatform() + " " + $cordovaDevice.getVersion() + "<br>" + $cordovaDevice.getModel() + "<br>" + (window.screen.width * window.devicePixelRatio) + "x" + (window.screen.height * window.devicePixelRatio) + "<br>Cordova " + $cordovaDevice.getCordova() + "</p>",
                        translations['SETTINGS.FEEDBACK.EMAIL.PROJECT_TITLE'],
                        ['methoappeei@gmail.com@gmail.com'], // TO: must be null or an array
                        [], // CC: must be null or an array
                        null, // BCC: must be null or an array
                        [], // FILES: can be null, a string, or an array
                        function() { // Success
                            console.log("success");
                        },
                        function() { // Error
                            console.log("error");
                        }
                    );
                });
                break;
            case "refs":
                $translate(['SETTINGS.FEEDBACK.EMAIL.REFERENCE', 'SETTINGS.FEEDBACK.EMAIL.REFERENCE_TITLE']).then(function (translations) {
                    window.plugins.socialsharing.shareViaEmail(
                        translations['SETTINGS.FEEDBACK.EMAIL.REFERENCE'] + $cordovaDevice.getPlatform() + " " + $cordovaDevice.getVersion() + "<br>" + $cordovaDevice.getModel() + "<br>" + (window.screen.width * window.devicePixelRatio) + "x" + (window.screen.height * window.devicePixelRatio) + "<br>Cordova " + $cordovaDevice.getCordova() + "</p>",
                        translations['SETTINGS.FEEDBACK.EMAIL.REFERENCE_TITLE'],
                        ['methoappeei@gmail.com'], // TO: must be null or an array
                        [], // CC: must be null or an array
                        null, // BCC: must be null or an array
                        [], // FILES: can be null, a string, or an array
                        function() { // Success
                            console.log("success");
                        },
                        function() { // Error
                            console.log("error");
                        }
                    );
                });
                break;
            case "settings":
                $translate(['SETTINGS.FEEDBACK.EMAIL.SETTINGS', 'SETTINGS.FEEDBACK.EMAIL.SETTINGS_TITLE']).then(function (translations) {
                    window.plugins.socialsharing.shareViaEmail(
                        translations['SETTINGS.FEEDBACK.EMAIL.SETTINGS'] + $cordovaDevice.getPlatform() + " " + $cordovaDevice.getVersion() + "<br>" + $cordovaDevice.getModel() + "<br>" + (window.screen.width * window.devicePixelRatio) + "x" + (window.screen.height * window.devicePixelRatio) + "<br>Cordova " + $cordovaDevice.getCordova() + "</p>",
                        translations['SETTINGS.FEEDBACK.EMAIL.SETTINGS_TITLE'],
                        ['methoappeei@gmail.com'], // TO: must be null or an array
                        [], // CC: must be null or an array
                        null, // BCC: must be null or an array
                        [], // FILES: can be null, a string, or an array
                        function() { // Success
                            console.log("success");
                        },
                        function() { // Error
                            console.log("error");
                        }
                    );
                });
                break;
            case "comment":
                $translate(['SETTINGS.FEEDBACK.EMAIL.COMMENT', 'SETTINGS.FEEDBACK.EMAIL.COMMENT_TITLE']).then(function (translations) {
                    window.plugins.socialsharing.shareViaEmail(
                        translations['SETTINGS.FEEDBACK.EMAIL.COMMENT'],
                        translations['SETTINGS.FEEDBACK.EMAIL.COMMENT_TITLE'],
                        ['methoappeei@gmail.com'], // TO: must be null or an array
                        [], // CC: must be null or an array
                        null, // BCC: must be null or an array
                        [], // FILES: can be null, a string, or an array
                        function() { // Success
                            console.log("success");
                        },
                        function() { // Error
                            console.log("error");
                        }
                    );
                });
                break;
            case "feature":
                $translate(['SETTINGS.FEEDBACK.EMAIL.FEATURE', 'SETTINGS.FEEDBACK.EMAIL.FEATURE_TITLE']).then(function (translations) {
                    window.plugins.socialsharing.shareViaEmail(
                        translations['SETTINGS.FEEDBACK.EMAIL.FEATURE'],
                        translations['SETTINGS.FEEDBACK.EMAIL.FEATURE_TITLE'],
                        ['methoappeei@gmail.com'], // TO: must be null or an array
                        [], // CC: must be null or an array
                        null, // BCC: must be null or an array
                        [], // FILES: can be null, a string, or an array
                        function() { // Success
                            console.log("success");
                        },
                        function() { // Error
                            console.log("error");
                        }
                    );
                });
                break;
            default:

        }
    }
});
