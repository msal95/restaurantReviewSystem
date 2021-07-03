import * as yup from 'yup';

export const editProfileValidationSchema = yup.object().shape({
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
  gender: yup
    .string()
    .required('Gender is required'),
});
