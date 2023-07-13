import React from "react";
import tw from "tailwind-styled-components";
import Search from "./Search";
import { ImSun } from "react-icons/im";
import { BsLightningCharge, BsExclamationTriangle } from "react-icons/bs";
import AccountHeader from "./AccountHeader";

type Props = {
	currentDarkMode: boolean;
};

const ChatIntro = ({ currentDarkMode }: Props) => {
	return (
		<Layout dark={currentDarkMode}>
			<AccountHeader />
			<MiddleLayout>
				<Title>
					<b>GPT</b> Messenger
				</Title>
				<Cards>
					<MiddleCard>
						<ImSun size={25} />
						<b className="text-lg">Examples</b>
						<CardText>
							Explain quantum computing in simple terms
						</CardText>
						<CardText>
							Got any creative ideas for a 10 year old’s birthday?
						</CardText>
						<CardText>
							How do I make an HTTP request in Javascript?
						</CardText>
					</MiddleCard>
					<MiddleCard>
						<BsLightningCharge size={25} />
						<b className="text-lg">Capabilities</b>
						<CardText>
							Remembers what user said earlier in the conversation
						</CardText>
						<CardText>
							Allows user to provide follow-up corrections
						</CardText>
						<CardText>
							Trained to decline inappropriate requests
						</CardText>
					</MiddleCard>
					<MiddleCard>
						<BsExclamationTriangle size={25} />
						<b className="text-lg">Limitations</b>
						<CardText>
							May occasionally generate incorrect information
						</CardText>
						<CardText>
							May occasionally produce harmful instructions or
							biased content
						</CardText>
						<CardText>
							Limited knowledge of world and events after 2021
						</CardText>
					</MiddleCard>
				</Cards>
			</MiddleLayout>
			<SearchBar>
				<Search />
			</SearchBar>
		</Layout>
	);
};

export default ChatIntro;

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
