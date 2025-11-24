"use client";

import { addComment, type State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form(props: { postId: string }) {
  const addCommentWithPostId = addComment.bind(null, props.postId);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    addCommentWithPostId,
    initialState
  );
  return (
    <form action={formAction}>
      <label htmlFor="comment" className="sr-only">
        Comment
      </label>
      <textarea
        name="content"
        id="comment"
        className="w-full bg-[#ffffff63] rounded-[4vw] min-h-[32vw] p-[3vw] text-[#364153] lg:bg-[#a8d8ff40] lg:min-h-[9vw] lg:rounded-[2vw] lg:p-[1vw] "
        placeholder="Please authenticate to leave a comment ><"
        aria-label="comment"
        required
        aria-describedby="comment-error"
      ></textarea>
      {state?.errors?.content && (
        <p
          id="comment-error"
          aria-live="polite"
          className="text-[#8e4141] text-sm ml-[1vw]"
        >
          {state.errors.content.map((item) => item)}
        </p>
      )}
      <div className="flex justify-end">
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-[#3a7aae]"
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
