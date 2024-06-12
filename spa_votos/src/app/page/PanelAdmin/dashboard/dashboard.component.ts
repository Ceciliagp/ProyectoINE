import { Component, OnInit } from '@angular/core';
import { MRol, MUsuario } from '../../../models/MUsuario';
import { AdministradorService } from '../../../service/Admin/administrador.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  mUsuario: MUsuario | undefined;
  mRol: MRol | undefined;
  esPartidos = false;
  esDashBoard = true;
  esFuncionario = false;
  esCrearFuncionario = false;

  constructor(private _adminService: AdministradorService) {}

  ngOnInit(): void {
    this.mUsuario = this._adminService.getUsuarioFromStorage();

    if (this.mUsuario === undefined) {
      this.GoToBack();
      return;
    }

    this.mRol = this.mUsuario.rol;
    this.esFuncionario = this.mRol?.rol === 'FUNCIONARIO';
  }

  GoToBack() {
    window.history.back();
  }

  onClicListPartidos() {
    this.esPartidos = true;
    this.esDashBoard = false;
    this.esCrearFuncionario = false;
  }

  onClicListFuncionarioCasilla() {
    this.esPartidos = false;
    this.esDashBoard = false;
    this.esCrearFuncionario = true;
  }

  onClicListDashBoard() {
    this.esPartidos = false;
    this.esDashBoard = true;
    this.esCrearFuncionario = false;
  }
}
