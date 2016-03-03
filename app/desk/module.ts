import { DeskController } from './DeskController';
import { DeskPoller } from './DeskPoller';

export const deskApp = angular.module('deskApp', [
]);

deskApp
  .controller('DeskController', DeskController)
  .factory('DeskPoller', DeskPoller);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['deskApp']);
});
