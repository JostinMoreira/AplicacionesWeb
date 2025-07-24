import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { HomeComponent } from "./components/home/home.component"
import { UsuariosComponent } from "./components/usuarios/usuarios.component"
import { PublicacionesComponent } from "./components/publicaciones/publicaciones.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "publicaciones", component: PublicacionesComponent },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
