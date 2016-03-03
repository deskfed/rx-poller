
export class DeskController {
  constructor ($scope, DeskPoller) {
    $scope.foo = "hello world!!";
    
    var poller = new DeskPoller(5000);
    
    
    var jobs = new DeskPoller('JobsPoller');
    // Observable configured to execute something at an interval.
    // BUT we never subscribe directly to jobs
    
    // var PollerJob = jobs.add($http())
    

    // PollerJob.subscribe()

    poller.subscribe(data => {
       console.log('returned data',data);
    });
  };
}