import { DeskController } from './DeskController';

export const deskApp = angular.module('deskApp', [
]);

deskApp
  .controller('DeskController', DeskController);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['deskApp']);
});
