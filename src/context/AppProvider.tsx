import { WhereFilterOp } from "firebase/firestore";
import { createContext, useContext, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { RoomDataType } from "../typings";
import { AuthContext } from "./AuthProvider";
import { COLLECTION } from "../firebase/collections";

type AppContextType = {
  rooms: RoomDataType[];
  selectedRoomId: string;
  setSelectedRoomId: (room: string) => void;
  selectedRoom: RoomDataType;
};

export const AppContext = createContext<Partial<AppContextType>>({});

export default function AppProvider({ children }: any) {
  const { user } = useContext(AuthContext);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const conditionMemo = useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains" as WhereFilterOp,
      compareValue: user.uid,
    }),
    [user]
  );

  const rooms = useFirestore<RoomDataType>(COLLECTION.ROOMS, conditionMemo);

  const selectedRoom = useMemo(() => {
    return rooms?.find((item) => item.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  return (
    <AppContext.Provider
      value={{ rooms, selectedRoomId, setSelectedRoomId, selectedRoom }}
    >
      <>{children}</>
    </AppContext.Provider>
  );
}
