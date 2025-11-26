import { deleteComment, type DeleteState } from "@/app/lib/actions";
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useEffect,
} from "react";

export default function DeleteComment(props: {
  id: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
}) {
  const deleteCommentById = deleteComment.bind(null, props.id);
  const initialState: DeleteState = { message: null };
  const [state, formAction] = useActionState(deleteCommentById, initialState);

  // Update state only on comment changes.
  useEffect(() => {
    if (state?.message?.includes("success")) {
      props.setIsSuccess(!props.isSuccess);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <button className="absolute bottom-0 right-[18vw] text-[0.8rem] bg-[#94abd885] text-[#364153] rounded-[3vw] p-[0.5vw_2vw] translate-x-[50%] hover:bg-[rgb(179_198_243)] hidden lg:right-[5vw] lg:p-[.15vw_.5vw] dark:text-[#d1d5dc] dark:bg-[#3c5971] dark:hover:bg-[#3f434b]">
        delete
      </button>
    </form>
  );
}
