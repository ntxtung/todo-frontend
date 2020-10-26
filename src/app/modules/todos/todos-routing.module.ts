import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosMainComponent } from './components/todos-main/todos-main.component';

const routes: Routes = [
  {
    path: '',
    component: TodosMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}
