import Head from "next/head";
import { getSession } from "next-auth/react";

export default function Home() {
	return <></>;
}

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);
	console.log(session);

	return {
		props: {
			session,
		},
	};
};
