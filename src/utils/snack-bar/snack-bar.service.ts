import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  mostrarSnackBar(message: string, action?: string, duracion?: number){
      this._snackBar.open(message, action ?? 'Aceptar',{duration: duracion ?? 4000 });
  }
}
