myApp.provider('storyProvider', function(){
    var tasks1 = [
        {id:1, title:'Task 1', assignedTo: 'Moloko Mamogale', order: 0, status: TaskStatus.todo, effort: '1 hour'},
        {id:2, title:'Task 2', assignedTo: 'Moloko Mamogale', order: 1, status: TaskStatus.todo, effort: '2 hours'},
        {id:3, title:'Task 3', assignedTo: 'Moloko Mamogale', order: 0, status: TaskStatus.inProgress, effort: '3 hours'},
        {id:4, title:'Task 4', assignedTo: '', order: 0, status: TaskStatus.backlog, effort: '4 hours'},
        {id:5, title:'Task 5', assignedTo: 'Moloko Mamogale', order: 0, status: TaskStatus.done, effort: '5 hours'},
        {id:6, title:'Task 6', assignedTo: 'Moloko Mamogale', order: 1, status: TaskStatus.done, effort: '6 hours'},
        {id:7, title:'Task 7', assignedTo: 'Moloko Mamogale', order: 2, status: TaskStatus.done, effort: '7 hours'},
        {id:8, title:'Task 8', assignedTo: 'Moloko Mamogale', order: 3, status: TaskStatus.done, effort: '8 hours'}
    ];
	
    var stories = [
        {id: 1, title: 'User story #1', tasks: tasks1}
    ];

    return {
        $get: function() {
            return stories;
        }
    }
});

myApp.service('storiesService', function (storyProvider) {
    var self = this;
    self.stories = function() {
        return storyProvider;
    }
});

myApp.service('tasksService', function (storyProvider) {
    var self = this;
    self.tasks = function (storyId) {
        var stories = storyProvider;
        var tasks = _.findWhere(stories, {id: storyId}).tasks;
        return tasks;
    }

    self.addTask = function (storyId, nwTask) {
	   if(typeof(nwTask.name) != 'undefined' && nwTask.name != '' && typeof(nwTask.effort) != 'undefined' && nwTask.effort != '')
	   {
			var tasks = self.tasks(storyId);
			var nwId = tasks.length + 1;
			tasks.push({
				id: nwId, title: nwTask.name, effort: nwTask.effort, assignedTo: '', status: TaskStatus.backlog
			});
			return true;
	   }
	   else{
		   alert('Please note all fields are required.');
		   return false;
	   }
    }
	
    self.deleteTask = function (storyId, taskId) {
        var tasks = self.tasks(storyId);
        var indexToRemove = 0;
        angular.forEach(tasks, function (task) {
            if (task.id === taskId) {
                tasks.splice(indexToRemove, 1);
                return true;
            }
            indexToRemove ++;
        });
        return false;
    }
})