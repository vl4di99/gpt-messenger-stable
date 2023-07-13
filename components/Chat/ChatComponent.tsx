import React from "react";
import tw from "tailwind-styled-components";
import Search from "./Search";
import { ImSun } from "react-icons/im";
import { BsLightningCharge, BsExclamationTriangle } from "react-icons/bs";
import AccountHeader from "./AccountHeader";

type Props = {
	currentDarkMode: boolean;
};

const ChatComponent = ({ currentDarkMode }: Props) => {
	return (
		<Layout dark={currentDarkMode}>
			<AccountHeader />
			<MiddleLayout></MiddleLayout>
			<SearchBar>
				<Search />
			</SearchBar>
		</Layout>
	);
};

export default ChatComponent;

const Layout = tw.div<any>`
    ${(props) =>
		props.dark ? "bg-gray-800 text-white" : "bg-white text-black"}
    h-screen w-full flex flex-col items-center
`;

const MiddleLayout = tw.div`
    flex flex-col h-full w-full items-center justify-center
    my-10
`;

const Cards = tw.div`
    grid grid-cols-3 grid-flow-row gap-7 w-1/2
`;

const MiddleCard = tw.div<any>`
    flex flex-col items-center p-6 px-8 gap-4 text-center w-full
    bg-gray-900 rounded-xl border-2 border-gray-600 text-white shadow-xl shadow-zinc-500 ring-red-700

`;

const CardText = tw.div`
	p-4 text-md bg-slate-200 rounded-lg text-black
`;

const Title = tw.h1`
    text-4xl my-8
`;

const SearchBar = tw.div`
    w-full h-32 sticky bottom-0
`;
