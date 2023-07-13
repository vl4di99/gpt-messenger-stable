import { authOptions } from "@/pages/api/auth/[...nextauth]";
import OpenAILogo from "components/OpenAILogo";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	const sendLoginRequest = async (data: any) => {
		console.log(data);
	};

	const loginWithGoogle = async () => {
		await signIn("google");
	};

	return (
		<Container>
			<Logo>
				<OpenAILogo />
			</Logo>
			<LoginForm onSubmit={handleSubmit(sendLoginRequest)}>
				<FormInput
					type="text"
					placeholder="Username"
					{...register("username")}
				/>
				<FormInput
					type="password"
					placeholder="Password"
					{...register("password")}
				/>
				<FormSubmit type="submit">Login</FormSubmit>
			</LoginForm>
			<Buttons>
				<LoginWithGoogle onClick={loginWithGoogle}>
					<Image
						src={`/images/GoogleLogo.png`}
						alt="Google Logo"
						width={30}
						height={30}
					/>
					<span className="px-4">Login With Google</span>
				</LoginWithGoogle>
			</Buttons>
		</Container>
	);
};

export default Login;

const Container = tw.div`
    flex flex-col items-center justify-center h-screen w-full
    bg-emerald-300
`;

const Logo = tw.div`
    w-60 h-auto m-10
`;

const LoginForm = tw.form`
    flex flex-col items-center justify-center gap-10 p-5
    bg-white rounded-2xl border-2 border-emerald-600
`;

const FormInput = tw.input`
    w-96 h-16 p-3
    bg-emerald-300 rounded-2xl border-2 border-white
    outline-none
`;

const FormSubmit = tw.button`
    w-96 h-16 p-3
    bg-emerald-600 rounded-2xl border-2 border-white
    outline-none
`;

const Buttons = tw.div`
    flex items-center justify-center gap-10 m-10
`;

const Button = tw.button`
    flex items-center justify-center
    w-32 h-16 p-3
    bg-emerald-600 rounded-2xl border-2 border-white font-bold
    hover:bg-emerald-200
`;

const LoginWithGoogle = tw.button`
    flex items-center
    bg-sky-300 border border-white  text-2xl p-6 rounded-2xl 
    hover:bg-sky-200
`;
