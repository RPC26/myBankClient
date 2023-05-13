import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true
};
export const BASE_URL = "https://mybankserver-production.up.railway.app"

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  withCredentials: true
};