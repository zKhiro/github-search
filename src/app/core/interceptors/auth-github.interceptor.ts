import { HttpInterceptorFn } from '@angular/common/http';


export const authGithubInterceptor: HttpInterceptorFn = (req, next) => {
  const requestWithToken = req.clone({
    headers: req.headers.set('Authorization', '')
  });

  return next(requestWithToken);
};
