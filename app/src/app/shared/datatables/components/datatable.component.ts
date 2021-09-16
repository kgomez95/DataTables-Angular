// Librerías.
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

// Importaciones de datatables.
import { DataTableService } from '../services/datatable.service';

@Component({
    selector: 'app-datatables',
    templateUrl: '../pages/datatable.page.html'
})
export class DataTableComponent implements OnInit {

    @Input() service?: DataTableService;
    public headers: string[] = [];
    public records: any = [];

    constructor(
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe,
        private percentPipe: PercentPipe
    ) { }

    ngOnInit(): void {
        this.recoverHeaders();
        this.recoverData();
    }

    /**
     * @name recoverHeaders
     * @description Llama al servicio correspondiente para recuperar la cabecera que se mostrará en la tabla.
     */
    public recoverHeaders(): void {
        if (this.service) {
            this.headers = this.service.recoverDataHeaders();
        }
        else {
            console.error('[recoverData] no se puede recuperar los datos, porque no hay servicio.');
        }
    }

    /**
     * @name recoverData
     * @description Llama al servicio correspondiente para recuperar los datos que se mostrarán en la tabla.
     */
    public recoverData(): void {
        if (this.service) {
            this.records = this.service.recoverData({});
            console.log(this.records);
        }
        else {
            console.error('[recoverData] no se puede recuperar los datos, porque no hay servicio.');
        }
    }

    /**
     * @name getValue
     * @description Coge el valor formateado dependiendo del tipo de campo.
     * @param record - Registro a mostrar en la columna.
     * @returns Retorna el valor formateado para la columna.
     */
    public getValue(record: any): any {
        if (record) {
            switch (record.type) {
                case 'string':
                    return record.value;
                case 'integer':
                    return this.decimalPipe.transform(record.value, undefined, 'es');
                case 'decimal':
                    return this.decimalPipe.transform(record.value, '1.2-2', 'es');
                case 'currency':
                    return this.currencyPipe.transform(record.value, 'EUR', true, '1.2-2', 'es');
                case 'percentage':
                    return this.percentPipe.transform(record.value, '1.2-2', 'es');
                case 'datetime':
                    return this.datePipe.transform(record.value, 'dd/MM/yyyy HH:mm:ss', undefined, 'es');
                default:
                    return record.value;
            }
        }
        else return '';
    }

}
