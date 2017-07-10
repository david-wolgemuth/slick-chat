import { chatMessage } from './chat-message';

export const registerDirectives = (app) => {
  app.directive('chatMessage', () => chatMessage); 
};
