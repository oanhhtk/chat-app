import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { UserDataType } from "../typings";
import { auth } from "../firebase/config";

type AuthContextType = {
  user?: UserDataType | any;
  setUser?: (user: UserDataType) => void;
};
export const AuthContext = createContext<AuthContextType>({});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<Partial<UserDataType>>({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user: any) => {
      console.log("[From AuthProvider]", { user });
      if (user?.uid) {
        setUser(user as UserDataType);
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          // window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      console.log("reset");
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubcribed();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <Loading loading /> : <>{children}</>}
    </AuthContext.Provider>
  );
}
