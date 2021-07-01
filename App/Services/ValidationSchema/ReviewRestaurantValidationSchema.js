import * as yup from 'yup';

export const reviewRestaurantValidationSchema = yup.object().shape({
  comment: yup
    .string()
    .min(10, ({min, value}) => `${min - value.length} characters to go`)
    .required('Restaurant Review is required'),
  dateOfVisit: yup
    .string()
    // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
    .required('Date is required'),
});
