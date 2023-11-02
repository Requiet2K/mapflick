import * as yup from "yup"

export const basicSchema = yup.object().shape({
    email: yup.string().email("Geçerli bir email giriniz").required("Lütfen email giriniz."),
    message: yup.string().min(10,"Minimum 10 karakterlik bir mesaj yazınız.").required("Lütfen mesaj giriniz."),
})