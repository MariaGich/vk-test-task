import { useQuery } from "@tanstack/react-query";
import { FormData } from "../types/types";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const useFactQuery = () => {
  const [fact, setFact] = useState<string>("");
  const { handleSubmit } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    isLoading: queryLoading,
    refetch,
  } = useQuery({
    queryKey: ["catFact"],
    queryFn: async () => {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setFact(responseData.fact);
      return responseData.fact;
    },
    enabled: false,
  });

  const onSubmit = handleSubmit(() => {
    setIsLoading(true);
    refetch().finally(() => {
      setIsLoading(false);
    });
  });

  return { fact, data, queryLoading, onSubmit };
};
