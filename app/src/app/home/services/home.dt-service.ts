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

        for (let i = 1; i <= 10; i++) {
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
