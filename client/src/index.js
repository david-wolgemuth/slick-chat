import * as angular from 'angular';
import { registerFactories } from './factories';
import { registerControllers } from './controllers';

const app = angular.module('slickApp', []);
registerFactories(app);
registerControllers(app);
