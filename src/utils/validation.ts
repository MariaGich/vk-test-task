import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(
      /^[A-Za-z\s]+$/,
      "Это не похоже на имя... Нужно использовать только буквы (английские)"
    ),
});
