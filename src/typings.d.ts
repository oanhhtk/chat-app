export type UserDataType = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
};
export type RoomDataType = {
  id: string;
  name: string;
  descriptions: string;
  createdAt: string;
  members: UserDataType[];
};
