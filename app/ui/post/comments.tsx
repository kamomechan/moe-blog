import { fetchCommentsByPostId } from "@/app/lib/data";
import Form from "./create-form";
import CommentsList from "./comments-list";

export default async function Comments(props: { id: string }) {
  const comments = await fetchCommentsByPostId(props.id);

  return (
    <div className="w-[89vw] m-[6.5vw_auto_13vw] p-[7.8vw_6.5vw_5.2vw] rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)] lg:w-[50vw] lg:m-[3vw_auto_5vw] lg:p-[3.1vw_4vw_2vw] lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:rounded-[0.5vw] dark:shadow-[0_2.6041666667vw_3.6041666667vw_rgba(71,80,104,.34)]">
      <div className="text-[#3a7aae] text-2xl font-semibold mb-[9vw] lg:mb-[3vw] dark:text-[#4586bb]">
        Comments
      </div>
      <Form postId={props.id} />
      <CommentsList comments={comments} postId={props.id} />
    </div>
  );
}
