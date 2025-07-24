import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { ReactiveFormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { UsuariosComponent } from "./components/usuarios/usuarios.component"
import { PublicacionesComponent } from "./components/publicaciones/publicaciones.component"
import { HomeComponent } from "./components/home/home.component"

@NgModule({
  declarations: [AppComponent, UsuariosComponent, PublicacionesComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
