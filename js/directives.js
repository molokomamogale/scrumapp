myApp.directive('story', function () {
    return {
        restrict: 'E',
        scope: {
            storyId: '=id',
            tasks: '=',
            title: '='
        },
        templateUrl: 'directives/story.html',
        link: function (scope, element, attrs) { }
    }
});

myApp.directive('taskStatus', function ($log) {
    return {
        restrict: 'E',
        scope: {
            tasks: '=',
            status: '=',
            title: '='
        },
        templateUrl: 'directives/task-status.html',
        link: function (scope, element, attrs) {
            scope.storyId = scope.$parent.storyId;
            var updateOrder = function() {
                angular.forEach($('task-status task'), function(element) {
                    var task = _.findWhere(scope.$parent.tasks, {id: parseInt(element.id)});
                    if (task) {
                        task.order = $(element).closest('li').index();
                    }
                });
            }
			
            var updateTask = function(event, ui) {
				var id = parseInt($('task', ui.item).attr('id'));
				var task = _.findWhere(scope.$parent.tasks, {id: id});

				var oldState = task.status;					
				task.status = scope.status;
				
				if (task.status === TaskStatus.backlog) {
					task.assignedTo = '';
				} 
				
				if (oldState === 'backlog' && task.status === TaskStatus.todo) {
					var assignedTo = prompt("Please enter your name", "Moloko Mamogale");					
					if(assignedTo === ''){	
						task.assignedTo = 'Moloko Mamogale';
					}
					else{
						task.assignedTo = assignedTo;
					}
				}
				
				updateOrder();
				scope.$parent.$digest();
				
            }
			
            $('.task-items', element).sortable({
                placeholder: 'ui-state-highlight',
                forcePlaceholderSize: false,
                connectWith: '.task-items',
                dropOnEmpty: true,
                tolerance: 'intersect',
                receive: updateTask,
                change: updateOrder
            });
        }
    };
});

myApp.directive('task', function (tasksService) {
    return {
        restrict: 'E',
        scope: {
            task: '='
        },
        link:function (scope, element, attrs) {
            scope.storyId = scope.$parent.storyId;
            scope.deleteTask = function(taskId) {
                tasksService.deleteTask(scope.storyId, taskId);
            }
        }
    };
});