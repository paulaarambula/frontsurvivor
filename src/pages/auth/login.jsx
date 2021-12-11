import React, {useEffect} from "react";
import Input from "../../components/Input";
import ButtonLoading from "../../components/buttons/ButtonLoading";
import useFormData from "../../hook/useFormData";
import { LOGIN } from "../../graphql/auth/mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navegate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [login, { data: mutationData, loading: mutationLoading}] = useMutation(LOGIN); //error: mutationError Usar para controlar errores

  const submitForm = (e) => {
    e.preventDefault();
    // console.log('enviar datos backed: ', formData);
    login({ variables: formData });
  };

  useEffect(() => {
    console.log("mutationData: ", mutationData);
    if(mutationData){
      if(mutationData.login.token){
        setToken(mutationData.login.token);
        navegate("/");
      }
    }
  }, [mutationData, setToken, navegate]);

  return (
    <div className="p-6 bg-white rounded-lg  shadow-lg">
      <div className="flex flex-col text-2xl text-black items-center my-3 font-bold">
        <h5>Login</h5>
      </div>
      <form onSubmit={submitForm} ref={form} onChange={updateFormData} >
        <Input type="email" label="Email" name="email" required />
        <Input type="password" label="Password" name="password" required />
        <ButtonLoading nameButton="Login" type="submit" loading={mutationLoading} />
      </form>
    </div>
  );
};

export default Login;
