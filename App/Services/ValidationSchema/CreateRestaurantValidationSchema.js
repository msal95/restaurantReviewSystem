import * as yup from 'yup';

export const createRestaurantValidationSchema = yup.object().shape({
  name: yup.string().required('Restaurant name is required'),
  description: yup
    .string()
    .min(10, ({min, value}) => `${min - value.length} characters to go`)
    .required('Restaurant Description is required'),
  location: yup.string().required('Restaurant Location is required'),
  establishedAt: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Date is required'),
});
