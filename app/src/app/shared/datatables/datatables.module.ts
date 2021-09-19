// Librerías.
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

// Importaciones de datatables.
import { DataTableComponent } from './components/datatable.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbCollapseModule,
        CurrencyMaskModule
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
