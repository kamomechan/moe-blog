"use client";

import { deleteComment, type DeleteState } from "@/app/lib/actions";
import {
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
  useActionState,
  useEffect,
  useRef,
} from "react";

export function DeleteComment(props: {
  id: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
}) {
  const deleteCommentById = deleteComment.bind(null, props.id);
  const initialState: DeleteState = { message: null, errors: null };
  const [state, formAction] = useActionState(deleteCommentById, initialState);

  const formRef = useRef<HTMLFormElement>(null);
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    const formElement = formRef.current;
    if (!formElement) return;
    const menuElement =
      formElement.previousElementSibling as HTMLButtonElement | null;
    if (!menuElement) return;
    menuElement.click();
  };

  // Update state only on comment changes.
  useEffect(() => {
    if (state?.message?.includes("success")) {
      props.setIsSuccess(!props.isSuccess);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <button
        className="absolute z-1 bottom-0 right-[14vw] text-[0.7rem] bg-[#afd1ec] text-[#364153] rounded-[7vw] p-[0.4vw_1.7vw] translate-x-[50%] hover:bg-[#e3bbbb] hidden lg:right-[4vw] lg:p-[.15vw_.5vw] dark:text-[#96adcc] dark:bg-[#243a4d] dark:hover:bg-[#3f434b]"
        onClick={handleButtonClick}
      >
        delete
      </button>
      {state.errors && (
        <p
          id="username-error"
          aria-live="polite"
          className="text-[#8e4141] text-[.7rem] absolute bottom-0 right-[11vw] ml-[1vw] lg:right-[3vw] dark:text-[#d98787]"
        >
          {state.errors}
        </p>
      )}
    </form>
  );
}

export function EditComment(props: {
  id: string;
  setEditId: Dispatch<SetStateAction<string>>;
}) {
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const buttonElement = event.currentTarget;
    const contentElement = buttonElement
      .closest(`#${CSS.escape(props.id)}`)
      ?.querySelector(".comment-text") as HTMLDivElement;
    const textareaElement = document.getElementById(
      "comment"
    ) as HTMLTextAreaElement;
    textareaElement.value = contentElement.textContent;
    textareaElement.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
    setTimeout(() => {
      textareaElement.focus();
    }, 500);
    const menuElement = buttonElement.previousElementSibling
      ?.previousElementSibling as HTMLButtonElement;
    menuElement.click();
    const editTipsElement = document.getElementById(
      "edit-tips"
    ) as HTMLButtonElement;
    editTipsElement.textContent = "Click me to cancel edit.";
    props.setEditId(props.id);
  };
  return (
    <button
      className="absolute z-1 bottom-0 right-[25vw] text-[0.7rem] bg-[#afd1ec] text-[#364153] rounded-[7vw] p-[0.4vw_1.7vw] translate-x-[50%] hover:bg-[#e3bbbb] hidden lg:right-[7.5vw] lg:p-[.15vw_.5vw] dark:text-[#96adcc] dark:bg-[#243a4d] dark:hover:bg-[#3f434b]"
      onClick={handleButtonClick}
    >
      edit
    </button>
  );
}
