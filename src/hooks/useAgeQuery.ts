import { useQuery } from "@tanstack/react-query";
import { FormData, AgifyResponse } from "../types/types";
import { SubmitHandler, UseFormTrigger } from "react-hook-form";
import { useEffect, useState } from "react";

export const useAgeQuery = (name: string, trigger: UseFormTrigger<FormData>) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastRequestedName, setLastRequestedName] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const { data, isLoading, refetch } = useQuery<AgifyResponse>({
    queryKey: ["age", name],
    queryFn: async () => {
      const abortController = new AbortController();
      setController(abortController);

      const response = await fetch(`https://api.agify.io/?name=${name}`, {
        signal: abortController.signal,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch age");
      }
      return response.json();
    },

    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!!name && name !== lastRequestedName) {
      timer = setTimeout(() => {
        trigger().then((res) => {
          if (res) {
            if (controller) {
              controller.abort();
            }
            setLastRequestedName(name);
            refetch();
          }
        });
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [name, isSubmitted, refetch, lastRequestedName, trigger, controller]);

  const onSubmit: SubmitHandler<FormData> = ({ name }) => {
    if (!!name && name !== lastRequestedName) {
      if (controller) {
        controller.abort();
      }
      setLastRequestedName(name);
      refetch();
    }
    setIsSubmitted(true);
  };

  return { data, isLoading, onSubmit };
};
