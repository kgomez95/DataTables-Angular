// Librerías.
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importaciones de shared.
import { DataTablesModule } from '@shared/datatables/datatables.module';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule
    ],
    exports: [
        DataTablesModule
    ]
})
export class SharedModule { }
