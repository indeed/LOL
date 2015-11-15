var module = angular.module('lol.directives', []);

module.directive('preventRightClick', [

function () {
    return {
        restrict: 'A',
        link: function ($scope, $ele) {
            $ele.bind("contextmenu", function (e) {
                e.preventDefault();
            });
        }
    };
}
])