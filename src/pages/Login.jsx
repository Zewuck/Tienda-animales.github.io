import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthApi from "../utils/AuthAPI";

export default function Login() {
  const authApi = useContext(AuthApi);
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => {
          const errores = {};

          if (!valores.email) {
            errores.email = "Porfavor ingrese un correo electronico";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email =
              "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo ";
          }

          if (!valores.password) {
            errores.password = "Porfavor ingrese una contraseña";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(
              valores.password
            )
          ) {
            errores.password = `la contraseña debe tener de 8 a 25 caracteres con una combinación de letras, números y símbolos`;
          }
          return errores;
        }}
        onSubmit={(values) => {
          console.log(values);
          authApi.setAuth(true);
        }}
      >
        {({ errors }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" id="email" type="text" />
              <ErrorMessage
                name="email"
                component={() => <div>{errors.email}</div>}
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <Field name="password" id="password" type="password" />
              <ErrorMessage
                name="password"
                component={() => <div>{errors.password}</div>}
              />
            </div>
            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
