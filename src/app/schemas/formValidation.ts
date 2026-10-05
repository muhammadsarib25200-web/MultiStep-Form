import * as Yup from "yup";
export const stepAccountSchema = Yup.object({
       email : Yup.string()
       .email("Invalid email address")
       .required("Email is required"),
       password : Yup.string()
        .min(4, 'password must be at least 4 letter')
        .required('Password is required'),
       confirmPassword : Yup.string()
       .oneOf([Yup.ref('password')], 'password must match')
       .required('Confirm password is required'),
});

export const stepPersonalSchema = Yup.object({
    firstName : Yup.string()
    .required('firstName is required'),
    lastName : Yup.string()
    .required('lastName is required'),
    phone : Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Phone number must be 10 or 11 letter')
    .required('Phone number is required'),
});

export const stepReviewschema = Yup.object({
    acceptTerms : Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
});

export const validationSchemas = [
    stepAccountSchema,
    stepPersonalSchema,
    stepReviewschema,
];