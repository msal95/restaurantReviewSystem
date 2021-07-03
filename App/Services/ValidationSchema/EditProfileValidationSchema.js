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
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  gender: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Gender is required'),
});
