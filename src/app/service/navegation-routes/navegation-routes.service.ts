import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavegationRoutesService {

  constructor(private router: Router) { }

  navigateTo(segments: string[]) {
    const url = '/' + segments.filter(Boolean).join('/');
    this.router.navigateByUrl(url);
  }
}
