import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/(\w).+/, 'Enter first name')
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(/(\w).+/, 'Enter last name')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  phoneNo: yup
    .string()
    .matches(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm, 'Enter a valid phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  gender: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Gender is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  role: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Role is required'),
});
