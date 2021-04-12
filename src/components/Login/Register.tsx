import { useState } from "react";
import { useForm } from "react-hook-form";

export function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<string>();
  const onSubmit = (data: any) => {
    setData(data);
  };
  // console.log(data);
  function handleData(data: any) {
    if (data) {
      return (
        <>
          <div>Username: {data.username}</div>
          <div>Password: {data.password}</div>
        </>
      );
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
            {...register("username", {
              required: "The password is required",
              maxLength: 20,
            })}
          />
          {errors.username && (
            <div>The username must be not greater than 20 characters</div>
          )}
        </div>
      </div>
      <div className="login-row">
        <div className="title">Password</div>
        <div className="login-input">
          <input
            type="password"
            {...register("password", {
              required: "The password is required",
              validate: {
                minLength: (value) => value.length >= 6,
              },
            })}
          />
          {errors.password && errors.password.type === "minLength" && (
            <div style={{ color: "red" }}>
              The password must be at least 6 characters
            </div>
          )}
        </div>
      </div>
      <div className="login-row">
        <div className="title">Confirm Password</div>
        <div className="login-input">
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              minLength: 6,
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords is not match!";
                },
              },
            })}
          />
          {/* {errors.confirmPassword && <div>This field is required</div>} */}
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
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
