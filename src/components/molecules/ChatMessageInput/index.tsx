"use client";

import {Button, Icon, Modal, Textarea} from "@/components/atoms";
import { useAutoResizeTextArea, useCategory, useChat, useUser } from "@/hooks";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FC, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ActionButton, ConnectBankAction, FocusAssistantPopover } from "@/components/molecules";
import { ActionButtonsGroupMobile } from "@/components/organisms/ActionButtonsGroup";
import { Category } from "@/lib/store/features/category/categorySlice";
import clsx from "clsx";
import {MOCK_USER_ID} from "@/lib/store/features/chat/chatSlice";

interface ChatMessageInputProps {
  handleClose?: () => void;
  isDark?: boolean;
  category?: string;
}

const ChatMessageInput: FC<ChatMessageInputProps> = ({ handleClose, isDark = false }) => {
  const { user } = useUser();
  const router = useRouter();
  const {
    createChat,
    sendChatQuery,
    createMessage,
    handleResetChat,
    chatId,
    history,
    isLoading,
    setIsLoadingSendQuery,
    chatCategory,
      messages
  } = useChat();
  const { category } = useCategory();

  const [
    tempValue,
    setTempValue
  ] = useState("")

  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage Popover
  const textareaRef = useAutoResizeTextArea();
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleClosePopup = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsPopupOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
      setIsPopupOpen(false);
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const onSubmit = async (value: string) => {
    if (!isLoading) {
      setIsLoadingSendQuery(true);
      setMessage("");
      handleClose && handleClose();
      const userId = user?.id || MOCK_USER_ID;
      if (value && userId) {
        let currentChatId = chatId;
        let currentChatCategory = chatCategory;
        if (handleClose) {
          handleResetChat();
        }
        if (!currentChatId || handleClose) {
          const chat = await createChat(userId, value, category ? category : Category.ASSISTANT);
          currentChatId = chat.payload.id;
          router.push(`/dashboard/chat/${currentChatId}`, undefined);
        }
        if (currentChatId) {
          createMessage({
            chat_id: currentChatId,
            user_id: userId,
            content: value,
            message_type: "user",
            is_processed: true,
          });
          const data: any = await sendChatQuery(
            `${userId}`,
            currentChatId,
            history,
            value,
            user?.selected_country === "ZA" ? "yodlee" : "plaid",
            category ? category : Category.ASSISTANT
          );
          if (data?.error) {
            toast.error(data.error.message);
          } else {
            createMessage({
              chat_id: currentChatId,
              user_id: userId,
              // content: data.payload.output.text || data.payload.output,
              content: JSON.stringify(data.payload.output),
              message_type: "bot",
              is_processed: true,
              calculations: JSON.stringify(data.payload.calculations),
            });
          }
        }
      }
      setIsLoadingSendQuery(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (window.innerWidth > 768) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (form) {
          const formData = new FormData(form);
          const value = formData.get("message") as string;

          onSubmit(value);
        }
      }
    }
  };

  const setTextareaRef = (element: HTMLTextAreaElement) => {
    if (element && window.innerWidth > 1024) {
      element.focus();
      (textareaRef.current as any) = element;
    }
  };

  return (
      <>
        <svg width="142" height="21" viewBox="0 0 142 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_3518_41980)">
            <path
                d="M0 10.6719C0 5.14903 4.47715 0.671875 10 0.671875H21C26.5228 0.671875 31 5.14903 31 10.6719C31 16.1947 26.5228 20.6719 21 20.6719H10C4.47715 20.6719 0 16.1947 0 10.6719Z"
                fill="#FAFAFA"/>
            <g filter="url(#filter0_d_3518_41980)">
              <rect x="2" y="2.67188" width="16" height="16" rx="8" fill="white"/>
              <rect x="2.5" y="3.17188" width="15" height="15" rx="7.5" stroke="#E4E4E7"/>
            </g>
          </g>
          <path
              d="M0.5 10.6719C0.5 5.42517 4.75329 1.17188 10 1.17188H21C26.2467 1.17188 30.5 5.42517 30.5 10.6719C30.5 15.9186 26.2467 20.1719 21 20.1719H10C4.75329 20.1719 0.5 15.9186 0.5 10.6719Z"
              stroke="#E4E4E7"/>
          <path
              d="M47.6667 9.33854V4.67188L41.6667 12.0052H46.3334L46.3334 16.6719L52.3334 9.33854L47.6667 9.33854Z"
              stroke="#9CA3AF" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
          <path
              d="M66.625 8.09233C66.5644 7.55445 66.3144 7.13778 65.875 6.84233C65.4356 6.54309 64.8826 6.39347 64.2159 6.39347C63.7386 6.39347 63.3258 6.46922 62.9773 6.62074C62.6288 6.76847 62.358 6.97301 62.1648 7.23438C61.9754 7.49195 61.8807 7.78551 61.8807 8.11506C61.8807 8.39157 61.9451 8.63021 62.0739 8.83097C62.2064 9.03172 62.3788 9.20028 62.5909 9.33665C62.8068 9.46922 63.0379 9.58097 63.2841 9.67188C63.5303 9.759 63.767 9.83097 63.9943 9.88778L65.1307 10.1832C65.5019 10.2741 65.8826 10.3973 66.2727 10.5526C66.6629 10.7079 67.0246 10.9124 67.358 11.1662C67.6913 11.42 67.9602 11.7344 68.1648 12.1094C68.3731 12.4844 68.4773 12.9332 68.4773 13.456C68.4773 14.1151 68.3068 14.7003 67.9659 15.2116C67.6288 15.723 67.1383 16.1264 66.4943 16.4219C65.8542 16.7173 65.0795 16.8651 64.1705 16.8651C63.2992 16.8651 62.5455 16.7268 61.9091 16.4503C61.2727 16.1738 60.7746 15.7817 60.4148 15.2741C60.0549 14.7628 59.8561 14.1567 59.8182 13.456H61.5795C61.6136 13.8764 61.75 14.2268 61.9886 14.5071C62.2311 14.7836 62.5398 14.9901 62.9148 15.1264C63.2936 15.259 63.7083 15.3253 64.1591 15.3253C64.6553 15.3253 65.0966 15.2476 65.483 15.0923C65.8731 14.9332 66.1799 14.7135 66.4034 14.4332C66.6269 14.1491 66.7386 13.8177 66.7386 13.4389C66.7386 13.0942 66.6402 12.812 66.4432 12.5923C66.25 12.3726 65.9867 12.1908 65.6534 12.0469C65.3239 11.9029 64.9508 11.776 64.5341 11.6662L63.1591 11.2912C62.2273 11.0374 61.4886 10.6643 60.9432 10.1719C60.4015 9.67945 60.1307 9.02794 60.1307 8.21733C60.1307 7.54687 60.3125 6.96165 60.6761 6.46165C61.0398 5.96165 61.5322 5.57339 62.1534 5.29688C62.7746 5.01657 63.4754 4.87642 64.2557 4.87642C65.0436 4.87642 65.7386 5.01468 66.3409 5.29119C66.947 5.56771 67.4242 5.94839 67.7727 6.43324C68.1212 6.9143 68.303 7.46733 68.3182 8.09233H66.625ZM75.9673 13.0526V7.9446H77.6719V16.6719H76.0014V15.1605H75.9105C75.7098 15.6264 75.3878 16.0147 74.9446 16.3253C74.5052 16.6321 73.9579 16.7855 73.3026 16.7855C72.742 16.7855 72.2457 16.6624 71.8139 16.4162C71.3859 16.1662 71.0488 15.7969 70.8026 15.3082C70.5601 14.8196 70.4389 14.2154 70.4389 13.4957V7.9446H72.1378V13.2912C72.1378 13.8859 72.3026 14.3594 72.6321 14.7116C72.9616 15.0639 73.3897 15.2401 73.9162 15.2401C74.2344 15.2401 74.5507 15.1605 74.8651 15.0014C75.1832 14.8423 75.4465 14.6018 75.6548 14.2798C75.867 13.9579 75.9711 13.5488 75.9673 13.0526ZM83.6136 20.1264C82.9205 20.1264 82.3239 20.0355 81.8239 19.8537C81.3277 19.6719 80.9223 19.4313 80.608 19.1321C80.2936 18.8329 80.0587 18.5052 79.9034 18.1491L81.3636 17.5469C81.4659 17.7135 81.6023 17.8897 81.7727 18.0753C81.947 18.2647 82.1818 18.4257 82.4773 18.5582C82.7765 18.6908 83.161 18.7571 83.6307 18.7571C84.2746 18.7571 84.8068 18.5999 85.2273 18.2855C85.6477 17.9749 85.858 17.4787 85.858 16.7969V15.081H85.75C85.6477 15.2666 85.5 15.473 85.3068 15.7003C85.1174 15.9276 84.8561 16.1245 84.5227 16.2912C84.1894 16.4579 83.7557 16.5412 83.2216 16.5412C82.5322 16.5412 81.911 16.3802 81.358 16.0582C80.8087 15.7325 80.3731 15.2533 80.0511 14.6207C79.733 13.9844 79.5739 13.2022 79.5739 12.2741C79.5739 11.3461 79.7311 10.5507 80.0455 9.88778C80.3636 9.22491 80.7992 8.71733 81.3523 8.36506C81.9053 8.009 82.5322 7.83097 83.233 7.83097C83.7746 7.83097 84.2121 7.92188 84.5455 8.10369C84.8788 8.28172 85.1383 8.49006 85.3239 8.72869C85.5133 8.96733 85.6591 9.17756 85.7614 9.35938H85.8864V7.9446H87.5511V16.8651C87.5511 17.6151 87.3769 18.2306 87.0284 18.7116C86.6799 19.1927 86.2083 19.5488 85.6136 19.7798C85.0227 20.0109 84.3561 20.1264 83.6136 20.1264ZM83.5966 15.1321C84.0852 15.1321 84.4981 15.0185 84.8352 14.7912C85.1761 14.5601 85.4337 14.2306 85.608 13.8026C85.786 13.3707 85.875 12.8537 85.875 12.2514C85.875 11.6643 85.7879 11.1473 85.6136 10.7003C85.4394 10.2533 85.1837 9.90483 84.8466 9.65483C84.5095 9.40104 84.0928 9.27415 83.5966 9.27415C83.0852 9.27415 82.6591 9.40672 82.3182 9.67188C81.9773 9.93324 81.7197 10.2893 81.5455 10.7401C81.375 11.1908 81.2898 11.6946 81.2898 12.2514C81.2898 12.8234 81.3769 13.3253 81.5511 13.7571C81.7254 14.1889 81.983 14.526 82.3239 14.7685C82.6686 15.0109 83.0928 15.1321 83.5966 15.1321ZM93.4886 20.1264C92.7955 20.1264 92.1989 20.0355 91.6989 19.8537C91.2027 19.6719 90.7973 19.4313 90.483 19.1321C90.1686 18.8329 89.9337 18.5052 89.7784 18.1491L91.2386 17.5469C91.3409 17.7135 91.4773 17.8897 91.6477 18.0753C91.822 18.2647 92.0568 18.4257 92.3523 18.5582C92.6515 18.6908 93.036 18.7571 93.5057 18.7571C94.1496 18.7571 94.6818 18.5999 95.1023 18.2855C95.5227 17.9749 95.733 17.4787 95.733 16.7969V15.081H95.625C95.5227 15.2666 95.375 15.473 95.1818 15.7003C94.9924 15.9276 94.7311 16.1245 94.3977 16.2912C94.0644 16.4579 93.6307 16.5412 93.0966 16.5412C92.4072 16.5412 91.786 16.3802 91.233 16.0582C90.6837 15.7325 90.2481 15.2533 89.9261 14.6207C89.608 13.9844 89.4489 13.2022 89.4489 12.2741C89.4489 11.3461 89.6061 10.5507 89.9205 9.88778C90.2386 9.22491 90.6742 8.71733 91.2273 8.36506C91.7803 8.009 92.4072 7.83097 93.108 7.83097C93.6496 7.83097 94.0871 7.92188 94.4205 8.10369C94.7538 8.28172 95.0133 8.49006 95.1989 8.72869C95.3883 8.96733 95.5341 9.17756 95.6364 9.35938H95.7614V7.9446H97.4261V16.8651C97.4261 17.6151 97.2519 18.2306 96.9034 18.7116C96.5549 19.1927 96.0833 19.5488 95.4886 19.7798C94.8977 20.0109 94.2311 20.1264 93.4886 20.1264ZM93.4716 15.1321C93.9602 15.1321 94.3731 15.0185 94.7102 14.7912C95.0511 14.5601 95.3087 14.2306 95.483 13.8026C95.661 13.3707 95.75 12.8537 95.75 12.2514C95.75 11.6643 95.6629 11.1473 95.4886 10.7003C95.3144 10.2533 95.0587 9.90483 94.7216 9.65483C94.3845 9.40104 93.9678 9.27415 93.4716 9.27415C92.9602 9.27415 92.5341 9.40672 92.1932 9.67188C91.8523 9.93324 91.5947 10.2893 91.4205 10.7401C91.25 11.1908 91.1648 11.6946 91.1648 12.2514C91.1648 12.8234 91.2519 13.3253 91.4261 13.7571C91.6004 14.1889 91.858 14.526 92.1989 14.7685C92.5436 15.0109 92.9678 15.1321 93.4716 15.1321ZM103.466 16.848C102.606 16.848 101.866 16.6643 101.244 16.2969C100.627 15.9257 100.15 15.4048 99.8125 14.7344C99.4792 14.0601 99.3125 13.2704 99.3125 12.3651C99.3125 11.4711 99.4792 10.6832 99.8125 10.0014C100.15 9.3196 100.619 8.78741 101.222 8.40483C101.828 8.02225 102.536 7.83097 103.347 7.83097C103.839 7.83097 104.316 7.91241 104.778 8.07528C105.241 8.23816 105.655 8.49384 106.023 8.84233C106.39 9.19081 106.68 9.64347 106.892 10.2003C107.104 10.7533 107.21 11.4257 107.21 12.2173V12.8196H100.273V11.5469H105.545C105.545 11.0999 105.455 10.7041 105.273 10.3594C105.091 10.0109 104.835 9.73627 104.506 9.53551C104.18 9.33475 103.797 9.23438 103.358 9.23438C102.881 9.23438 102.464 9.3518 102.108 9.58665C101.756 9.81771 101.483 10.1207 101.29 10.4957C101.1 10.867 101.006 11.2704 101.006 11.706V12.7003C101.006 13.2836 101.108 13.7798 101.312 14.1889C101.521 14.598 101.811 14.9105 102.182 15.1264C102.553 15.3385 102.987 15.4446 103.483 15.4446C103.805 15.4446 104.098 15.3991 104.364 15.3082C104.629 15.2135 104.858 15.0734 105.051 14.8878C105.244 14.7022 105.392 14.473 105.494 14.2003L107.102 14.4901C106.973 14.9635 106.742 15.3783 106.409 15.7344C106.08 16.0866 105.665 16.3613 105.165 16.5582C104.669 16.7514 104.102 16.848 103.466 16.848ZM115.635 10.0753L114.095 10.348C114.031 10.151 113.929 9.96354 113.788 9.78551C113.652 9.60748 113.466 9.46165 113.232 9.34801C112.997 9.23437 112.703 9.17756 112.351 9.17756C111.87 9.17756 111.468 9.28551 111.146 9.50142C110.824 9.71354 110.663 9.98816 110.663 10.3253C110.663 10.617 110.771 10.8518 110.987 11.0298C111.203 11.2079 111.552 11.3537 112.033 11.4673L113.419 11.7855C114.222 11.9711 114.821 12.2571 115.214 12.6435C115.608 13.0298 115.805 13.5317 115.805 14.1491C115.805 14.6719 115.654 15.1378 115.351 15.5469C115.052 15.9522 114.633 16.2704 114.095 16.5014C113.561 16.7325 112.942 16.848 112.237 16.848C111.26 16.848 110.463 16.6397 109.845 16.223C109.228 15.8026 108.849 15.206 108.709 14.4332L110.351 14.1832C110.453 14.6113 110.663 14.9351 110.982 15.1548C111.3 15.3707 111.714 15.4787 112.226 15.4787C112.783 15.4787 113.228 15.3632 113.561 15.1321C113.894 14.8973 114.061 14.6113 114.061 14.2741C114.061 14.0014 113.959 13.7723 113.754 13.5866C113.554 13.401 113.245 13.2609 112.828 13.1662L111.351 12.8423C110.536 12.6567 109.934 12.3613 109.544 11.956C109.158 11.5507 108.964 11.0374 108.964 10.4162C108.964 9.90104 109.108 9.45028 109.396 9.06392C109.684 8.67756 110.082 8.37642 110.589 8.16051C111.097 7.94081 111.679 7.83097 112.334 7.83097C113.277 7.83097 114.019 8.03551 114.561 8.4446C115.103 8.84991 115.461 9.39347 115.635 10.0753ZM121.747 7.9446V9.30824H116.98V7.9446H121.747ZM118.259 5.85369H119.957V14.1094C119.957 14.4389 120.007 14.687 120.105 14.8537C120.204 15.0166 120.33 15.1283 120.486 15.1889C120.645 15.2457 120.817 15.2741 121.003 15.2741C121.139 15.2741 121.259 15.2647 121.361 15.2457C121.463 15.2268 121.543 15.2116 121.599 15.2003L121.906 16.6037C121.808 16.6416 121.668 16.6795 121.486 16.7173C121.304 16.759 121.077 16.7817 120.804 16.7855C120.357 16.7931 119.94 16.7135 119.554 16.5469C119.168 16.3802 118.855 16.1226 118.616 15.7741C118.378 15.4257 118.259 14.9882 118.259 14.4616V5.85369ZM127.294 16.848C126.434 16.848 125.694 16.6643 125.072 16.2969C124.455 15.9257 123.978 15.4048 123.641 14.7344C123.307 14.0601 123.141 13.2704 123.141 12.3651C123.141 11.4711 123.307 10.6832 123.641 10.0014C123.978 9.3196 124.447 8.78741 125.05 8.40483C125.656 8.02225 126.364 7.83097 127.175 7.83097C127.667 7.83097 128.144 7.91241 128.607 8.07528C129.069 8.23816 129.483 8.49384 129.851 8.84233C130.218 9.19081 130.508 9.64347 130.72 10.2003C130.932 10.7533 131.038 11.4257 131.038 12.2173V12.8196H124.101V11.5469H129.374C129.374 11.0999 129.283 10.7041 129.101 10.3594C128.919 10.0109 128.663 9.73627 128.334 9.53551C128.008 9.33475 127.625 9.23438 127.186 9.23438C126.709 9.23438 126.292 9.3518 125.936 9.58665C125.584 9.81771 125.311 10.1207 125.118 10.4957C124.929 10.867 124.834 11.2704 124.834 11.706V12.7003C124.834 13.2836 124.936 13.7798 125.141 14.1889C125.349 14.598 125.639 14.9105 126.01 15.1264C126.381 15.3385 126.815 15.4446 127.311 15.4446C127.633 15.4446 127.927 15.3991 128.192 15.3082C128.457 15.2135 128.686 15.0734 128.879 14.8878C129.072 14.7022 129.22 14.473 129.322 14.2003L130.93 14.4901C130.802 14.9635 130.571 15.3783 130.237 15.7344C129.908 16.0866 129.493 16.3613 128.993 16.5582C128.497 16.7514 127.93 16.848 127.294 16.848ZM136.19 16.8423C135.486 16.8423 134.857 16.6624 134.304 16.3026C133.755 15.9389 133.323 15.4219 133.009 14.7514C132.698 14.0772 132.543 13.2685 132.543 12.3253C132.543 11.3821 132.7 10.5753 133.014 9.90483C133.332 9.23437 133.768 8.72112 134.321 8.36506C134.874 8.009 135.501 7.83097 136.202 7.83097C136.743 7.83097 137.179 7.92188 137.509 8.10369C137.842 8.28172 138.099 8.49006 138.281 8.72869C138.467 8.96733 138.611 9.17756 138.713 9.35938H138.815V5.03551H140.514V16.6719H138.855V15.3139H138.713C138.611 15.4995 138.463 15.7116 138.27 15.9503C138.08 16.1889 137.819 16.3973 137.486 16.5753C137.152 16.7533 136.721 16.8423 136.19 16.8423ZM136.565 15.3935C137.054 15.3935 137.467 15.2647 137.804 15.0071C138.145 14.7457 138.402 14.384 138.577 13.9219C138.755 13.4598 138.844 12.9219 138.844 12.3082C138.844 11.7022 138.757 11.1719 138.582 10.7173C138.408 10.2628 138.152 9.90862 137.815 9.65483C137.478 9.40104 137.062 9.27415 136.565 9.27415C136.054 9.27415 135.628 9.40672 135.287 9.67188C134.946 9.93703 134.688 10.2988 134.514 10.7571C134.344 11.2154 134.259 11.7325 134.259 12.3082C134.259 12.8916 134.346 13.4162 134.52 13.8821C134.694 14.348 134.952 14.7173 135.293 14.9901C135.637 15.259 136.062 15.3935 136.565 15.3935Z"
              fill="#9CA3AF"/>
          <defs>
            <filter id="filter0_d_3518_41980" x="0" y="1.67188" width="20" height="20"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix"
                             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix"
                       result="effect1_dropShadow_3518_41980"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3518_41980"
                       result="shape"/>
            </filter>
            <clipPath id="clip0_3518_41980">
              <path
                  d="M0 10.6719C0 5.14903 4.47715 0.671875 10 0.671875H21C26.5228 0.671875 31 5.14903 31 10.6719C31 16.1947 26.5228 20.6719 21 20.6719H10C4.47715 20.6719 0 16.1947 0 10.6719Z"
                  fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <form
            action={messages.length === 0 ? (formData) => {
              const value = formData.get("message") as string;

              setTempValue(value)
            } : (formData) => {
              const value = formData.get("message") as string;

              return onSubmit(value)
            }}
            className="rounded-full flex justify-between border-2 items-center bg-transparent  relative mt-[16px]"
        >
          <div className="absolute">
            <button
                type="button"
                className="w-10 h-10 pl-3 pt-2.5 pb-3 -mr-2 flex"
            >
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1.67188V7.67188M7 7.67188V13.6719M7 7.67188H13M7 7.67188L1 7.67187"
                      stroke="#515AD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

          </div>

          <Textarea
              ref={setTextareaRef}
              value={message}
              onChange={handleChange}
              className={cn(
                  "lg:pl-4 h-16 focus:outline-none justify-center text-base border-none resize-none  py-5 pr-16 !pl-10",
              )}
              placeholder="Ask anything..."
              name="message"
              onKeyDown={handleEnter}
          />
          <div className="flex items-center justify-center gap-3 py-3 absolute right-4 top-1/2 -translate-y-1/2">
            <Button size="xl" type="submit" className="w-10 h-10 p-3">
              {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin"/>
              ) : (
                  <Icon type="ArrowRightIcon" className="size-4 text-white"/>
              )}
            </Button>
          </div>
        </form>
        <Modal
            classes={{
              background: "z-[10000]",
              wrapper: "z-[10000]",
              container: "bg-white rounded-[24px] !w-fit !max-w-[600px] !z-[10000]",
            }} open={!!tempValue} onClose={() => {


          onSubmit(tempValue)
          setTempValue("")
        }}>
          <Modal.Header classes={{
            wrapperHeader: "flex flex-col justify-center items-center mb-[48px]",
          }}>
            <img src="/liberty-modal-2.svg"/>
          </Modal.Header>
          <Modal.Body>
            <p className="text-[12px] text-[#9CA3AF] mt-[24px]">
              Please note that all information and guidance I provide are for educational and informational purposes
              only and should not be considered financial advice. If you require personalized assistance or have
              specific financial concerns, you can request to speak with an accredited financial advisor at any time.
              I`m here to guide you to the right resources and support your financial learning journey.
            </p>
            <p className="text-[12px] text-[#9CA3AF]">
              For more details on how we handle your information, please see our <a
                href="https://www.libertykenya.co.ke/privacy-statement.php" target="_blank"
                className="text-[#515AD9] underline"
            >Privacy Statement.</a>
            </p>
          </Modal.Body>
        </Modal>
      </>
  );
};

export {ChatMessageInput};
