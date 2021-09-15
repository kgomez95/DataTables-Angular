// Librerías.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones de home.
import { HomeComponent } from './components/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { current: 'home' }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class HomeRoutingModule { }
