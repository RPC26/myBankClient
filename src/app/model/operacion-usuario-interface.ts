import { FormControl } from "@angular/forms"

export interface IFormOperacionUser {
    cantidad:   FormControl<number>
    emisorCuentaEntity:  FormControl<number>
    receptorCuentaEntity: FormControl<number>
}
