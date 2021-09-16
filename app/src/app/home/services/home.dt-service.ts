// Librerías.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importaciones de shared.
import { DataTableService } from '@shared/datatables/services/datatable.service';

@Injectable()
export class HomeDtService implements DataTableService {

    constructor() { }

    private records: any = [
        [
            { code: 'id', type: 'integer', value: 1 },
            { code: 'name', type: 'string', value: 'Nombre 1' },
            { code: 'description', type: 'string', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
            { code: 'salary', type: 'currency', value: 6669.69 },
            { code: 'decimal', type: 'decimal', value: 10000.55 },
            { code: 'percentage', type: 'percentage', value: 0.56 },
            { code: 'created_at', type: 'datetime', value: '2021-09-16T15:36:33.000Z' }
        ],
        [
            { code: 'id', type: 'integer', value: 2 },
            { code: 'name', type: 'string', value: 'Nombre 2' },
            { code: 'description', type: 'string', value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
            { code: 'salary', type: 'currency', value: 669.1 },
            { code: 'decimal', type: 'decimal', value: 0.55 },
            { code: 'percentage', type: 'percentage', value: 0.5617 },
            { code: 'created_at', type: 'datetime', value: '2021-09-15T23:00:00.000Z' }
        ]
    ];

    /**
     * @name recoverData
     * @description Llama al servicio correspondiente para recuperar los datos que se mostrarán en la tabla.
     * @returns Retorna los datos para mostrar en la tabla.
     */
    public recoverData(filters: any): any {
        return this.records;
    }

    /**
     * @name recoverDataHeaders
     * @description Recupera las cabeceras que se mostrarán en la tabla.
     * @returns Retorna las cabecerás para mostrar en la tabla.
     */
    public recoverDataHeaders(): string[] {
        return [
            '#',
            'Nombre',
            'Descripción',
            'Salario',
            'Decimal',
            'Porcentaje',
            'Fecha de creación'
        ];
    }

    /**
     * @name recoverFilters
     * @description Recupera los filtros que se mostrarán en la tabla.
     * @returns Retorna los filtros para mostrar en la tabla.
     */
    public recoverFilters(): any {
        throw new Error('Method not implemented.');
    }

    /**
     * @name createRecord
     * @description Abre la pantalla para crear un registro.
     */
    public createRecord(): void {
        throw new Error('Method not implemented.');
    }

    /**
     * @name openRecord
     * @description Abre la pantalla para visualizar el registro seleccionado.
     * @param id - Identificador del registro a visualizar.
     */
    public openRecord(id: number): void {
        throw new Error('Method not implemented.');
    }

    /**
     * @name openUpdateView
     * @description Abre la pantalla para actualizar el elemento seleccionado.
     * @param id - Identificador del registro a actualizar.
     */
    public openUpdateView(id: number): void {
        throw new Error('Method not implemented.');
    }

    /**
     * @name deleteRecord
     * @description Elimina el registro seleccionado.
     * @param id - Identificador del registro a borrar.
     */
    public deleteRecord(id: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
