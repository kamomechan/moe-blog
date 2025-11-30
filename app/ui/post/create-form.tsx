"use client";

import {
  addComment,
  editComment,
  EditState,
  type State,
} from "@/app/lib/actions";
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useEffect,
  useRef,
} from "react";

export default function Form(props: {
  postId: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  editId: string;
  setEditId: Dispatch<SetStateAction<string>>;
}) {
  const addCommentWithPostId = addComment.bind(null, props.postId);
  const initialAddState: State = { message: null, errors: {} };
  const editCommentWithId = editComment.bind(null, props.editId);
  const initialEditState: EditState = { message: null, errors: {} };

  const initialState = props.editId ? initialEditState : initialAddState;
  const actionFunction = props.editId
    ? editCommentWithId
    : addCommentWithPostId;

  const [state, formAction] = useActionState(actionFunction, initialState);

  const parentIdRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLTextAreaElement>(null);
  const replyTipsRef = useRef<HTMLButtonElement>(null);
  const editTipsRef = useRef<HTMLButtonElement>(null);

  // Cancel reply
  const handleReplyTipsClick = () => {
    const replyTipsElement = replyTipsRef.current;
    if (!replyTipsElement) return;
    replyTipsElement.textContent = "";
    const parentIdElement = parentIdRef.current;
    if (!parentIdElement) return;
    parentIdElement.value = "";
    const inputElement = inputTextRef.current;
    if (!inputElement) return;
    inputElement.value = "";
  };
  // Cancel edit
  const handleEditTipsClick = () => {
    const editTipsElement = editTipsRef.current;
    if (!editTipsElement) return;
    editTipsElement.textContent = "";
    props.setEditId("");
    const inputElement = inputTextRef.current;
    if (!inputElement) return;
    inputElement.value = "";
  };

  // Update state only on comment changes.
  useEffect(() => {
    if (state?.message?.includes("success")) {
      props.setIsSuccess(!props.isSuccess);
    }
    if (
      state.message ||
      state.errors?.content ||
      (state as State).errors?.parent_id
    ) {
      handleEditTipsClick();
      handleReplyTipsClick();
    }
  }, [state]);

  return (
    <form action={formAction}>
      <label htmlFor="comment" className="sr-only">
        Comment
      </label>
      <textarea
        name="content"
        id="comment"
        className="w-full bg-[#ffffff63] rounded-[4vw] min-h-[32vw] p-[3vw] text-[#364153] lg:bg-[#a8d8ff40] lg:min-h-[9vw] lg:rounded-[2vw] lg:p-[1vw] dark:text-[#ccc] dark:bg-[#5e707d69]"
        placeholder="Leave a comment ><"
        aria-label="comment"
        required
        aria-describedby="comment-error"
        ref={inputTextRef}
      ></textarea>
      {state?.errors?.content && (
        <p
          id="comment-error"
          aria-live="polite"
          className="text-[#8e4141] text-sm ml-[1vw] dark:text-[#d98787]"
        >
          {state.errors.content.map((item) => item)}
        </p>
      )}
      <input type="hidden" name="parent_id" id="parent_id" ref={parentIdRef} />
      {(state as State)?.errors?.parent_id && (
        <p
          id="parent_id"
          aria-live="polite"
          className="text-[#8e4141] text-sm ml-[1vw]"
        >
          {(state as State).errors?.parent_id?.map((item) => item)}
        </p>
      )}
      <div className="relative flex justify-end mr-[10vw] lg:mr-[3vw]">
        <button
          id="reply-tips"
          type="button"
          className="text-sm text-[rgb(45_92_150)] hover:text-[#cc2199] absolute dark:text-[#5c93d7] lg:dark:text-[#6fa6ea]"
          onClick={handleReplyTipsClick}
          aria-label="reply-tips"
          ref={replyTipsRef}
        ></button>
        <button
          id="edit-tips"
          type="button"
          className="text-sm text-[rgb(45_92_150)] hover:text-[#cc2199] absolute dark:text-[#5c93d7] lg:dark:text-[#6fa6ea]"
          onClick={handleEditTipsClick}
          aria-label="edit-tips"
          ref={editTipsRef}
        ></button>
      </div>
      <div className="flex justify-end">
        <button type="submit" aria-label="Submit Comment">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-[#3a7aae] hover:text-[#cc2199]"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
            <path d="M6.5 12h14.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
