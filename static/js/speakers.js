angular.module('starter.speakers', ['starter.config'])

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
    .factory('Speaker', function ($http, $rootScope, HOST) {
        return {
            all: function() {
                return $http.get(HOST + '/speakers');
            },
            get: function(speakerId) {
                return $http.get(HOST + '/speakers/' + speakerId);
            }
        };
    })

    //Controllers
    .controller('SpeakerListCtrl', function ($scope, Speaker) {
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

    .controller('SpeakerCtrl', function ($scope, $stateParams, Speaker, HOST) {

        $scope.picturePath = HOST + '/pics/';
        Speaker.get($stateParams.speakerId).success(function(speaker) {
            $scope.speaker = speaker;
        });

    });
