import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo:'customer/products', pathMatch:'full'},
  {path: "customer", loadChildren:()=>import('./customer/customer.module')
  .then(mod=>mod.CustomerModule)}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
