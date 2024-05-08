import { HttpInterceptorFn } from '@angular/common/http';


export const authGithubInterceptor: HttpInterceptorFn = (req, next) => {
  const requestWithToken = req.clone({
    headers: req.headers.set('Authorization', import.meta.env.NG_APP_GH_AUTH),
  });

  return next(requestWithToken);
};
