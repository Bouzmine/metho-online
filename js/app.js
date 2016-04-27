angular.module('metho', ['ionic', 'metho.controller.projects.tab', 'metho.controller.projects.detail', 'metho.controller.projects.source', 'metho.controller.projects.pending', 'metho.controllers.references', 'metho.controller.settings.tab', 'metho.controller.settings.advanced', 'metho.controller.settings.feedback', 'metho.services.projects.share', 'metho.service.projects.parse', 'metho.services.references', 'metho.service.settings', 'ngCordova', 'LocalStorageModule', 'ng-slide-down', 'pascalprecht.translate'])

.run(function($ionicPlatform, localStorageService, $translate, $ionicConfig, Settings, $rootScope, ParseSource) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (!!window.cordova) {
            cordova.plugins.Keyboard.disableScroll(false);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        if(typeof navigator.globalization !== "undefined") {
            if (Settings.get("overideLang") == "") {
                navigator.globalization.getPreferredLanguage(function(language) {
                    var two = (language.value).split("-")[0];
                    $translate.use(two).then(function(data) {
                        console.log("SUCCESS -> " + data);
                    }, function(error) {
                        console.log("ERROR -> " + error);
                    });
                    numeral.language(two);
                    if (two != Settings.get("lastLang")) {
                        var sourceRepo = new PouchDB("sources");
                        // Reparse every source
                        sourceRepo.allDocs({include_docs:true}).then(function (docs) {
                            for (var i = 0; i < docs.rows.length; i++) {
                                sourceRepo.put(ParseSource.parseSource(docs.rows[i].doc));
                            }
                        });
                    }
                    Settings.set("lastLang", two);
                }, null);
            }else {
                $translate.use(Settings.get("overideLang"));
                numeral.language(Settings.get("overideLang"));
            }
        }else {
            if (Settings.get("overideLang") != "") {
                $translate.use(Settings.get("overideLang"));
                numeral.language(Settings.get("overideLang"));
            }else {
                numeral.language("fr");
            }
        }

        $rootScope.$on("$translateChangeSuccess", function () {
            $translate("BACK_BUTTON").then(function (back) {
                $ionicConfig.backButton.text(back);
            });
        });
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Project tab
    .state('tab.projects', {
        url: '/projects',
        views: {
            'tab-projects': {
                templateUrl: 'templates/tab.projects.html',
                controller: 'ProjectsCtrl'
            }
        }
    })

    .state('tab.project-detail', {
        url: '/projects/:projectID',
        views: {
            'tab-projects': {
                templateUrl: 'templates/detail.projects.html',
                controller: 'ProjectDetailCtrl'
            }
        }
    })

    .state('tab.source-detail', {
        url: '/projects/:projectID/:sourceID',
        views: {
            'tab-projects': {
                templateUrl: 'templates/source.projects.html',
                controller: 'SourceDetailCtrl'
            }
        }
    })

    .state('tab.pending', {
        url: '/pending/:projectID',
        views: {
            'tab-projects': {
                templateUrl: 'templates/pending.projects.html',
                controller: 'PendingCtrl'
            }
        }
    })

    // Reference tab
    .state('tab.ref', {
        url: '/ref',
        views: {
            'tab-ref': {
                templateUrl: 'templates/tab.references.html',
                controller: 'RefCtrl'
            }
        }
    })

    .state('tab.ref-detail', {
        url: '/ref/:articleId',
        views: {
            'tab-ref': {
                templateUrl: 'templates/detail.references.html',
                controller: 'RefDetailCtrl'
            }
        }
    })

    .state('tab.ref-sub-detail', {
        url: '/ref/:articleId/:subId',
        views: {
            'tab-ref': {
                templateUrl: 'templates/sub.references.html',
                controller: 'RefSubDetailCtrl'
            }
        }
    })

    // Settings tab
    .state('tab.settings', {
        url: '/settings',
        views: {
            'tab-settings': {
                templateUrl: 'templates/tab.settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })

    .state('tab.feedback', {
        url: '/settings/feedback',
        views: {
            'tab-settings': {
                templateUrl: 'templates/feedback.settings.html',
                controller: 'FeedbackCtrl'
            }
        }
    })

    .state('tab.infos-advanced', {
        url: '/settings/infos-advanced',
        views: {
            'tab-settings': {
                templateUrl: 'templates/advanced.settings.html',
                controller: 'InfosAdvancedCtrl'
            }
        }
    })

    .state('tab.attributions', {
        url: '/settings/attributions',
        views: {
            'tab-settings': {
                templateUrl: 'templates/attributions.settings.html'
            }
        }
    })

    .state('tab.mit', {
        url: '/settings/attributions/mit',
        views: {
            'tab-settings': {
                templateUrl: 'templates/mit.settings.html'
            }
        }
    })

    .state('tab.bsd', {
        url: '/settings/attributions/bsd',
        views: {
            'tab-settings': {
                templateUrl: 'templates/bsd.settings.html'
            }
        }
    })

    .state('tab.apache', {
        url: '/settings/attributions/apache',
        views: {
            'tab-settings': {
                templateUrl: 'templates/apache.settings.html'
            }
        }
    });
    $urlRouterProvider.otherwise('/tab/projects');

    // Translation
    $translateProvider.registerAvailableLanguageKeys(['fr', 'en', 'es'], {
        'en_*': 'en',
        'fr_*': 'fr',
        'es_*': 'es'
    });
    $translateProvider.translations('fr', {
        "TAB_PROJECT": "Projets",
        "TAB_REFERENCES": "Référence",
        "TAB_SETTINGS": "Paramètres",
        "PROJECT":{
            "TAB_TITLE": "Projets"
        }
    });
    $translateProvider.useStaticFilesLoader({
        prefix: "translations/locale-",
        suffix: ".json"
    });
    $translateProvider.forceAsyncReload(true);
    $translateProvider.preferredLanguage("fr");
    $translateProvider.fallbackLanguage("fr");

});
