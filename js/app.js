var TaskStatus = {
	backlog: 'backlog',
    todo: 'todo',
    inProgress: 'in-progress',    
    done: 'done'
};

var Titles = {
	backlog: 'Backlog',
    todo: 'To Do',
    inProgress: 'In Progress',    
    done: 'Done'
};

var myApp = angular.module('scrum', []);

myApp.controller('StoryController', ['$scope', '$filter', 'storiesService', function ($scope, $filter, storiesService) {
    $scope.stories = storiesService.stories();
}]);

myApp.controller('TaskController', ['$scope', '$filter', 'tasksService', function ($scope, $filter, tasksService) {
    $scope.tasks = tasksService.tasks($scope.storyId);

    $scope.$watch('tasks', function (newValue, oldValue) {
        setFilteredTaskViews();
    }, true);
		
    $scope.statuses = TaskStatus;
    $scope.titles = Titles;
	
    setFilteredTaskViews();		

    function setFilteredTaskViews() {
        var sortedTasks = _.sortBy($scope.tasks, 'order');
        function filterByStatus(statusFilter) {
            return $filter('filter')(sortedTasks, function(element) {
                var matchesFilter = element.status === statusFilter;
                return matchesFilter;
            });
        }
		
		$scope.backlogTasks = filterByStatus(TaskStatus.backlog);
        $scope.todoTasks = filterByStatus(TaskStatus.todo);        
        $scope.inProgressTasks = filterByStatus(TaskStatus.inProgress);
        $scope.doneTasks = filterByStatus(TaskStatus.done);
    }
	
    $scope.addTask = function (nwTask) {
        if(nwTask != null) {
            if (tasksService.addTask($scope.storyId, nwTask)) {
                resetForm();
            }
        }
    };
	
    function resetForm () {
        $scope.nwTask = null;
    };
}]);