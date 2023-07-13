"use client";
import React, { Dispatch, SetStateAction } from "react";
import tw from "tailwind-styled-components";
import { BsTrash, BsChatRightText, BsSun, BsMoon } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import { addChatID } from "@/utils/firebaseCollection";

type Props = {
	currentDarkMode: boolean;
	changeDarkMode: Dispatch<SetStateAction<boolean>>;
};

type DeleteButton = {
	chatID: string;
	show: boolean;
};

const Sidebar = ({ currentDarkMode, changeDarkMode }: Props) => {
	const [showDelete, setShowDelete] = React.useState<DeleteButton>({
		chatID: "",
		show: false,
	});
	const { data: session } = useSession();
	const router = useRouter();

	const addNewChat = async () => {
		const document = await addChatID(session!);
		router.push(`/chat/${document.id}`);
	};

	const deleteChat = async () => {
		await deleteDoc(
			doc(db, "users", session?.user?.email!, "chats", showDelete.chatID),
		);
	};

	const deleteAllChats = async () => {
		await deleteDoc(doc(db, "users", session?.user?.email!, "chats"));
	};

	const [userChats, loadingChats, error] = useCollection(
		session &&
			query(
				collection(db, "users", session?.user?.email!, "chats"),
				orderBy("createdAt", "desc"),
			),
	);

	return (
		<SidebarLayout>
			<SidebarTop>
				<SidebarTopNewChat onClick={addNewChat}>
					<IoMdAddCircleOutline />
					<span className="px-3">New Chat</span>
				</SidebarTopNewChat>
				<SidebarTopChats>
					{userChats?.docs.map((chat) => (
						<SidebarChatItem
							onMouseEnter={() =>
								setShowDelete({ chatID: chat.id, show: true })
							}
							onMouseLeave={() =>
								setShowDelete({ chatID: "", show: false })
							}
						>
							<Link
								href={`/chat/${chat.id}`}
								key={chat.id}
								className="flex items-center"
							>
								<BsChatRightText />
								<SidebarChatItemText>
									{chat.id}
								</SidebarChatItemText>
							</Link>
							{showDelete.show &&
								showDelete.chatID === chat.id && (
									<SidebarChatDelete onClick={deleteChat}>
										<BsTrash />
									</SidebarChatDelete>
								)}
						</SidebarChatItem>
					))}
				</SidebarTopChats>
			</SidebarTop>
			<SidebarBottom>
				<SidebarBottomItem
					onClick={() => changeDarkMode((prev) => !prev)}
				>
					{currentDarkMode ? <BsSun /> : <BsMoon />}
					<span className="px-3">
						{currentDarkMode ? "Light Mode" : "Dark Mode"}
					</span>
				</SidebarBottomItem>
				<SidebarBottomItem onClick={deleteAllChats}>
					<BsTrash />
					<span className="px-3">Clear Conversations</span>
				</SidebarBottomItem>
				<SidebarBottomItem onClick={() => signOut()}>
					<BiLogOutCircle />
					<span className="px-3">Log out</span>
				</SidebarBottomItem>
			</SidebarBottom>
		</SidebarLayout>
	);
};

export default Sidebar;

const SidebarLayout = tw.div`
	flex flex-col items-start justify-between h-full bg-gray-900 w-72
	p-5
`;

const SidebarTop = tw.div`
flex flex-col w-full
`;

const SidebarTopNewChat = tw.div`
	flex flex-row items-center w-full text-white p-3 px-6
	border rounded-lg cursor-pointer
	hover:bg-gray-600
`;

const SidebarTopChats = tw.div`
	flex flex-col w-full items-center
`;

const SidebarChatItem = tw.div`
flex flex-row items-center justify-between w-full h-14 p-2 my-2
text-white rounded-lg text-ellipsis
hover:bg-gray-600 cursor-pointer
transition ease-in-out duration-200
`;

const SidebarChatItemText = tw.div`
  w-32 mx-3
	overflow-hidden text-ellipsis whitespace-nowrap
`;
const SidebarChatDelete = tw.button`
 p-2 cursor-pointer rounded-xl
 hover:bg-gray-300 
`;

const SidebarBottom = tw.div`
flex flex-col w-full gap-2 pt-3
border-t border-gray-600 text-white 
`;

const SidebarBottomItem = tw.div`
flex flex-row items-center w-full 
text-white p-2 py-3 rounded-lg
hover:bg-gray-600 cursor-pointer
transition ease-in-out duration-200
`;
