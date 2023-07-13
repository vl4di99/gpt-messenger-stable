import OpenAILogo from "components/OpenAILogo";
import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";

const AuthPage = () => {
	return (
		<Container>
			<Logo>
				<OpenAILogo />
			</Logo>
			<Buttons>
				<Link href="/auth/login">
					<Button>Login</Button>
				</Link>
				<Link href="/auth/signup">
					<Button>Sign Up</Button>
				</Link>
			</Buttons>
		</Container>
	);
};

export default AuthPage;

const Container = tw.div`
    flex flex-col items-center justify-center h-screen w-full
    bg-emerald-300
`;

const Logo = tw.div`
    w-96 h-auto m-10 animate-pulse
`;

const Buttons = tw.div`
    flex items-center justify-center gap-10
`;

const Button = tw.button`
    flex items-center justify-center
    w-32 h-16 p-3
    bg-emerald-600 rounded-2xl border-2 border-white font-bold
    hover:bg-emerald-200
`;
