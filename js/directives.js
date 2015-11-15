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
]);

module.directive('elemReady', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.ready(function () {
                $scope.$apply(function () {
                    var func = $parse(attrs.elemReady);
                    func($scope);
                })
            })
        }
    }
})