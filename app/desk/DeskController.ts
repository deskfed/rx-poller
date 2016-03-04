
export class DeskController {
  constructor ($scope, DeskPoller, $http) {
    $scope.foo = "hello world!!";
    
    // Create a new poller, passing in a promise as the action to perform every interval.
    var poller = new DeskPoller('JobsPoller',500,function fetchItem (lastModified:number) {
            return $http.get('/app/data/changes.json?updatedAt='+lastModified);
        });
    
    
    // var jobs = new DeskPoller('JobsPoller');
    // Observable configured to execute something at an interval.
    // BUT we never subscribe directly to jobs
    
    // var PollerJob = jobs.add($http())
    

    // PollerJob.subscribe()
    
    var unsubscribe;
    
    $scope.start = function() {
      console.log('starting');
      unsubscribe = poller.subscribe(data => {
        console.log('returned data',data);
      });
    }
    
    $scope.stop = function() {
        console.log('stopping');
        unsubscribe.dispose();
    }
  };
}