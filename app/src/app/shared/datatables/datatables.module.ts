// Librerías.
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Importaciones de datatables.
import { DataTableComponent } from './components/datatable.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbCollapseModule
    ],
    declarations: [
        DataTableComponent
    ],
    exports: [
        DataTableComponent
    ],
    providers: [
        CurrencyPipe,
        DatePipe,
        DecimalPipe,
        PercentPipe
    ]
})

export class DataTablesModule { }