import { useForm } from "react-hook-form";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import InputPassword from "../InputPassword";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import { registerContactFormSerializer } from "../../schemas/registerContactFormSchema";
import { Form } from "../LoginForm/styles";

const RegisterContactForm = () => {
  const { registerContact } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerContactFormSerializer) });

  const submit = (formData: any) => {
    registerContact(formData);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Input
        label="Name"
        type="text"
        placeholder="Type contact name"
        register={register("completeName")}
        error={errors.completeName}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Type your contact email"
        register={register("email")}
        error={errors.email}
      />

      <InputPassword
        label="Password"
        type="password"
        placeholder="Create a password for contact"
        register={register("password")}
        error={errors.password}
      />

      <Input
        label="Cellphone"
        type="text"
        placeholder="Type your contact cellphone number"
        register={register("cellphone")}
        error={errors.cellphone}
      />

      <button className="button" type="submit">
        Register
      </button>
    </Form>
  );
};

export default RegisterContactForm;
