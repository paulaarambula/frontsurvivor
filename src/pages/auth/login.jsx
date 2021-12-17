import React, { useEffect } from "react";
import Input from "../../components/Input";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import useFormData from "../../hook/useFormData";
import { LOGIN } from "../../graphql/auth/mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

const Login = () => {
  const navegate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [login, { data: mutationData, loading: mutationLoading }] =
    useMutation(LOGIN); //error: mutationError Usar para controlar errores

  const submitForm = (e) => {
    e.preventDefault();
    // console.log('enviar datos backed: ', formData);
    login({ variables: formData });
  };

  useEffect(() => {
    console.log("mutationData: ", mutationData);
    if (mutationData) {
      if (mutationData.login.token) {
        setToken(mutationData.login.token);
        navegate("/");
      }
    }
  }, [mutationData, setToken, navegate]);

  return (
    <div className="flex flex-row ">
      <div
        className="w-96 bg-cover bg-center rounded-l-lg"
        style={{
          backgroundImage:
            'url("https://gogo-react.coloredstrategies.com/static/media/balloon.ce8d76b9.jpg")',
        }}
      >
        <div className="grid grid-cols content-center h-80 text-font text-white text-4xl p-5">
          <div>
            <h5>Sistema de Gestión de Proyectos</h5>
          </div>
        </div>
      </div>
      <div className="px-20 bg-white w-128 rounded-r-lg py-16">
        <div className="">LOGO</div>
        <div className="flex flex-col text-xl my-3 mt-10">
          <h5>Iniciar sesión</h5>
        </div>
        <form onSubmit={submitForm} ref={form} onChange={updateFormData}>
          <div className="flex  justify-center -mb-4 bg-white relative w-14 ml-2">
            <span>Usuario</span>
          </div>
          <Input type="email" name="email" required />
          <div className="flex  justify-center -mb-4 bg-white relative w-20 ml-2">
            <span>Contraseña</span>
          </div>
          <Input type="password" name="password" required />
          <div className="flex justify-between">
            <Link to="/auth/register/">Quiero registrarme</Link>

            <ButtonLoading
              nameButton="Iniciar sesión"
              type="submit"
              loading={mutationLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
