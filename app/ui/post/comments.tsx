import { comments } from "@/app/lib/placeholder-data";

export default function Comments() {
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
        {comments.map((item) => (
          <div key={item.id} className="w-full mb-[3vw]">
            <div className="text-[#364153]">{item.content}</div>
            <span className="text-[0.8rem] text-[#505e73]">
              {item.created_at}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
