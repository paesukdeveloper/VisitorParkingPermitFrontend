import { FormControl } from "@angular/forms";

export function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value?.toString() || '')?.trim().length === 0 && control.value != '';
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}