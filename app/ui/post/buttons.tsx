import { deleteComment, type DeleteState } from "@/app/lib/actions";
import {
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
  useActionState,
  useEffect,
  useRef,
} from "react";

export default function DeleteComment(props: {
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
        className="absolute z-1 bottom-0 right-[18vw] text-[0.8rem] bg-[#94abd885] text-[#364153] rounded-[3vw] p-[0.5vw_2vw] translate-x-[50%] hover:bg-[rgb(179_198_243)] hidden lg:right-[5vw] lg:p-[.15vw_.5vw] dark:text-[#d1d5dc] dark:bg-[#3c5971] dark:hover:bg-[#3f434b]"
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
