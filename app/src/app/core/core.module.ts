// Librerías.
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Importaciones de core.
import { DefaultLayoutComponent } from './layouts/default/default-layout.component'

// Importaciones de shared.
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        HttpClientModule
    ],
    declarations: [
        DefaultLayoutComponent
    ],
    providers: [],
    exports: []
})

export class CoreModule { }
