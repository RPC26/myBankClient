import { FormControl } from "@angular/forms"

export interface IUser {
    login: FormControl<string>,
    password: FormControl<string>
}