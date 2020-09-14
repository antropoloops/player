import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";

type Props = {
  when: boolean;
  message: string;
};

const PromptExit: React.FC<Props> = ({ when, message }) => {
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  return <Prompt when={when} message={message} />;
};
export default PromptExit;
