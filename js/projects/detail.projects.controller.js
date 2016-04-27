angular.module('metho.controller.projects.detail', [])

.controller('ProjectDetailCtrl', function($scope, $state, $http, $translate, $stateParams, $ionicModal, $ionicPopup, $ionicScrollDelegate, $ionicListDelegate, $ionicActionSheet, $ionicLoading, $ionicSlideBoxDelegate, $ionicBackdrop, ParseSource, ShareProject, ShareSource, SharePendings, Settings) {
    $scope.projectRepo = new PouchDB("projects");
    $scope.sourceRepo = new PouchDB("sources");
    $scope.pendingRepo = new PouchDB("pendings");
    $scope.project = {
        name: ShareProject.getName(),
        id: $stateParams.projectID,
        matter: ShareProject.getMatter(),
        sources: [],
        pendings: []
    };
    $scope.loading = true;
    $scope.newsource = {};
    $scope.newsource.consultationDate = new Date();
    $scope.refreshID = null;
    $scope.refreshIndex = null;
    $scope.removeAnimate = false;
    $scope.refreshPending = false;

    $scope.sourceRepo.allDocs({
        include_docs: true
    }).then(function(result) {
        for (var i = 0; i < result.rows.length; i++) {
            if (result.rows[i].doc.project_id == $stateParams.projectID) {
                $scope.project.sources.push(result.rows[i].doc);
            }
        }
        $scope.project.sources.sort(function(a, b) {
            if (a.title && b.title) {
                return a.title.localeCompare(b.title);
            } else if (a.title) {
                return a.title.localeCompare(b.parsedSource);
            } else if (b.title) {
                return a.parsedSource.localeCompare(b.title);
            }
        });
        $scope.loading = false;
    });

    $scope.pendingRepo.allDocs({
        include_docs: true
    }).then(function(result) {
        for (var i = 0; i < result.rows.length; i++) {
            if (result.rows[i].doc.project_id == $stateParams.projectID) {
                $scope.project.pendings.push(result.rows[i].doc);
            }
        }
    });


    // New source modal
    $ionicModal.fromTemplateUrl('templates/new.source.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
        $scope.newSourceModal = modal;
    });

    $scope.addSource = function() {
        // Open modal
        $translate(["PROJECT.TYPES.BOOK", "PROJECT.TYPES.ARTICLE", "PROJECT.TYPES.INTERNET", "PROJECT.TYPES.CD", "PROJECT.TYPES.MOVIE", "PROJECT.TYPES.INTERVIEW", "PROJECT.DETAIL.CHOOSE_TYPE", "PROJECT.DETAIL.POPUP.CANCEL"]).then(function (translations) {
            $ionicActionSheet.show({
                buttons: [{
                    text: translations["PROJECT.TYPES.BOOK"]
                }, {
                    text: translations["PROJECT.TYPES.ARTICLE"]
                }, {
                    text: translations["PROJECT.TYPES.INTERNET"]
                }, {
                    text: translations["PROJECT.TYPES.CD"]
                }, {
                    text: translations["PROJECT.TYPES.MOVIE"]
                }, {
                    text: translations["PROJECT.TYPES.INTERVIEW"]
                }],
                titleText: translations["PROJECT.DETAIL.CHOOSE_TYPE"],
                cancelText: translations["PROJECT.DETAIL.POPUP.CANCEL"],
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            $scope.newsource.type = "book";
                            break;
                        case 1:
                            $scope.newsource.type = "article";
                            break;
                        case 2:
                            $scope.newsource.type = "internet";
                            break;
                        case 3:
                            $scope.newsource.type = "cd";
                            break;
                        case 4:
                            $scope.newsource.type = "movie";
                            break;
                        case 5:
                            $scope.newsource.type = "interview";
                            $scope.newsource.author1lastname = Settings.get("lastName");
                            $scope.newsource.author1firstname = Settings.get("firstName");
                            break;
                        default:

                    }
                    if (!!window.cordova) {
                        cordova.plugins.Keyboard.disableScroll(true);
                    }
                    $scope.newSourceModal.show();
                    return true;
                }
            });
        });
    }

    $scope.resetModalVars = function() {
        // Reset vars
        $scope.newsource = {};
        $scope.newsource.consultationDate = new Date();
    }

    $scope.refreshModalScroll = function() {
        $ionicScrollDelegate.resize();
    }

    $scope.refreshModalScrollWithDelay = function() {
        setTimeout(function() {
            $ionicScrollDelegate.resize();
        }, 1000);
    }

    $scope.autoCompleteEditor = function() {
        if ($scope.newsource.type == "internet") {
            switch ($scope.newsource.editor.toLowerCase()) {
                case "wikipédia, l'encyclopédie libre":
                case "wikipédia l'encyclopédie libre":
                case "wikipedia, l'encyclopédie libre":
                case "wikipedia l'encyclopédie libre":
                    $scope.newsource.url = "https://www.fr.wikipedia.org";
                    $scope.newsource.editor = "Wikipédia, l'encyclopédie libre";
                    break;
                case "wikipedia the free encyclopedia":
                case "wikipedia, the free encyclopedia":
                    $scope.newsource.url = "https://www.en.wikipedia.org";
                    $scope.newsource.editor = "Wikipedia, the free encyclopedia";
                    break;
                default:
                    $scope.newsource.url = "";
            }
        }
    }

    $scope.closeModal = function() {
        $scope.newSourceModal.hide();
        $scope.resetModalVars();
    }

    // Refresh view on height change
    // $scope.$watch("newsource.hasBeenTranslated", $scope.refreshModalScroll);
    $scope.$watch("newsource.type", $scope.refreshModalScroll);
    $scope.$watch("newsource.hasAuthors", $scope.refreshModalScrollWithDelay);
    $scope.$watch("newsource.author1firstname", $scope.refreshModalScroll);
    $scope.$watch("newsource.author1lastname", $scope.refreshModalScroll);
    $scope.$watch("newsource.author2firstname", $scope.refreshModalScroll);
    $scope.$watch("newsource.author2lastname", $scope.refreshModalScroll);
    $scope.$watch("newsource.translator1firstname", $scope.refreshModalScroll);
    $scope.$watch("newsource.translator1lastname", $scope.refreshModalScroll);
    $scope.$watch("newsource.translator2firstname", $scope.refreshModalScroll);
    $scope.$watch("newsource.translator2lastname", $scope.refreshModalScroll);
    $scope.$watch("newsource.hasBeenTranslated", $scope.refreshModalScrollWithDelay);
    $scope.$watch("newsource.editor", $scope.autoCompleteEditor);
    // Keyboard events
    window.addEventListener('keyboardDidHide', $scope.refreshModalScroll);
    window.addEventListener('keyboardWillShow', $scope.refreshModalScroll);


    // Boarding
    $ionicModal.fromTemplateUrl('templates/boarding.scan.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
        $scope.scanBoardingModal = modal;
    });

    $scope.closeBoarding = function() {
        $scope.scanBoardingModal.hide();
        Settings.set("scanBoardingDone", true);
        $scope.scanBook();
    }

    $scope.slideHasChanged = function(index) {
        $scope.boardingIndex = index;
    }

    $scope.nextSlideBoarding = function() {
        $ionicSlideBoxDelegate.next();
    }

    $scope.lastSlideBoarding = function() {
        $ionicSlideBoxDelegate.previous();
    }

    // Share
    $scope.share = function() {
        $translate(["PROJECT.DETAIL.SHARE_TEXT", "PROJECT.DETAIL.POPUP.ORDER_TITLE", "PROJECT.DETAIL.POPUP.ORDER_SUB", "PROJECT.DETAIL.POPUP.ALPHA", "PROJECT.DETAIL.POPUP.TYPE"], { project_title: $scope.project.name }).then(function (translations) {
            var textToShare = translations["PROJECT.DETAIL.SHARE_TEXT"];
            if (Settings.get("askForOrder")) {
                var cancel = Settings.get("defaultOrder") == "alpha" ? "button-positive" : "button-stable";
                var ok = Settings.get("defaultOrder") == "type" ? "button-positive" : "button-stable";
                // display modal
                $ionicPopup.confirm({
                    title: translations["PROJECT.DETAIL.POPUP.ORDER_TITLE"],
                    subTitle: translations["PROJECT.DETAIL.POPUP.ORDER_SUB"],
                    cssClass: "popup-vertical-buttons",
                    cancelText: translations["PROJECT.DETAIL.POPUP.ALPHA"],
                    cancelType: cancel,
                    okText: translations["PROJECT.DETAIL.POPUP.TYPE"],
                    okType: ok
                }).then(function(res) {
                    if (!res) { // Ordre alphabétique
                        $scope.shareByAlpha(textToShare);
                    } else { // Type d'ouvrage
                        $scope.shareByType(textToShare);
                    }
                });
            } else if (Settings.get("defaultOrder") == "alpha") {
                $scope.shareByAlpha(textToShare);
            } else { // defaultOrder == type
                $scope.shareByType(textToShare);
            }
        });
    }

    $scope.shareByAlpha = function (textToShare) {
        var errNum = 0;
        var arr_sources = JSON.parse(JSON.stringify($scope.project.sources)).sort(function(a, b) {
            return a.parsedSource.localeCompare(b.parsedSource);
        });
        for (var i = 0; i < arr_sources.length; i++) {
            textToShare += arr_sources[i].parsedSource + "<br><br>";
            errNum += arr_sources[i].errors.length;
        }

        if (errNum > 0) {
            $translate(["PROJECT.DETAIL.POPUP.ERRORS_SOURCES", "PROJECT.DETAIL.POPUP.SHARE_TEXT", "PROJECT.DETAIL.POPUP.SHARE", "PROJECT.DETAIL.POPUP.CANCEL"], { errNum:errNum }).then(function (translations) {
                var confirmPopup = $ionicPopup.confirm({
                    title: translations["PROJECT.DETAIL.POPUP.SHARE_TEXT"],
                    template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.ERRORS_SOURCES"] + '</p>',
                    cancelText: translations["PROJECT.DETAIL.POPUP.CANCEL"],
                    okText: '<b>' + translations["PROJECT.DETAIL.POPUP.SHARE"] + '</b>'
                }).then(function(res) {
                    if (res) {
                        window.plugins.socialsharing.shareViaEmail(
                            textToShare,
                            $scope.project.name, [], // TO: must be null or an array
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
                    } else {
                        console.log("Cancelled by user");
                    }
                });
            });
        } else {
            window.plugins.socialsharing.shareViaEmail(
                textToShare,
                $scope.project.name, [], // TO: must be null or an array
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
        }
    }

    $scope.shareByType = function (textToShare) {
        var errNum = 0;
        var arr_sources = JSON.parse(JSON.stringify($scope.project.sources)).sort(function(a, b) {
            return a.parsedSource.localeCompare(b.parsedSource);
        });
        var arr_book = "";
        var arr_article = "";
        var arr_internet = "";
        var arr_cd = "";
        var arr_movie = "";
        var arr_interview = "";
        for (var i = 0; i < arr_sources.length; i++) {
            switch (arr_sources[i].type) {
                case "book":
                    arr_book += arr_sources[i].parsedSource + "<br>";
                    break;
                case "article":
                    arr_article += arr_sources[i].parsedSource + "<br>";
                    break;
                case "internet":
                    arr_internet += arr_sources[i].parsedSource + "<br>";
                    break;
                case "cd":
                    arr_cd += arr_sources[i].parsedSource + "<br>";
                    break;
                case "movie":
                    arr_movie += arr_sources[i].parsedSource + "<br>";
                    break;
                case "interview":
                    arr_interview += arr_sources[i].parsedSource + "<br>";
                    break;
                default:

            }
            errNum += arr_sources[i].errors.length;
        }
        categoryNum = 0;
        if (arr_book != "") {
            categoryNum++;
            textToShare += categoryNum + ". Ouvrages généraux<br>" + arr_book;
        }

        if (arr_article != "") {
            categoryNum++;
            textToShare += categoryNum + ". Articles de périodiques<br>" + arr_article;
        }

        if (arr_internet != "") {
            categoryNum++;
            textToShare += categoryNum + ". Sites Internet<br>" + arr_internet;
        }

        if (arr_cd != "" && arr_movie != "") {
            categoryNum++;
            textToShare += categoryNum + ". Documents audiovisuels<br>" + arr_cd + arr_movie;
        } else if (arr_movie != "") {
            categoryNum++;
            textToShare += categoryNum + ". Documents audiovisuels<br>" + arr_movie;
        } else if (arr_cd != "") {
            categoryNum++;
            textToShare += categoryNum + ". Documents audiovisuels<br>" + arr_cd;
        }

        if (arr_interview != "") {
            categoryNum++;
            textToShare += categoryNum + ". Entrevues<br>" + arr_interview;
        }

        if (errNum > 0) {
            $translate(["PROJECT.DETAIL.POPUP.ERRORS_SOURCES", "PROJECT.DETAIL.POPUP.SHARE_TEXT", "PROJECT.DETAIL.POPUP.SHARE", "PROJECT.DETAIL.POPUP.CANCEL"], { errNum:errNum }).then(function (translations) {
                $ionicPopup.confirm({
                    title: translations["PROJECT.DETAIL.POPUP.SHARE_TEXT"],
                    template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.ERRORS_SOURCES"] + '</p>',
                    cancelText: translations["PROJECT.DETAIL.POPUP.CANCEL"],
                    okText: '<b>' + translations["PROJECT.DETAIL.POPUP.SHARE"] + '</b>'
                }).then(function(res) {
                    if (res) {
                        window.plugins.socialsharing.shareViaEmail(
                            textToShare,
                            $scope.project.name, [], // TO: must be null or an array
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
                    } else {
                        console.log("Cancelled by user");
                    }
                });
            });
        }else {
            window.plugins.socialsharing.shareViaEmail(
                textToShare,
                $scope.project.name, [], // TO: must be null or an array
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
        }
    }

    // Submit
    $scope.submitSource = function() {
        if ($scope.newsource.type == "interview" && $scope.newsource.author1lastname && $scope.newsource.author1firstname && Settings.get("firstName") == "") {
            $translate(["PROJECT.DETAIL.MODAL.INTERVIEW.INTERVIEWER_NAME", "PROJECT.DETAIL.POPUP.SAVE_INTERVIEWER_NAME", "YES", "NO"]).then(function (translations) {
                $ionicPopup.confirm({
                    title: translations["PROJECT.DETAIL.MODAL.INTERVIEW.INTERVIEWER_NAME"],
                    template: "<p class='center'>" + translations["PROJECT.DETAIL.POPUP.SAVE_INTERVIEWER_NAME"] + "</p>",
                    okText: translations["YES"],
                    cancelText: translations["NO"]
                }).then(function(res) {
                    if(res) {
                        Settings.set("firstName", $scope.newsource.author1firstname);
                        Settings.set("lastName", $scope.newsource.author1lastname);
                    }
                    var creatingProj = ParseSource.parseSource($scope.newsource);
                    creatingProj.project_id = $stateParams.projectID;
                    // Save to db
                    $scope.sourceRepo.post(creatingProj).then(function(response) {
                        creatingProj._id = response.id;
                        creatingProj._rev = response.rev;
                        $scope.project.sources.push(creatingProj);
                        $scope.project.sources.sort(function(a, b) {
                            if (a.title && b.title) {
                                return a.title.localeCompare(b.title);
                            } else if (a.title) {
                                return a.title.localeCompare(b.parsedSource);
                            } else if (b.title) {
                                return a.parsedSource.localeCompare(b.title);
                            }
                        });
                        $scope.closeModal();
                        $scope.$apply();
                    }).catch(function(err) {
                        console.log(err);
                    });
                });
            });
        } else {
           var creatingProj = ParseSource.parseSource($scope.newsource);
           creatingProj.project_id = $stateParams.projectID;
           // Save to db
           $scope.sourceRepo.post(creatingProj).then(function(response) {
               creatingProj._id = response.id;
               creatingProj._rev = response.rev;
               $scope.project.sources.push(creatingProj);
               $scope.project.sources.sort(function(a, b) {
                   if (a.title && b.title) {
                       return a.title.localeCompare(b.title);
                   } else if (a.title) {
                       return a.title.localeCompare(b.parsedSource);
                   } else if (b.title) {
                       return a.parsedSource.localeCompare(b.title);
                   }
               });
               $scope.closeModal();
               $scope.$apply();
           }).catch(function(err) {
               console.log(err);
           });
        }

    }

    // Delete
    $scope.deleteSource = function(id) {
        // Delete the source
        $translate(["PROJECT.DETAIL.POPUP.DELETE_TITLE", "PROJECT.DETAIL.POPUP.DELETE_TEXT", "PROJECT.DETAIL.POPUP.DELETE", "PROJECT.DETAIL.POPUP.CANCEL"]).then(function (translations) {
            $ionicPopup.confirm({
                title: translations["PROJECT.DETAIL.POPUP.DELETE_TITLE"],
                template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.DELETE_TEXT"] + '</p>',
                cancelText: translations["PROJECT.DETAIL.POPUP.CANCEL"],
                okText: '<b>' + translations["PROJECT.DETAIL.POPUP.DELETE"] + '</b>',
                okType: 'button-assertive',
                cssClass: 'deleteProject'
            }).then(function(res) {
                if (res) {
                    $scope.sourceRepo.get(id).then(function(doc) {
                        return $scope.sourceRepo.remove(doc);
                    }).then(function(result) {
                        $scope.removeAnimate = true;
                        $scope.$apply();
                        for (var i = 0; i < $scope.project.sources.length; i++) {
                            if ($scope.project.sources[i]._id == result.id) {
                                $scope.project.sources.splice(i, 1);
                                $scope.$apply();
                                $scope.removeAnimate = false;
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

    // Scan
    $scope.fetchFromISBNdb = function(inputISBN) {
        if (navigator.onLine) {
            var loading = $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            $http({
                    method: "GET",
                    url: "http://isbndb.com/api/v2/json/YVFT6RLV/book/" + inputISBN
                })
                .then(function(response) { // Success
                    // alert(JSON.stringify(response));
                    if (!!response.data.error) {
                        loading.hide();
                        $translate(["PROJECT.DETAIL.POPUP.BOOK_UNAVAILABLE_TITLE", "PROJECT.DETAIL.POPUP.BOOK_UNAVAILABLE_TEXT"]).then(function (translations) {
                            $ionicPopup.alert({
                                title: translations["PROJECT.DETAIL.POPUP.BOOK_UNAVAILABLE_TITLE"],
                                template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.BOOK_UNAVAILABLE_TEXT"] + '</p>'
                            });
                        });
                    } else {
                        // Titre
                        $scope.newsource.title = response.data.data[0].title.replace(/\ufffd/g, "é");
                        // Publisher/Editor
                        $scope.newsource.editor = response.data.data[0].publisher_name.replace(/\ufffd/g, "é");
                        // Date de publication
                        if (!!response.data.data[0].edition_info && response.data.data[0].edition_info.match(/[0-9]{4}/)) {
                            var working_on_date = response.data.data[0].edition_info.match(/[0-9]{4}/);
                            $scope.newsource.publicationDate = response.data.data[0].edition_info.match(/[0-9]{4}/);
                        } else if (!!response.data.data[0].publisher_text && response.data.data[0].publisher_text.match(/[0-9]{4}/)) {
                            var working_on_date = response.data.data[0].publisher_text.match(/[0-9]{4}/);
                            $scope.newsource.publicationDate = response.data.data[0].publisher_text.match(/[0-9]{4}/);
                        } else {
                            var working_on_date = "";
                        }

                        // Lieu de publication
                        if (response.data.data[0].publisher_text != "") {
                            var working_on_location = response.data.data[0].publisher_text.replace(/\ufffd/g, "é");
                            working_on_location = working_on_location.replace(response.data.data[0].publisher_name, "");
                            working_on_location = working_on_location.replace(working_on_date, "");
                            working_on_location = working_on_location.replace(/[^a-zA-z\s]/g, "");
                            working_on_location = working_on_location.trim();
                            if (working_on_location != "") {
                                $scope.newsource.publicationLocation = working_on_location;
                            }
                        }
                        // Nombre de pages
                        if (response.data.data[0].physical_description_text != "") {
                            var arr_pages = response.data.data[0].physical_description_text.split(" ");
                            if (arr_pages.indexOf("p.") != -1) {
                                var indexOfPages = arr_pages.indexOf("p.") - 1;
                                $scope.newsource.pageNumber = arr_pages[indexOfPages];
                            } else if (arr_pages.indexOf("pages") != -1) {
                                var indexOfPages = arr_pages.indexOf("pages") - 1;
                                $scope.newsource.pageNumber = arr_pages[indexOfPages];
                            }
                        }

                        // Auteur
                        if (response.data.data[0].author_data.length) {
                            for (var i = 0; i < response.data.data[0].author_data.length; i++) {
                                if (response.data.data[0].author_data[i].name.split(",")[0] == response.data.data[0].author_data[i].name) {
                                    $scope.newsource["author" + String(i + 1) + "firstname"] = response.data.data[0].author_data[i].name.split(" ")[0].replace(/\ufffd/g, "é");
                                    $scope.newsource["author" + String(i + 1) + "lastname"] = response.data.data[0].author_data[i].name.split(" ")[1].replace(/\ufffd/g, "é");
                                } else {
                                    $scope.newsource["author" + String(i + 1) + "lastname"] = response.data.data[0].author_data[i].name.split(",")[0].replace(/\ufffd/g, "é");
                                    $scope.newsource["author" + String(i + 1) + "firstname"] = response.data.data[0].author_data[i].name.split(",")[1].replace(/\ufffd/g, "é");
                                }
                            }
                            var authorNum = response.data.data[0].author_data.length;
                            if (authorNum >= 1 && authorNum <= 3) {
                                $scope.newsource.hasAuthors = "13";
                            } else if (authorNum > 3) {
                                $scope.newsource.hasAuthors = "more3";
                            }
                        }

                        loading.hide();
                    }
                }, function(response) { // Failure
                    if (response.status == 408) {
                        loading.hide();
                        $translate(["PROJECT.DETAIL.POPUP.TIMEOUT_TITLE", "PROJECT.DETAIL.POPUP.TIMEOUT_TEXT", "PROJECT.DETAIL.POPUP.ADD", "PROJECT.DETAIL.POPUP.RETRY"]).then(function (translations) {
                            $ionicPopup.confirm({
                                title: translations["PROJECT.DETAIL.POPUP.TIMEOUT_TITLE"],
                                template: "<p class='center'>" + translations["PROJECT.DETAIL.POPUP.TIMEOUT_TEXT"] + "</p>",
                                okText: translations["PROJECT.DETAIL.POPUP.ADD"],
                                okType: "button-positive",
                                cancelText: translations["PROJECT.DETAIL.POPUP.RETRY"],
                                cancelType: "button-balanced button-outline"
                            }).then(function(res) {
                                if (res) {
                                    var creating = {
                                        isbn: inputISBN,
                                        date: new Date().toLocaleDateString()
                                    };
                                    $scope.pendingRepo.post(creating).then(function(responseRepo) {
                                        creating._id = responseRepo.id;
                                        creating._rev = responseRepo.rev;
                                        $scope.project.pendings.push(creating);
                                    });
                                    $scope.newSourceModal.hide();
                                } else {
                                    $scope.fetchFromISBNdb(inputISBN);
                                }
                            });
                        });
                    }
                });
        } else {
            $translate(["PROJECT.DETAIL.POPUP.NO_CONNECTION", "PROJECT.DETAIL.POPUP.ADD_TO_PENDINGS", "PROJECT.DETAIL.POPUP.RETRY", "PROJECT.DETAIL.POPUP.ADD"]).then(function (translations) {
                $ionicPopup.confirm({
                    title: translations["PROJECT.DETAIL.POPUP.NO_CONNECTION"],
                    template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.ADD_TO_PENDINGS"] + '</p>',
                    okText: translations["PROJECT.DETAIL.POPUP.ADD"],
                    okType: "button-positive",
                    cancelText: translations["PROJECT.DETAIL.POPUP.RETRY"],
                    cancelType: "button-outline button-balanced"
                }).then(function(res) {
                    if (res) {
                        var creating = {
                            isbn: inputISBN,
                            date: new Date().toLocaleDateString(),
                            project_id: $stateParams.projectID
                        };
                        $scope.pendingRepo.post(creating).then(function(responseRepo) {
                            creating._id = responseRepo.id;
                            creating._rev = responseRepo.rev;
                            $scope.project.pendings.push(creating);
                        });
                        $scope.newSourceModal.hide();
                    } else {
                        $scope.fetchFromISBNdb(inputISBN);
                    }
                });
            });
        }
    }

    $scope.scanBook = function() {
        // If boarding
        if (!Settings.get("scanBoardingDone")) {
            $scope.scanBoardingModal.show();
            $scope.boardingIndex = 0;
            return;
        } else {
            $scope.newsource.type = "book";
        }
        // If running
        if ($scope.currentlyScanning === true) {
            return;
        }
        else if (ionic.Platform.platforms.indexOf("browser") !== -1) {
            return;
        }
        else {
            $scope.currentlyScanning = true;
        }
        $ionicBackdrop.retain();
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                $ionicBackdrop.release();
                $scope.currentlyScanning = false;
                $scope.$apply();
                if (!result.cancelled) {
                    if (result.format == "EAN_13") {
                        $scope.fetchFromISBNdb(result.text);
                    } else {
                        $translate(["PROJECT.DETAIL.POPUP.BOOK_UNAVAILABLE_TITLE", "PROJECT.DETAIL.POPUP.NOT_RIGHT_BARCODE_TYPE"]).then(function (translations) {
                            $ionicPopup.alert({
                                title: translations["PROJECT.DETAIL.POPUP.BOOK_UNAVAILABLE_TITLE"],
                                template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.NOT_RIGHT_BARCODE_TYPE"] + '</p>'
                            });
                        });
                    }
                }
            },
            function(error) {
                $ionicBackdrop.release();
                $scope.currentlyScanning = false;
                $translate(["PROJECT.DETAIL.POPUP.UNABLE_TO_SCAN", "PROJECT.DETAIL.POPUP.UNABLE_TO_SCAN_TEXT"]).then(function (translations) {
                    $ionicPopup.alert({
                        title: translations["PROJECT.DETAIL.POPUP.UNABLE_TO_SCAN"],
                        template: '<p class="center">' + translations["PROJECT.DETAIL.POPUP.UNABLE_TO_SCAN_TEXT"] + '</p>'
                    });
                });
            }
        );
    }

    // Event handlers
    $scope.$on("$ionicView.afterEnter", function() {
        if ($scope.refreshID != null) {
            $scope.sourceRepo.get($scope.refreshID).then(function(result) {
                $scope.project.sources[$scope.refreshIndex] = result;
            });
            $scope.project.sources.sort(function(a, b) {
                if (a.title && b.title) {
                    return a.title.localeCompare(b.title);
                } else if (a.title) {
                    return a.title.localeCompare(b.parsedSource);
                } else if (b.title) {
                    return a.parsedSource.localeCompare(b.title);
                }
            });
        }

        if ($scope.refreshPending) {
            $scope.project.pendings = SharePendings.getPendings();
            $scope.project.sources = $scope.project.sources.concat(SharePendings.getSources());
            $scope.project.sources.sort(function(a, b) {
                if (a.title && b.title) {
                    return a.title.localeCompare(b.title);
                } else if (a.title) {
                    return a.title.localeCompare(b.parsedSource);
                } else if (b.title) {
                    return a.parsedSource.localeCompare(b.title);
                }
            });
        }

        $scope.isAdvanced = Settings.get("advanced");
    });

    $scope.$on('modal.hidden', function() {
        $scope.resetModalVars();
    });

    // Go to other view
    $scope.openSourceDetail = function(id) {
        for (var i = 0; i < $scope.project.sources.length; i++) {
            if ($scope.project.sources[i]._id == id) {
                var index = i;
                break;
            }
        }
        ShareSource.setSource($scope.project.sources[index]);
        $state.go('tab.source-detail', {
            projectID: $stateParams.projectID,
            sourceID: id
        });
        $scope.refreshID = id;
        $scope.refreshIndex = index;
    }

    $scope.openPendings = function() {
        SharePendings.setPendings($scope.project.pendings);
        $scope.refreshPending = true;
        $state.go('tab.pending', {
            projectID: $scope.project.id
        });
    }
});
