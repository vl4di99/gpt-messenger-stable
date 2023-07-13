import React from "react";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import { IoSendOutline } from "react-icons/io5";
import { addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

type Props = {};

const Search = (props: Props) => {
	const { register, handleSubmit } = useForm();
	const router = useRouter();
	const { chatid } = router.query;
	const sendRequest = async (data: any) => {
		chatid ? console.log(chatid) : console.log("no chatid");
		// const document = await addDoc(
		// 	collection(db,)
		// )
	};
	return (
		<Container>
			<SearchForm onSubmit={handleSubmit(sendRequest)}>
				<SearchInput
					type="text"
					{...register("searchtext", { required: true })}
				/>
				<SendButton type="submit">
					<IoSendOutline size={20} />
				</SendButton>
			</SearchForm>
			<SearchFooter>
				Chat based on OpenAI GPT-3 network. Powered by Next.js and
				Firebase.
			</SearchFooter>
		</Container>
	);
};

export default Search;

const Container = tw.div`
	flex flex-col justify-center items-center h-full w-full
`;

const SearchForm = tw.form`
	flex items-center w-1/2 h-1/2  p-3
	rounded-lg border-2 border-gray-500 shadow-lg shadow-gray-600 
`;

const SearchInput = tw.input`
	w-full bg-transparent outline-none text-lg
`;

const SendButton = tw.button`
hover:bg-gray-500 p-2 rounded-lg
`;

const SearchFooter = tw.div`
	flex justify-center items-center w-full h-1/2 text-xs
`;
