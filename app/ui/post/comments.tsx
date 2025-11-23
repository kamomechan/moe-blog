import { fetchCommentsByPostId } from "@/app/lib/data";
import LocalizedDate from "./localized-date";

export default async function Comments(props: { id: string }) {
  const comments = await fetchCommentsByPostId(props.id);
  return (
    <div className="w-[89vw] m-[6.5vw_auto_13vw] p-[7.8vw_6.5vw_5.2vw] rounded-[1.3vw] shadow-[0_2.6041666667vw_2.6041666667vw_rgba(71,80,104,.14)] lg:w-[50vw] lg:m-[3vw_auto_5vw] lg:p-[3.1vw_4vw_2vw] lg:shadow-[0_1.0416666667vw_1.0416666667vw_rgba(71,80,104,.14)] lg:rounded-[0.5vw]">
      <div className="text-[#3a7aae] text-2xl font-semibold mb-[9vw] lg:mb-[3vw]">
        Comments
      </div>
      <form action="">
        <label htmlFor="comment" className="sr-only">
          Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          className="w-full bg-[#ffffff63] rounded-[4vw] min-h-[32vw] p-[3vw] text-[#364153] lg:bg-[#a8d8ff40] lg:min-h-[9vw] lg:rounded-[2vw] lg:p-[1vw] "
          placeholder="Please authenticate to leave a comment ><"
          aria-label="comment"
        ></textarea>
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
      <div className="mt-[5vw] lg:mt-[3vw]">
        {comments
          .filter((item) => {
            return item.parent_id === null;
          })
          .map((item, index) => {
            return (
              <div
                key={`comment-${index + 1}`}
                className="mb-[7vw] lg:mb-[2vw]"
              >
                <div
                  key={item.id}
                  id={item.id}
                  className="w-full mb-[2.5vw] lg:mb-[1vw]"
                >
                  <div className="text-[#364153]">{item.content}</div>
                  <span className="text-[0.8rem] text-[#505e73]">
                    <LocalizedDate date={new Date(item.created_at)} />
                  </span>
                  <span className="text-[0.8rem] text-[#2e618a] ml-[4vw] lg:ml-[1vw]">
                    reply
                  </span>
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
    </div>
  );
}
