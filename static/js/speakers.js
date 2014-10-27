angular.module('conference.speakers', ['conference.config'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.speakers', {
                url: "/speakers",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/speakers.html",
                        controller: "SpeakerListCtrl"
                    }
                }
            })

            .state('app.speaker', {
                url: "/speakers/:speakerId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/speaker.html",
                        controller: "SpeakerCtrl"
                    }
                }
            })

    })

    // Services
    .factory('Speaker', function ($http, $rootScope, SERVER_PATH) {
        return {
            all: function() {
                return $http.get(SERVER_PATH + '/speakers');
            },
            get: function(speakerId) {
                return $http.get(SERVER_PATH + '/speakers/' + speakerId);
            }
        };
    })

    //Controllers
    .controller('SpeakerListCtrl', function ($scope, Speaker, SERVER_PATH) {
        $scope.serverPath = SERVER_PATH;
        $scope.speakers = [];
        Speaker.all().success(function(speakers) {
            $scope.speakers = speakers;
        });
        $scope.doRefresh = function() {
            $scope.speakers = Speaker.all().success(function(speakers) {
                $scope.speakers = speakers;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })

    .controller('SpeakerCtrl', function ($scope, $stateParams, Speaker, SERVER_PATH) {
        $scope.serverPath = SERVER_PATH;
        Speaker.get($stateParams.speakerId).success(function(speaker) {
            $scope.speaker = speaker;
        });
    });
