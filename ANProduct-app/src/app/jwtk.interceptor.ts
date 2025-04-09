import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export const jwtkInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
