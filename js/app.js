var app = angular.module('lol', ['ui.router', 'ngVidBg', 'ngAudio', 'ngAnimate', 'lol.services', 'lol.controllers', 'lol.directives']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/title");

    $stateProvider
      .state('title', {
          url: "/title",
          templateUrl: "views/title.html",
          controller: 'titleCtrl'
      })
});