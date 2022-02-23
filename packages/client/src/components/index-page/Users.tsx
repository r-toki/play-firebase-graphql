import { gql } from "@apollo/client";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import {
  addDoc,
  deleteDoc,
  DocumentReference,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { FollowingData } from "interfaces/web-schema";
import { useEffect, useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import { db } from "../../firebase-app";
import { useUsersForIndexPageQuery } from "../../graphql/generated";
import { followingRef } from "../../lib/typed-ref";
import { AppList, AppListItem } from "../shared/AppList";

// gql`
//   query usersForIndexPage {
//     users {
//       id
//       displayName
//     }
//   }

//   query me {

//   }
// `;

// const useUsers = () => {
//   const { currentUser } = useAuthed();

//   const { data } = useUsersForIndexPageQuery();
//   const users = data?.users.filter(({ id }) => id !== currentUser.id) ?? [];

//   const [followings, setFollowings] = useState<
//     (FollowingData & { id: string; ref: DocumentReference })[]
//   >([]);

//   const followerIds = followings.map(({ followerId }) => followerId);

//   useEffect(() => {
//     getDocs(query(followingRef(db), where("followerId", "==", currentUser.id))).then((res) =>
//       setFollowings(res.docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() })))
//     );
//   }, []);

//   const toggleFollow = (followerId: string) => {
//     const targetFollower = followings.find((following) => following.followerId === followerId);
//     if (targetFollower) {
//       return deleteDoc(targetFollower.ref);
//     } else {
//       return addDoc(followingRef(db), {
//         followerId: currentUser.id,
//         followedId: ,
//         createdAt: Timestamp.now(),
//       });
//     }
//   };

//   return { users, followerIds, toggleFollow };
// };

// export const Users: VFC = () => {
//   const { users, followerIds, toggleFollow } = useUsers();

//   return (
//     <Stack>
//       <Box alignSelf="center" fontWeight="bold">
//         Users
//       </Box>
//       {users.length && (
//         <AppList>
//           {users.map((user) => (
//             <AppListItem key={user.id}>
//               <Flex justifyContent="space-between">
//                 <Box fontWeight="bold">{user.displayName}</Box>
//                 {followerIds.includes(user.id) ? (
//                   <Button size="xs" onClick={() => toggleFollow(user.id)}>
//                     unfollow
//                   </Button>
//                 ) : (
//                   <Button size="xs" onClick={() => toggleFollow(user.id)}>
//                     follow
//                   </Button>
//                 )}
//               </Flex>
//             </AppListItem>
//           ))}
//         </AppList>
//       )}
//     </Stack>
//   );
// };

export const Users: VFC = () => {
  return <Box>Mock</Box>;
};
