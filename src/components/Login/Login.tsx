import { useState } from "react";
import { useForm } from "react-hook-form";

export function Login() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<string>();
  const onSubmit = (data: any) => {
    setData(data);
  };
  // console.log(data);
  function handleData(data : any) {
      if (data) {
          return (
            <>
            <div>Username: {data.username}</div>
            <div>Password: {data.password}</div>
            </>
          )
      }
  }
  
  return (
    <form
      action=""
      className="form-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header></header>
      <div className="login-row">
        <div className="title">Email address</div>
        <div className="login-input">
          <input
            type="text"
            {...register("username", { required: true, maxLength: 20 })}
          />
          {errors.username && (
            <div style={{ color: "red" }}>This field is required</div>
          )}
        </div>
      </div>
      <div className="login-row">
        <div className="title">Password</div>
        <div className="login-input">
          <input
            type="password"
            {...register("password", {
              validate: {
                isRequired: (value) => value.length > 0,
                minLength: (value) => value.length >= 6,
              },
            })}
          />
          {errors.password && errors.password.type === "isRequired" && (
            <div style={{ color: "red" }}>The password is required</div>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <div style={{ color: "red" }}>
              The password must be at least 6 characters
            </div>
          )}
        </div>
      </div>

      <div>
        <input type="checkbox" />
        <span>Remember me</span>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div className="data-collect">{handleData(data)}</div>
    </form>
  );
}
