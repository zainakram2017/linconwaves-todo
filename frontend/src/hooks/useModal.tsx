import { useState } from "react";

type UseModalReturnType = [boolean, () => void];

export const useModal = (): UseModalReturnType => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => {
    setIsShowing((prevState) => !prevState);
  };

  return [isShowing, toggle];
};
