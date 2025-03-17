'use client'
import { Button, Icon, SeparatorLine } from "@/components/atoms";
import { UserAvatarWithUpload } from "@/components/organisms";
import { useUser } from "@/hooks";
import { updateUser } from "@/lib/store/features/user/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { updatePassword } from "@/lib/supabase/actions"; // Assuming this action updates the user's profile
import { useState } from "react";
import toast from "react-hot-toast";

const ManageProfileTab = () => {
  const { user } = useUser(); // Assuming setUser updates local user state
  const [password, setPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [username, setUsername] = useState(user?.name || "");
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const handlePasswordChange = async () => {
    if (password) {
      try {
        const formData = new FormData();
        formData.set("password", password);

        const result = await updatePassword(formData);
        if (result.errorMessage) {
          toast.error(result.errorMessage);
          console.error(result.errorMessage);
        } else {
          console.log("Password updated successfully");
          toast.success("Password updated successfully");
        }
        setPassword("");
        setIsEditingPassword(false);
      } catch (error) {
        console.error("Failed to update password:", error);
      }
    }
    setIsEditingPassword(false);
  };

  const dispatch = useAppDispatch();

  const handleUsernameChange = async () => {
    if (username && username !== user?.name) {
      try {
        await dispatch(
          updateUser({
            name: username,
          })
        );

          toast.success("Username updated successfully");
          // setUser((prev: any) => ({ ...prev, name: username })); // Update local state
        setIsEditingUsername(false);
      } catch (error) {
        console.error("Failed to update username:", error);
        toast.error("Failed to update username");
      }
    } else {
      setIsEditingUsername(false);
    }
  };

  return (
    <>
      <div className="mt-8 w-full flex flex-col">
        <p className="my-4">Account</p>
        <div className="p-3 border w-full rounded-md bg-[#F9F9F9] border-[#666] text-[#000]">
          <div className="w-full flex items-center justify-between">
            <p>Avatar</p>
            <UserAvatarWithUpload />
          </div>
          <SeparatorLine />
          <div className="w-full flex justify-between">
            <p>Username</p>
            <div className="flex items-center gap-2 text-black">
              {isEditingUsername ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleUsernameChange}
                  autoFocus
                  className="border rounded-md border-none min-h-[28px] max-w-[200px] bg-transparent outline-none w-full"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span>{user?.name}</span>
                  <Button variant="ghost" onClick={() => setIsEditingUsername(true)}>
                    <Icon type="PenIcon" className="h-4 w-4 fill-grey-15" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <SeparatorLine />
          <div className="w-full flex justify-between">
            <p>Email</p>
            <p className="text-black">{user?.email}</p>
          </div>
          <SeparatorLine />
          <div className="w-full flex justify-between">
            <p>Password</p>
            <div className="flex items-center gap-2" style={{ minWidth: "120px" }}>
              {isEditingPassword ? (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordChange}
                  autoFocus
                  className="border rounded-md border-none min-h-[28px] max-w-[120px] bg-transparent outline-none w-full"
                  style={{
                    letterSpacing: "2px",
                    caretColor: "white",
                  }}
                />
              ) : (
                <div
                  className="flex items-center justify-end w-full"
                  style={{ letterSpacing: "2px" }}
                >
                  <span>**********</span>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditingPassword(true)}
                  >
                    <Icon type="PenIcon" className="h-4 w-4 fill-grey-15" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageProfileTab };
