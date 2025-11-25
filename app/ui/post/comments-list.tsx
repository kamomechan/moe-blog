"use client";
import { CommentType } from "@/app/lib/definitions";
import LocalizedDate from "@/app/ui/post/localized-date";
import { MouseEventHandler } from "react";

export default function CommentsList({
  comments,
}: {
  comments: CommentType[];
}) {
  const handleReplyClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    const currentTarget = event.currentTarget;
    const parentDiv = currentTarget.closest("div") as HTMLDivElement;
    const inputElement = document.getElementById(
      "parent_id"
    ) as HTMLInputElement;
    inputElement.value = parentDiv.id;
    const formElement = document.querySelector("form") as HTMLFormElement;
    const commentElement = document.getElementById(
      "comment"
    ) as HTMLTextAreaElement;
    formElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    const tipsElement = document.getElementById("tips") as HTMLButtonElement;
    tipsElement.textContent = "Click me to cancel reply.";
    setTimeout(() => {
      commentElement.focus();
    }, 500);
  };

  return (
    <div className="mt-[5vw] lg:mt-[3vw]">
      {comments
        .filter((item) => {
          return item.parent_id === null;
        })
        .map((item, index) => {
          return (
            <div key={`comment-${index + 1}`} className="mb-[7vw] lg:mb-[2vw]">
              <div
                key={item.id}
                id={item.id}
                className="w-full mb-[2.5vw] lg:mb-[1vw]"
              >
                <div className="text-[#364153]">{item.content}</div>
                <span className="text-[0.8rem] text-[#505e73]">
                  <LocalizedDate date={new Date(item.created_at)} />
                </span>
                <button
                  className="text-[0.8rem] text-[#2e618a] ml-[4vw] lg:ml-[1vw] hover:text-[#cc2199]"
                  onClick={handleReplyClick}
                >
                  reply
                </button>
              </div>
              {/* Render replies/nested comments for the current entry */}
              {comments.map((entry) => {
                if (entry.parent_id === item.id) {
                  return (
                    <div
                      key={entry.id}
                      id={entry.id}
                      className="w-full m-[0_0_1vw_6vw] shadow-[-3px_0_0_0_#5597c7] pl-[1.5vw] lg:ml-[1.5vw] lg:pl-[0.5vw]"
                    >
                      <div className="text-[#364153] text-[.9rem]">
                        {entry.content}
                      </div>
                      <span className="text-[0.7rem] text-[#505e73]">
                        <LocalizedDate date={new Date(entry.created_at)} />
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
    </div>
  );
}
