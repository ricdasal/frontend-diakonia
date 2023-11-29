import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): 
                Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

                  if(localStorage.getItem('ACCESS_TOKEN')){
                    return true
                  }else{
                    alert("No tienes autorización");
                    this.router.navigate(['/login'])
                    
                    return true      
                  }
  }

  hasUser(): boolean {
    return false;
  }

}



    // if(this.hasUser()){
    //   return true;
    // }
    // alert("No tienes autorización");
    // return false;