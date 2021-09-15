// Librerías.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importaciones de shared.
import { DataTableService } from '@shared/datatables/services/datatable.service';

@Injectable()
export class HomeDtService implements DataTableService {

    constructor() { }

    /**
     * @name recoverData
     * @description Llama al servicio correspondiente para recuperar los datos que se mostrarán en la tabla.
     * @returns Retorna los datos para mostrar en la tabla.
     */
    public recoverData(filters: any): any[] {
        throw new Error('Method not implemented.');
    }

    /**
     * @name recoverDataHeaders
     * @description Recupera las cabeceras que se mostrarán en la tabla.
     * @returns Retorna las cabecerás para mostrar en la tabla.
     */
    public recoverDataHeaders(): string[] {
        throw new Error('Method not implemented.');
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
