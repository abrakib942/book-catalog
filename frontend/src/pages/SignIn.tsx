/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MdAlternateEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { RiUserSmileLine } from "react-icons/ri";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a valid email address")
    .required("Email Required"),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Password is too short - should be 6 letters minimum."),
});

const defaultValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-[500px] mx-auto">
      <div className="flex flex-col items-center justify-center p-16">
        <div className="text-[24px] font-bold">Sign In</div>
        <div className="text-[16px] text-[#8A94A6] my-2">
          Welcome back, you’ve been missed!
        </div>

        <form
          name="signInForm"
          noValidate
          className="flex flex-col mt-3 gap-5 justify-center w-[400px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <label className="relative block">
                <span className="absolute left-0 top-[14px] flex items-center pl-3">
                  <MdAlternateEmail className="text-gray-400 h-5 w-5" />
                </span>

                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full pl-10"
                  {...field}
                  //   error={!!errors.email}
                  //   helperText={errors?.email?.message}
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </label>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <label className="relative block">
                <span className="absolute top-[14px] left-0 flex items-center pl-3">
                  <AiFillLock className="text-gray-400 h-5 w-5" />
                </span>

                <input
                  type="password"
                  placeholder="Create Password"
                  className="input input-bordered w-full pl-10"
                  {...field}
                  // error={!!errors.password}
                  // helperText={errors?.password?.message}
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </label>
            )}
          />
          <div className="flex item-center gap-3">
            <input type="checkbox" className="checkbox checkbox-info" />
            <div className="text-[#B0B7C3] text-[16px]">
              I agree to the Terms & Conditions
            </div>
          </div>
          <div className="mx-auto">
            <input
              className="btn w-[400px] mt-4 bg-[#377DFF]  text-white"
              type="submit"
              value="Sign In"
            />
          </div>
          <div className="mt-3 text-[#B0B7C3] text-[16px] text-center">
            Don't have an account yet?
            <Link to="/signUp">
              {" "}
              <span className="text-[#377DFF] font-bold">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
