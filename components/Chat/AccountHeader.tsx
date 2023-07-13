import { useSession } from "next-auth/react";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

const AccountHeader = () => {
	const { data: session } = useSession();
	const [showProfileInfo, changeShowProfileInfo] = useState<boolean>(false);

	console.log(session?.user);
	return (
		<Container>
			<HeaderText></HeaderText>
			<Profile>
				{session && (
					<ProfileImage
						src={session.user?.image!}
						alt="Profile Picture"
						onClick={() => changeShowProfileInfo(!showProfileInfo)}
					/>
				)}
				{showProfileInfo && (
					<ProfileInfo>{session?.user?.name}</ProfileInfo>
				)}
			</Profile>
		</Container>
	);
};

export default AccountHeader;

const Container = tw.div`
    flex justify-between px-5 py-2 items-center w-full

`;

const Profile = tw.div`
    flex items-center gap-3
`;

const ProfileImage = tw.img`
    w-16 h-16 rounded-full flex self-end
    cursor-pointer border-2 border-gray-200 shadow-lg 
    hover:opacity-70
`;

const HeaderText = tw.h1`
    text-2xl font-bold
`;

const ProfileInfo = tw.div`
    flex flex-col items-center justify-center fixed top-20 right-5 z-50 p-5
    bg-gray-100 rounded-2xl border-2 border-black
`;
