import { deleteComment } from "@/app/lib/actions";

export default function DeleteComment(props: { id: string; postId: string }) {
  const deleteCommentById = deleteComment.bind(null, props.id, props.postId);
  return (
    <form action={deleteCommentById}>
      <button className="absolute bottom-0 right-[18vw] text-[0.8rem] bg-[#94abd885] text-[#364153] rounded-[3vw] p-[0.5vw_2vw] translate-x-[50%] hover:bg-[rgb(179_198_243)] hidden lg:right-[5vw] lg:p-[.15vw_.5vw]">
        delete
      </button>
    </form>
  );
}
