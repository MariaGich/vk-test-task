import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Textarea } from "@vkontakte/vkui";
import { useFactQuery } from "../hooks/useFactQuery";
import { FactFormData } from "../types/types";

const CatForm: React.FC = () => {
  const { register } = useForm<FactFormData>();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("fact");
  const { fact, data, queryLoading, onSubmit } = useFactQuery();

  useEffect(() => {
    if (fact) {
      const firstWordLength = fact.split(" ")[0].length;

      if (firstNameRef.current) {
        firstNameRef.current.setSelectionRange(firstWordLength, firstWordLength)!;
        firstNameRef.current.focus();
      }
    }
  }, [fact]);

  const renderTextField = () => {
    if (queryLoading) {
      return <Textarea rows={1} disabled />;
    }

    return (
      <Textarea
        {...rest}
        rows={1}
        getRef={firstNameRef}
        type="text"
        value={fact || (data as string)}
      />
    );
  };

  return (
    <div>
      {renderTextField()}
      <Button
        mode="primary"
        onClick={onSubmit}
        disabled={queryLoading}
        style={{ margin: "15px 0" }}
      >
        {queryLoading ? "Ищем факт..." : "Найти факт"}
      </Button>
    </div>
  );
};

export default CatForm;
