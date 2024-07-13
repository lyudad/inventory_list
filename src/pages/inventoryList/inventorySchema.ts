import * as Yup from 'yup'

export const timelineSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .required('Required field'),
    quantity: Yup.number()
      .required('Required field')
      .min(0),
  })