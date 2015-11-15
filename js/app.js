$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#fff",
        backgroundColor: "#111",
        barHeight: 2,
        fadeOutTime: 1000
    });
});

var app = angular.module('lol', ['ui.router', 'ngVidBg', 'ngAudio', 'lol.services', 'lol.directives'])

.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/title");

    $stateProvider
      .state('title', {
          url: "/title",
          templateUrl: "views/title.html",
          controller: 'titleCtrl'
      })
});

app.controller('mainCtrl', function ($scope) {

});

app.controller('titleCtrl', function ($scope, ngAudio) {

    $scope.ambient = ngAudio.load("media/titleambient.mp3");
    $scope.ambient.volume = 0.3;
    $scope.ambient.play();

    $scope.bg = {
        resources: [
            'media/titlebg.webm',
        ],
        poster: 'http://placehold.it/2000&text=you%20may%20want%20to%20have%20a%20poster',
        fullScreen: true,
        muted: true,
        zIndex: '-100',
        pausePlay: false
    }

    $scope.start = function () {
        $scope.started = true;
        $scope.ambient.stop();
    }

});