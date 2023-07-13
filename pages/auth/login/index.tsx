import { getSession } from "next-auth/react";
import Login from "../../../components/Authentication/LoginPage";

export default function LoginIndex() {
	return (
		<>
			<Login />
		</>
	);
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
