/* Directives */

angular.module('springChat.directives', [])
	.directive('printMessage', function () {
	    return {
	    	restrict: 'A',
	        // template: '<span ng-show="message.priv">[private] </span><strong>{{message.username}}<span ng-show="message.to"> -> {{message.to}}</span></strong>{{message.time}}<br> {{message.message}}<br/>'
            template: '<strong>{{mySplit(message.username)}}</strong>  <span class="message-time">{{message.time}}</span><br/><span ng-bind-html="message.message"></span><br/>'
	       
	    };
	})
	.directive('printMessageAdmin', function () {
		return {
			restrict: 'A',
			// template: '<span ng-show="message.priv">[private] </span><strong>{{message.username}}<span ng-show="message.to"> -> {{message.to}}</span></strong>{{message.time}}<br> {{message.message}}<br/>'
			template: '<strong>{{message.username}}</strong>  <span class="message-time">{{message.time}}</span><br/><span ng-bind-html="message.message"></span><br/><a href="" class="message-remove" ng-click="sendMessageRemove(message.id)">Удалить</a><br/>'

		};
	})
    .directive('enterSubmit', function () {
        return {
            'restrict': 'A',
            'link': function (scope, elem, attrs) {

                elem.bind('keydown', function(event) {
                    var code = event.keyCode || event.which;

                    if (code === 13) {
                        if (!event.altKey && !event.shiftKey) {
                            event.preventDefault();
                            scope.$apply(attrs.enterSubmit);
                        }
                        else {
                            scope.startTyping();
						}
                    }
                });

            }
        };
    });

	// .directive('adsMessage', function () {
	// 	return {
	// 		restrict: 'A',
	// 		// template: '<span ng-show="message.priv">[private] </span><strong>{{message.username}}<span ng-show="message.to"> -> {{message.to}}</span></strong>{{message.time}}<br> {{message.message}}<br/>'
	// 		template: '<strong>{{message.username}}</strong>  <span class="message-time">{{message.time}}</span><br/><span ng-bind-html="message.message"></span><br/><a href="" class="message-remove" ng-click="sendMessageRemove(message.id)">Удалить</a><br/>'
    //
	// 	};
	// });