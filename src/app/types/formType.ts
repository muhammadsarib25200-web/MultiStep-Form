export interface FormValues {
    email : string;
    password : string;
    confirmPassword : string;

    firstName : string;
    lastName : string;
    phone  : string;

    acceptTerms : boolean;
}

export const initialValue: FormValues = {
    email : '',
    password : '',
    confirmPassword : '',
    firstName :'',
    lastName : '',
    phone :'',
    acceptTerms:false
}