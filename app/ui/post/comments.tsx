"use client";
import Form from "./create-form";
import CommentsList from "./comments-list";
import { useEffect, useState } from "react";

export default function Comments(props: { id: string }) {
  const [comments, setComments] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch comments only on first visit and when an update occurs.
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/data?postId=${props.id}`);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
      const { comments } = await response.json();
      const data = JSON.parse(comments);
      setComments(data);
    };

    fetchComments();
  }, [isSuccess]);

  return (
    <div className="w-[89vw] m-[6.5vw_auto_13vw] p-[7.8vw_6.5vw_5.2vw] rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)] lg:w-[50vw] lg:m-[3vw_auto_5vw] lg:p-[3.1vw_4vw_2vw] lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:rounded-[0.5vw] dark:shadow-[0_2.6041666667vw_3.6041666667vw_rgba(71,80,104,.34)]">
      <div className="text-[#3a7aae] text-2xl font-semibold mb-[9vw] lg:mb-[3vw] dark:text-[#4586bb]">
        Comments
      </div>
      <Form
        postId={props.id}
        setIsSuccess={setIsSuccess}
        isSuccess={isSuccess}
      />
      <CommentsList
        comments={comments}
        setIsSuccess={setIsSuccess}
        isSuccess={isSuccess}
      />
    </div>
  );
}
