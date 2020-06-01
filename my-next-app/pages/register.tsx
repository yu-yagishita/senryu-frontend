import Head from "next/head";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { deserialize } from "v8";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const onSubmit = useCallback(async (data: FormData) => {
    console.log(data);
    const url = "api/register";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    const decision = await response.json();
    console.log(decision);
  }, []);

  console.log(watch("username"));
  console.log(watch("email"));
  console.log(watch("password"));

  return (
    <>
      <h1>NANPA Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filed">
          <label className="label">username</label>
          <input
            name="username"
            placeholder="username"
            ref={register({ required: true })}
          />
          {errors.username && "usernameを入力してください。"}
        </div>
        <div className="filed">
          <label className="label">email</label>
          <input
            name="email"
            placeholder="email"
            ref={register({ required: true })}
          />
          {errors.email && "emailを入力してください。"}
        </div>
        <div className="filed">
          <label className="label">password</label>
          <input
            name="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.password && "passwordを入力してください。"}
        </div>
        <div className="filed">
          <button>登録する</button>
        </div>
      </form>
    </>
  );
}
