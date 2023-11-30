import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "src/app/servises/auth.service";
import { UserService } from "src/app/servises/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private user: UserService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.user.getUserByToken().pipe(
      switchMap(user => {
        const userRole = user.role_id;

        if (userRole !== 3) {
          this.router.navigate(['/']); // Перенаправить на главную страницу
          return of(false); // Пользователь не имеет доступа
        }

        return of(true); // Пользователь имеет необходимую роль
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }
}
