import {Observable} from 'rx';

// 1. Pass in the action to be taken & interval
// 1.5 Allow pollers to have a name
// 2. Return something that can paused and restarted
// 2.5 Make sure we can destroy a poller
// 3. Ability to do DeskPoller.get('Name') to return the existing poller
// 4. Retry logic (retry(3))
// 5. Exponential Backoff




// $http will be injected with Angular
export const DeskPoller = function ($http) {
  return class DeskPoller {
    
    constructor (frequency: number, url: string) {
        function fetchItem (lastModified) {
            return Observable.fromPromise($http.get('/app/data/changes.json?updatedAt='+lastModified))
        }
        var modifiedSinceInitValue = Date.now();
        var polling_frequency = 5000;
        var initial_state = {modifiedSince: modifiedSinceInitValue, itemArray : []}
        function max(property) {
            return function (acc, current) {
                acc = current[property] > acc ? current[property] : acc;
            }
        }
        return Observable.return(initial_state)
        .expand (function(state){
            return fetchItem(state.modifiedSince)
                .toArray()
                .combineLatest(Observable.interval(polling_frequency).take(1), 
                    function (itemArray, _) {
                    return {
                        modifiedSince : itemArray.reduce(max('updatedAt'), modifiedSinceInitValue), 
                        itemArray : itemArray
                    }
                }
              )
            });
    }
    
  }

}
