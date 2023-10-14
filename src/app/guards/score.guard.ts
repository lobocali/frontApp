import { CanActivateFn,Router } from '@angular/router';

export const scoreGuard: CanActivateFn = (route, state) => {
  const score = localStorage.getItem('score') || '';

  if(parseInt(score) > 30){
    return false;
  }
  return true;
};
