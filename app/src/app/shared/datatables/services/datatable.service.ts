// Librerías.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class DataTableService {
    /**
     * @name recoverData
     * @description Llama al servicio correspondiente para recuperar los datos que se mostrarán en la tabla.
     * @returns Retorna los datos para mostrar en la tabla.
     */
    public abstract recoverData(basicFilter: string, advancedFilters: any, offset: number, limit: number, sort: any): any;

    /**
     * @name recoverDataHeaders
     * @description Recupera las cabeceras que se mostrarán en la tabla.
     * @returns Retorna las cabecerás para mostrar en la tabla.
     */
    public abstract recoverDataHeaders(): any[];

    /**
     * @name recoverFilters
     * @description Recupera los filtros que se mostrarán en la tabla.
     * @returns Retorna los filtros para mostrar en la tabla.
     */
    public abstract recoverFilters(): any;

    /**
     * @name createRecord
     * @description Abre la pantalla para crear un registro.
     */
    public abstract createRecord(): void;

    /**
     * @name openRecord
     * @description Abre la pantalla para visualizar el registro seleccionado.
     * @param id - Identificador del registro a visualizar.
     */
    public abstract openRecord(id: number): void;

    /**
     * @name openUpdateView
     * @description Abre la pantalla para actualizar el elemento seleccionado.
     * @param id - Identificador del registro a actualizar.
     */
    public abstract openUpdateView(id: number): void;

    /**
     * @name deleteRecord
     * @description Elimina el registro seleccionado.
     * @param id - Identificador del registro a borrar.
     */
    public abstract deleteRecord(id: number): Observable<any>;
}
