import React from "react";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "@vkontakte/vkui";
import { useAgeQuery } from "../hooks/useAgeQuery";
import { FormData } from "../types/types";
import { validationSchema } from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";

const AgeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });
  const name = watch("name");

  const { data, isLoading, onSubmit } = useAgeQuery(name, trigger);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        {errors.name && <div style={{ color: "red" }}>{errors.name.message}</div>}
        <Button mode="primary" type="submit" style={{ margin: "15px 0" }}>
          Узнать возраст
        </Button>
      </form>
      {isLoading && <Spinner />}
      {data && <p>Возраст: {data.age}</p>}
    </>
  );
};

export default AgeForm;
