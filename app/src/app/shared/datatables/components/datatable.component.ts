// Librerías.
import { Component, Input, OnInit } from '@angular/core';

// Importaciones de datatables.
import { DataTableService } from '../services/datatable.service';

@Component({
    selector: 'app-datatables',
    templateUrl: '../pages/datatable.page.html'
})
export class DataTableComponent implements OnInit {

    @Input() service?: DataTableService;

    ngOnInit(): void {
        console.log('TODO :)');
    }
    
}
