"use client";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import tw from "tailwind-styled-components";
import AccountHeader from "./AccountHeader";
import ChatComponent from "./ChatComponent";
import ChatIntro from "./ChatIntro";
import Sidebar from "./Sidebar";

export default function ChatPage() {
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const { data: session } = useSession();
	const router = useRouter();
	const { chatid } = router.query;
	// const [messages] = useCollection(query(collection(db, 'users', session?.user?.email!, 'chats', chatid!, 'messages'), orderBy('createdAt', 'asc')));

	return (
		<Layout>
			<Sidebar currentDarkMode={darkMode} changeDarkMode={setDarkMode} />
			{chatid ? (
				<ChatComponent currentDarkMode={darkMode} />
			) : (
				<ChatIntro currentDarkMode={darkMode} />
			)}
		</Layout>
	);
}

const Layout = tw.div<any>`
  h-screen flex overflow-hidden
`;
