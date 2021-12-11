import React, {useEffect} from "react";
import Button_1 from "../../components/buttons/ButtonLoading";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { Enum_Rol } from "../../utils/enum";
import useFormData from "../../hook/useFormData";
import { REGISTER } from "../../graphql/auth/mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

const Register = () => {
  const {setToken} = useAuth();
  const navegate = useNavigate();
  const { form, formData, updateFormData } = useFormData();
  const [
    register,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(REGISTER);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('enviar datos backed: ', formData);
    register({variables: formData});
  };

  useEffect(() => {
    console.log("mutationData: ", mutationData);
    if(mutationData){
      if(mutationData.register.token){
        setToken(mutationData.register.token);
        navegate("/");
      }
    }
  }, [mutationData, setToken, navegate]);
  return (
    <div className="p-6 bg-white rounded-lg  shadow-lg">
      <div className="flex flex-col text-2xl text-black items-center my-3 font-bold">
        <h5>Regístrate</h5>
      </div>
      <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <Input type="text" label="Nombre" name="name" required />
        <Input type="text" label="Apellido" name="lastname" required />
        <Input type="text" label="Identificación" name="identification" />
        <DropDown
          label="Rol"
          name="rol"
          required={true}
          options={Enum_Rol}
          disable={Object.keys(formData).length === 0}
        />
        <Input type="text" label="Email" name="email" required />
        <Input type="password" label="Contraseña" name="password" required />
        <Button_1 nameButton="Registrar" type="submit" />
      </form>
    </div>
  );
};

export default Register;
