import * as angular from 'angular';
import * as ngRoute from 'angular-route';
import { registerFactories } from './factories';
import { registerControllers } from './controllers';
import { registerDirectives } from './directives';
import { routes } from './routes';

require('./partials/login.html');

const app = angular.module('slickApp', ['ngRoute']);
routes(app);
registerFactories(app);
registerControllers(app);
registerDirectives(app);
