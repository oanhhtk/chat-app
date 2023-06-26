import React, { createContext, useContext, useMemo, useState } from "react";
import { COLLECTION } from "../firebase/collections";
import useFirestore from "../hooks/useFirestore";
import { RoomDataType, UserDataType } from "../typings";
import { AuthContext } from "./AuthProvider";

type AppContextType = {
  rooms: RoomDataType[];
  members: UserDataType[];
  selectedRoomId: string;
  setSelectedRoomId: (room: string) => void;
  selectedRoom: RoomDataType;
  scrollToLastElement: (elRef: any, list: any[]) => void;
};

export const AppContext = createContext<Partial<AppContextType>>({});

export default function AppProvider({ children }: any) {
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore(COLLECTION.ROOMS, roomsCondition);

  const selectedRoom: any = useMemo(() => {
    return rooms?.find((item: any) => item?.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  const userCondition = useMemo(
    () => ({
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom?.members,
    }),
    [selectedRoom?.members]
  );

  const members = useFirestore(COLLECTION.USERS, userCondition as any);

  const scrollToLastElement = (elRef: any, list: any[]) => {};

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        scrollToLastElement,
      }}
    >
      <>{children}</>
    </AppContext.Provider>
  );
}
