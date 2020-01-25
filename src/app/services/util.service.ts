import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
        return throwError(errorMessage);
    }
}
