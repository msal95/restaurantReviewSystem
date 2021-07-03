import * as yup from 'yup';

export const replyReviewValidationSchema = yup.object().shape({
  reply: yup
    .string().trim()
    .min(10, ({min, value}) => `${min - value.length} characters to go`)
    .required('Restaurant Review Reply is required'),
});
