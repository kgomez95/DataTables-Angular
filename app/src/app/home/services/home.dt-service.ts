// Librerías.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importaciones de shared.
import { DataTableService } from '@shared/datatables/services/datatable.service';

@Injectable()
export class HomeDtService implements DataTableService {

    private records: any = [];

    constructor() {

        // NOTE: Los tipos de campos tendrían que estar en una clase de constantes (ahora están puestos directamente para probar).

        for (let i = 1; i <= 100; i++) {
            this.records.push([
                { code: 'id', type: 'integer', value: i },
                { code: 'name', type: 'string', value: `Nombre ${i}` },
                { code: 'description', type: 'string', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
                { code: 'salary', type: 'currency', value: (Math.floor(Math.random() * (300000 - 100) + 100) / 100) },
                { code: 'decimal', type: 'decimal', value: (Math.floor(Math.random() * (10000000 - 100) + 100) / 100) },

                // NOTE: El porcentaje tiene que ser un número entre 0 y 1.
                { code: 'percentage', type: 'percentage', value: (Math.floor(Math.random() * (10000 - 10) + 10) / 10000) },

                // NOTE: La fecha que recibamos desde el servidor estará en UTC.
                { code: 'created_at', type: 'datetime', value: this.randomDate(new Date('2000-01-01'), new Date(), 0, 23) }
            ]);
        }
    }

    /**
     * @name randomDate
     * @description Función para generar fecha aleatoria (su única función en este caso es generar los datos de prueba).
     * @param start - Fecha de inicio de rango.
     * @param end - Fecha de fin de rango.
     * @param startHour - Hora de inicio de rango (entre 0 y 23).
     * @param endHour - Hora de fin de rango (entre 0 y 23).
     * @returns Retorna una fecha generada aleatoriamente.
     */
    private randomDate(start: any, end: any, startHour: any, endHour: any): Date {
        var date = new Date(+start + Math.random() * (end - start));
        var hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        return date;
    }

    /**
     * @name recoverData
     * @description Llama al servicio correspondiente para recuperar los datos que se mostrarán en la tabla.
     * @returns Retorna los datos para mostrar en la tabla.
     */
    public recoverData(basicFilter: string, advancedFilters: any, offset: number, limit: number, sort: any): any {
        let result: any[] = [];
        let aux: any[] = [];
        let totalPages: number = 0;
        let totalRecords: number = 0;

        this.records.forEach((record: any) => {
            result.push(record);
        });

        if (basicFilter) {
            // NOTE: Pequeña chapuza para simular que hacemos la llamada a un servicio para realizar un filtro básico.
            result.forEach((record: any) => {
                let id = record.find((x: any) => x.code === 'id');
                let name = record.find((x: any) => x.code === 'name');
                let description = record.find((x: any) => x.code === 'description');

                if (id.value == basicFilter || name.value.indexOf(basicFilter) > -1 || description.value.indexOf(basicFilter) > -1) {
                    aux.push(record);
                }
            });
            result = aux;
        }

        // NOTE: Gran chapuza para simular que hacemos la llamada a un servicio para realizar los filtros avanzados.
        if (advancedFilters && advancedFilters.length > 0) {
            aux = [];
            let update: boolean = false;

            advancedFilters.forEach((filter: any) => {
                let record: any;

                if (filter.value != filter.defaultValue || (filter.from != filter.defaultFrom && filter.to != filter.defaultTo) || (filter.from !== filter.defaultFrom && filter.to !== filter.defaultTo)) {
                    update = true;

                    if (filter.isRange) {
                        record = result.filter((x: any) => x.find((y: any) => y.code === filter.code && ((y.value >= filter.from && y.value <= filter.to) || (y.type === 'datetime' && y.value >= new Date(filter.from) && y.value <= new Date(filter.to)))));
                        record.forEach((element: any) => {
                            aux.push(element);
                        });
                    }
                    else {
                        record = result.find((x: any) => x.find((y: any) => y.code === filter.code && ((y.value == filter.value) || (y.type === 'datetime' && y.value >= new Date(filter.value) && y.value.setDate(y.value.getDate() - 1) <= new Date(filter.value)))));
                        aux.push(record);
                    }
                }
            });

            if (update) result = aux;
        }

        if (sort && sort.field) {
            // NOTE: Pequeña chapuza para simular que hacemos la llamada a un servicio y poder coger los valores ordenados.
            result = result.sort(function (a: any, b: any) {
                let aElement = undefined;
                let bElement = undefined;

                aElement = a.find((x: any) => x.code === sort.field);
                bElement = b.find((x: any) => x.code === sort.field);

                if (aElement.value > bElement.value) {
                    return (sort.asc === true) ? 1 : -1;
                }
                else if (aElement.value < bElement.value) {
                    return (sort.asc === true) ? -1 : 1;
                }
                else {
                    return 0;
                }
            });
        }

        // NOTE: Calculamos el total de páginas.
        totalPages = Math.ceil(result.length / limit);

        // NOTE: Cogemos la cantidad total de registros a mostrar.
        totalRecords = result.length;

        return {
            data: {
                records: result.slice(offset, offset + limit),
                actions: {
                    create: true,
                    delete: true,
                    update: true,
                    view: true
                }
            },
            totalPages,
            totalRecords
        };
    }

    /**
     * @name recoverDataHeaders
     * @description Recupera las cabeceras que se mostrarán en la tabla.
     * @returns Retorna las cabecerás para mostrar en la tabla.
     */
    public recoverDataHeaders(): any[] {
        return [
            { code: 'id', value: '#' },
            { code: 'name', value: 'Nombre' },
            { code: 'description', value: 'Descripción' },
            { code: 'salary', value: 'Salario' },
            { code: 'decimal', value: 'Decimal' },
            { code: 'percentage', value: 'Porcentaje' },
            { code: 'created_at', value: 'Fecha de creación' }
        ];
    }

    /**
     * @name recoverFilters
     * @description Recupera los filtros que se mostrarán en la tabla.
     * @returns Retorna los filtros para mostrar en la tabla.
     */
    public recoverFilters(): any {
        return {
            basic: [
                { code: 'id', name: 'Identificador' },
                { code: 'name', name: 'Nombre' },
                { code: 'description', name: 'Descripción' }
            ],
            advanced: [
                {
                    code: 'salary',
                    name: 'Salario',
                    type: 'currency',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: false,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'decimal',
                    name: 'Decimal',
                    type: 'decimal',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: false,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'decimal',
                    name: 'Rango de decimal',
                    type: 'decimal',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: true,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'salary',
                    name: 'Rango de salario',
                    type: 'currency',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: true,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'percentage',
                    name: 'Porcentaje',
                    type: 'percentage',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: false,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'percentage',
                    name: 'Rango de porcentaje',
                    type: 'percentage',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: true,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'created_at',
                    name: 'Fecha de creación',
                    type: 'datetime',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: false,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                },
                {
                    code: 'created_at',
                    name: 'Fecha de creación',
                    type: 'datetime',
                    value: '',
                    from: '', //2021-02-02
                    to: '',  //2021-02-03
                    isRange: true,
                    defaultValue: '',
                    defaultFrom: '',
                    defaultTo: ''
                }
            ]
        };
    }

    /**
     * @name createRecord
     * @description Abre la pantalla para crear un registro.
     */
    public createRecord(): void {
        console.log('Crear nuevo registro.');
        throw new Error('Method not implemented.');
    }

    /**
     * @name openRecord
     * @description Abre la pantalla para visualizar el registro seleccionado.
     * @param id - Identificador del registro a visualizar.
     */
    public openRecord(id: number): void {
        console.log(`Abrir registro '${id}'.`);
        throw new Error('Method not implemented.');
    }

    /**
     * @name openUpdateView
     * @description Abre la pantalla para actualizar el elemento seleccionado.
     * @param id - Identificador del registro a actualizar.
     */
    public openUpdateView(id: number): void {
        console.log(`Actualizar registro '${id}'.`);
        throw new Error('Method not implemented.');
    }

    /**
     * @name deleteRecord
     * @description Elimina el registro seleccionado.
     * @param id - Identificador del registro a borrar.
     */
    public deleteRecord(id: number): Observable<any> {
        console.log(`Eliminar registro '${id}'.`);
        throw new Error('Method not implemented.');
    }
}
