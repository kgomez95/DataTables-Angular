// Librerías.
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { UUID } from 'angular2-uuid';

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
    public actions: any = {
        create: false,
        delete: false,
        update: false,
        view: false
    };

    public sortRecord: any = {
        field: '',
        asc: true,
        desc: false
    };
    public basicNameFilters: string = '';
    public basicFilter: string = '';
    public showAdvancedFilters: boolean = false;

    public items: number = 0;
    public page: number = 1;
    public totalRecords: number = 0;
    public totalPages: number = 1;
    public pagination: number[] = [];

    // NOTE: Este GUID es para asignarlo a los identificadores que se creen en el datatable.page.html, ya que este componente datatable puede estar
    //       dos o más instancias a la vez en una misma pantalla. Por tanto, nos interesa que no haya identificadores repetidos.
    public guid: string = '_' + UUID.UUID();

    constructor(
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe,
        private percentPipe: PercentPipe
    ) { }

    ngOnInit(): void {
        this.items = 5;
        this.page = 1;
        this.totalPages = 1;
        this.totalRecords = 0;
        this.pagination = [this.page];

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
            this.isValidPagination();

            // NOTE: Recuperamos los datos.
            console.log(this.filters);
            let response = this.service.recoverData(this.basicFilter, this.filters.advanced, (this.items * (this.page - 1)), parseInt(this.items.toString()), this.sortRecord);
            this.records = response.data.records;
            this.actions = response.data.actions;
            console.log(this.records);

            // NOTE: Calculamos el total de páginas
            this.totalRecords = response.totalRecords;
            this.totalPages = response.totalPages;
            this.buildPagination();

            if (!this.isValidPagination()) {
                this.recoverData();
            }
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
        this.filters.advanced.forEach((filter: any) => {
            filter.value = filter.defaultValue;
            filter.from = filter.defaultFrom;
            filter.to = filter.defaultTo;
        });
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
     * @name selectPage
     * @description Selecciona la página que reciba por parámetro.
     * @param page {number}: Número de página a seleccionar.
     */
    public selectPage(page: number): void {
        this.page = page;
        this.buildPagination();
        this.recoverData();
    }

    /**
     * @name hasRecordActions
     * @description Comprueba si los registros de la tabla tienen disponibles acciones para realizar.
     * @returns Retorna "true" si los registros tienen acciones o "false" en caso de que no tenga acciones.
     */
    public hasRecordActions(): boolean {
        return (this.actions && (this.actions.delete || this.actions.update || this.actions.view));
    }

    /**
     * @name createRecord
     * @description Abre la pantalla para crear un registro.
     */
    public createRecord(): void {
        if (this.service) {
            this.service.createRecord();
        }
        else {
            console.error('[createRecord] no se puede crear un nuevo registro, porque no hay servicio.');
        }
    }

    /**
     * @name openRecord
     * @description Abre la pantalla para visualizar el registro seleccionado.
     * @param record - Registro a abrir.
     */
    public openRecord(record: any): void {
        if (this.service) {
            let id: number = this.recoverRecordId(record);
            this.service.openRecord(id);
        }
        else {
            console.error('[openRecord] no se puede abrir el registro, porque no hay servicio.');
        }
    }

    /**
     * @name updateRecord
     * @description Abre la pantalla para actualizar el elemento seleccionado.
     * @param record - Registro a actualizar.
     */
    public updateRecord(record: any): void {
        if (this.service) {
            let id: number = this.recoverRecordId(record);
            this.service.openUpdateView(id);
        }
        else {
            console.error('[updateRecord] no se puede actualizar el registro, porque no hay servicio.');
        }
    }

    /**
     * @name deleteRecord
     * @description Elimina el registro seleccionado.
     * @param record - Registro a eliminar.
     */
    public deleteRecord(record: any): void {
        if (this.service) {
            let id: number = this.recoverRecordId(record);
            this.service.deleteRecord(id);
        }
        else {
            console.error('[deleteRecord] no se puede eliminar el registro, porque no hay servicio.');
        }
    }

    /**
     * @name recoverRecordId
     * @description Recupera el identificador del registro proporcionado.
     * @param record - Registro a buscar su identificador.
     * @returns Retorna el identificador del registro o una excepción.
     */
    private recoverRecordId(record: any): number {
        let field: any = record.find((x: any) => x.code === 'id');

        if (field) return field.value;
        else throw new Error('[recoverRecordId] no se puede eliminar el registro, porque no se encuentra su identificador.');
    }

    /**
     * @name buildPagination
     * @description Construye la paginación para poder visualizarla en la página.
     */
    private buildPagination(): void {
        let plusPages = this.page + 3;
        let lessPages = this.page - 2;
        let diff = 0;

        this.pagination = [];

        if (lessPages < 1) {
            plusPages = plusPages + (1 - lessPages);
            lessPages = 1;
        }

        if (plusPages > this.totalPages) {
            diff = plusPages - this.totalPages;

            if (lessPages > diff - 1) {
                lessPages = lessPages - diff + 1;
            }
            else if (lessPages === diff - 1) {
                lessPages = lessPages - diff + 2;
            }

            plusPages = this.totalPages + 1;
        }

        for (let i = lessPages; i < this.page; i++) {
            this.pagination.push(i);
        }

        for (let i = this.page; i < plusPages; i++) {
            this.pagination.push(i);
        }
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

    /**
     * @name isValidPagination
     * @description Comprueba si la paginación es correcta o no.
     */
    private isValidPagination(): boolean {
        // NOTE: En caso de que el usuario cambie la cantidad de registros a mostrar en pantalla tenemos que comprobar si la página actual
        //       ya no se encontrará disponible después de recuperar los datos. Si es así entonces asignamos la última página.
        let pageCheck = Math.ceil(this.totalRecords / this.items);
        if (this.totalRecords > 0 && pageCheck < this.page) {
            this.page = pageCheck;
            return false;
        }
        else return true;
    }

}
