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

    public headers: any[] = [];
    public records: any[] = [];
    public filters: any = {};

    public sortRecord: any = {
        field: '',
        asc: true,
        desc: false
    };
    public basicNameFilters: string = '';
    public basicFilter: string = '';
    public showAdvancedFilters: boolean = false;

    constructor(
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe,
        private percentPipe: PercentPipe
    ) { }

    ngOnInit(): void {
        this.recoverHeaders();
        this.recoverFilters();
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
            console.error('[recoverHeaders] no se puede recuperar las cabeceras, porque no hay servicio.');
        }
    }

    /**
     * @name recoverData
     * @description Llama al servicio correspondiente para recuperar los datos que se mostrarán en la tabla.
     */
    public recoverData(): void {
        if (this.service) {
            this.records = this.service.recoverData(this.basicFilter, {}, this.sortRecord);
            console.log(this.records);
        }
        else {
            console.error('[recoverData] no se puede recuperar los datos, porque no hay servicio.');
        }
    }

    /**
     * @name recoverFilters
     * @description Recupera los filtros que se mostrarán en la tabla.
     */
    public recoverFilters(): void {
        if (this.service) {
            this.filters = this.service.recoverFilters();

            // NOTE: Una vez recuperados los filtros contruimos el placeholder para los filtros básicos.
            this.buildBasicFilters();
        }
        else {
            console.error('[recoverFilters] no se puede recuperar los filtros, porque no hay servicio.');
        }
    }

    /**
     * @name sort
     * @description Guarda la ordenación que seleccione el usuario en la tabla.
     * @param field {string}: Campo de la cabecera a ordenar.
     */
    public sort(field: string): void {
        if (this.sortRecord.field === field) {
            this.sortRecord.asc = !this.sortRecord.asc;
            this.sortRecord.desc = !this.sortRecord.desc;
        }
        else {
            this.sortRecord.field = field;
            this.sortRecord.asc = true;
            this.sortRecord.desc = false;
        }

        this.recoverData();
    }

    /**
     * @name clearFilters
     * @description Inicializa los filtros a su estado original.
     */
    public clearFilters(): void {
        this.basicFilter = '';

        // TODO: Inicializar los filtros avanzados a su estado original.
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
                    // NOTE: Para que no salgan advertencias en la consola se ha cambiado el tercer parámetro, poniendo un "undefined" en vez de "true".
                    return this.currencyPipe.transform(record.value, 'EUR', undefined, '1.2-2', 'es');
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

    /**
     * @name buildBasicFilters
     * @description Construye el apartado de filtros básicos.
     */
    private buildBasicFilters(): void {
        let bf = [];

        for (let i = 0; i < this.filters.basic.length; i++) {
            bf.push(this.filters.basic[i].name);
        }

        this.basicNameFilters = bf.join(', ');
    }

}
