angular.module('metho', ['ionic', 'metho.controller.projects.tab', 'metho.controller.projects.detail', 'metho.controller.projects.source', 'metho.controller.projects.pending', 'metho.controllers.references', 'metho.controller.settings.tab', 'metho.controller.settings.advanced', 'metho.controller.settings.feedback', 'metho.services.projects.share', 'metho.service.projects.parse', 'metho.services.references', 'metho.service.settings', "metho.service.storage", 'ngCordova', 'LocalStorageModule', 'ng-slide-down', 'pascalprecht.translate'])

.run(function($ionicPlatform, localStorageService, $translate, $ionicConfig, Settings, $rootScope, ParseSource, $state, $ionicPopup, ShareProject) {
    $ionicPlatform.ready(function() {
        if (Settings.get("firstRun")) {
            // Restore purchase + add a var if user is not online
            if (!!window.cordova) {
                ThreeDeeTouch.isAvailable(function (avail) {
                    if (avail) {
                        $translate(["3D_TOUCH.NEW_SOURCE", "3D_TOUCH.NEW_SOURCE_DESC"]).then(function (translations) {
                            ThreeDeeTouch.configureQuickActions([
                                {
                                    type: 'newsource',
                                    title: translations["3D_TOUCH.NEW_SOURCE"],
                                    subtitle: translations["3D_TOUCH.NEW_SOURCE_DESC"],
                                    iconType: "Add"
                                }
                            ]);
                        });
                    }
                });
            }
            Settings.set("firstRun", false);
        }
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
            if (!!window.cordova) {
                ThreeDeeTouch.isAvailable(function (avail) {
                    if (avail) {
                        $translate(["3D_TOUCH.NEW_SOURCE", "3D_TOUCH.NEW_SOURCE_DESC", "3D_TOUCH.SCAN", "3D_TOUCH.SCAN_DESC"]).then(function (translations) {
                            if (Settings.get("advanced")) {
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

        if (!!window.cordova) {
            ThreeDeeTouch.onHomeIconPressed = function (payload) {
                if (payload.type == 'newsource') {
                    $state.go("tab.projects");
                    var projectRepo = new PouchDB("projects");
                    projectRepo.allDocs({include_docs:true}).then(function (res) {
                        var projects = "<select id='projectselect'>";
                        for (var i = 0; i < res.rows.length; i++) {
                            projects += "<option value='" + res.rows[i].id + "'>" + res.rows[i].doc.name + "</option>";
                        }
                        projects += "</select>";
                        $ionicPopup.confirm({
                            title: "Choisissez le projet",
                            template: projects,
                            okText: "Choisir",
                            cancelText: "Annuler"
                        }).then(function (result) {
                            if (result) {
                                var e = document.getElementById("projectselect");
                                var id = e.options[e.selectedIndex].value;
                                for (var i = 0; i < res.rows.length; i++) {
                                    if (res.rows[i].id == id) {
                                        ShareProject.setName(res.rows[i].doc.name);
                                        ShareProject.setMatter(res.rows[i].doc.matter);
                                        break;
                                    }
                                }
                                $state.go('tab.project-detail', {projectID:id, newSource:true});
                            }
                        });

                    });
                } else if (payload.type == 'scan') {
                    $state.go("tab.projects");
                    var projectRepo = new PouchDB("projects");
                    projectRepo.allDocs({include_docs:true}).then(function (res) {
                        var projects = "<select id='projectselect'>";
                        for (var i = 0; i < res.rows.length; i++) {
                            projects += "<option value='" + res.rows[i].id + "'>" + res.rows[i].doc.name + "</option>";
                        }
                        projects += "</select>";
                        $ionicPopup.confirm({
                            title: "Choisissez le projet",
                            template: projects,
                            okText: "Choisir",
                            cancelText: "Annuler"
                        }).then(function (result) {
                            if (result) {
                                var e = document.getElementById("projectselect");
                                var id = e.options[e.selectedIndex].value;
                                for (var i = 0; i < res.rows.length; i++) {
                                    if (res.rows[i].id == id) {
                                        ShareProject.setName(res.rows[i].doc.name);
                                        // Replace with unknown subject when empty
                                        ShareProject.setMatter(res.rows[i].doc.matter);
                                        break;
                                    }
                                }
                                $state.go('tab.project-detail', {projectID:id, scanSource:true});
                            }
                        });
                    });
                }
            }
        }
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
        url: '/projects/:projectID?new=:newSource&scan=:scanSource',
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
