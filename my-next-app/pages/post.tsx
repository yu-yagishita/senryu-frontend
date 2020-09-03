import { useCallback } from "react";
import { useForm } from "react-hook-form";

type PostFormData = {
  userId: string;
  kamigo: string;
  nakashichi: string;
  shimogo: string;
};

type PostResponseData = {
  postId: string;
};

export default function Post() {
  const { register, handleSubmit, watch, errors } = useForm<PostFormData>();
  const onSubmit = useCallback(async (data: PostFormData) => {
    console.log(data);
    const url = "api/post-senryu";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: "57a98d98e4b00679b4a830af",
        kamigo: data.kamigo,
        nakashichi: data.nakashichi,
        shimogo: data.shimogo,
      }),
    });
    const responseData: PostResponseData = await response.json();
    console.log(responseData);
  }, []);

  console.log(watch("kamigo"));
  console.log(watch("nakashichi"));
  console.log(watch("shimogo"));

  return (
    <>
      <h1>SENRYU Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filed">
          <label className="label">上五</label>
          <input
            name="kamigo"
            placeholder="テストだよ"
            ref={register({ required: true })}
          />
          {errors.kamigo && "上五を入力してください。"}
        </div>
        <div className="filed">
          <label className="label">中七</label>
          <input
            name="nakashichi"
            placeholder="この投稿は"
            ref={register({ required: true })}
          />
          {errors.nakashichi && "中七を入力してください。"}
        </div>
        <div className="filed">
          <label className="label">下五</label>
          <input
            name="shimogo"
            placeholder="テストだよ"
            ref={register({ required: true })}
          />
          {errors.shimogo && "下五を入力してください。"}
        </div>
        <div className="filed">
          <button>投稿する</button>
        </div>
      </form>
    </>
  );
}
