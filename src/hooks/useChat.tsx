"use client";

import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  sendChatQuery,
  createChat,
  fetchChatsByUserId,
  updateChat,
  deleteChat,
  fetchMessagesForChat,
  createMessage,
  resetChat,
  setIsLoadingSendMessage,
  setSuggestQuestions,
} from "@/lib/store/features/chat/chatSlice";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

export const useChat = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const chatState = useSelector((state: RootState) => state.chat);

  const fetchChatsCallback = useCallback(
    (user_id: string) => {
      dispatch(fetchChatsByUserId(user_id));
    },
    [dispatch]
  );

  const handleSetSuggestQuestions = useCallback(
    (suggests: any) => {
      dispatch(setSuggestQuestions(suggests));
    },
    [dispatch]
  );

  const handleResetChat = useCallback(() => {
    dispatch(resetChat());
  }, [dispatch]);

  const setIsLoadingSendQuery = useCallback(
    (loading: boolean) => {
      dispatch(setIsLoadingSendMessage(loading));
    },
    [dispatch]
  );

  const fetchMessagesForChatCallback = useCallback(
    async (chatId: string) => {
      await dispatch(fetchMessagesForChat(chatId));
    },
    [dispatch]
  );

  const fetchCreateMessage = useCallback(
    async (data: any) => {
      await dispatch(createMessage(data));
    },
    [dispatch]
  );

  const submitChat = useCallback(
    async ({
      message,
      userId,
      assistantId,
      threadIdFromURL,
      handleClose,
      handleResetChat,
    }: {
      message: string;
      userId: string;
      assistantId: string | null;
      threadIdFromURL?: string | null;
      handleClose?: () => void;
      handleResetChat?: () => void;
    }) => {
      setIsLoadingSendQuery(true);
  
      const savedInput = message;
      let accumulatedResponse = "";
      let threadId = threadIdFromURL || null;
  
      if (!message || !userId) {
        console.error("Missing message or userId");
        setIsLoadingSendQuery(false);
        return;
      }
  
      try {
        if (handleClose) {
          handleClose();
        }
  
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            assistantId,
            chatId: threadId,
          }),
        });
  
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
  
        if (reader) {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
  
            const chunk = decoder.decode(value, { stream: true });
  
            try {
              const json = JSON.parse(chunk);
              const type = pathname.includes("tutor") ? "tutor" : "career-coach";
  
              if (json.threadId && !pathname.includes("thread")) {
                threadId = json.threadId;
                router.push(`${pathname}/chat/${threadId}`, undefined);
                createChatCallback(userId, message.slice(0, 30) + "...", threadId, type);
              }
  
              if (json.message) {
                accumulatedResponse += json.message;
                console.log(`json.message .${json.message}.`)
              }
            } catch (error) {
              console.error("Error parsing chunk:", error);
              console.log("cleanChunk:", chunk)
              accumulatedResponse += chunk + "";
            }
          }
        }
  
        accumulatedResponse = accumulatedResponse.trim();
  
        if (threadId) {
          await fetchCreateMessage({
            chat_id: threadId,
            user_id: userId,
            content: savedInput,
            message_type: "user",
            is_processed: true,
          });
  
          await fetchCreateMessage({
            chat_id: threadId,
            user_id: userId,
            content: accumulatedResponse,
            message_type: "assistant",
            is_processed: true,
          });
  
          console.log("Message saved successfully");
        } else {
          toast.error("Thread ID not received. Please try again.");
        }
      } catch (error) {
        console.error("Error in submitChat:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoadingSendQuery(false);
      }
    },
    [dispatch, router]
  );
  

  // const submitChat = useCallback(
  //   async ({
  //     message,
  //     userId,
  //     assistantId,
  //     threadIdFromURL,
  //     handleClose,
  //     handleResetChat,
  //   }: {
  //     message: string;
  //     userId: string;
  //     assistantId: string | null;
  //     threadIdFromURL?: string | null;
  //     handleClose?: () => void;
  //     handleResetChat?: () => void;
  //   }) => {
  //     setIsLoadingSendQuery(true);

  //     const savedInput = message;
  //     let accumulatedResponse = "";
  //     let threadId = threadIdFromURL || null;

  //     if (!message || !userId) {
  //       console.error("Missing message or userId");
  //       setIsLoadingSendQuery(false);
  //       return;
  //     }

  //     try {
  //       if (handleClose) {
  //         handleClose();
  //       }

  //       const response = await fetch("/api/openai", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           message,
  //           assistantId,
  //           chatId: threadId,
  //         }),
  //       });

  //       const reader = response.body?.getReader();
  //       const decoder = new TextDecoder();

  //       if (reader) {
  //         while (true) {
  //           const { value, done } = await reader.read();
  //           if (done) break;

  //           const chunk = decoder.decode(value, { stream: true }).trim();
  //           const cleanChunk = chunk.startsWith("data:") ? chunk.slice(5).trim() : chunk;

  //           try {
  //             const json = JSON.parse(cleanChunk);
  //             const type = pathname.includes("tutor") ? "tutor" : "career-coach";
  //             if (json.threadId) {
  //               threadId = json.threadId;
  //               router.push(`${pathname}/chat/${threadId}`, undefined);
  //               createChatCallback(userId, message.slice(0, 30) + "...", threadId, type);
  //             }

  //             if (json.message) {
  //               accumulatedResponse += json.message + " ";
  //             }
  //           } catch (error) {
  //             console.error("Error parsing chunk:", error);
  //             accumulatedResponse += cleanChunk + " ";
  //           }
  //         }
  //       }

  //       accumulatedResponse = accumulatedResponse.trim();

  //       if (threadId) {
  //         await fetchCreateMessage({
  //           chat_id: threadId,
  //           user_id: userId,
  //           content: savedInput,
  //           message_type: "user",
  //           is_processed: true,
  //         });

  //         await fetchCreateMessage({
  //           chat_id: threadId,
  //           user_id: userId,
  //           content: accumulatedResponse,
  //           message_type: "assistant",
  //           is_processed: true,
  //         });

  //         console.log("Message saved successfully");
  //       } else {
  //         toast.error("Thread ID not received. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error in submitChat:", error);
  //       toast.error("Something went wrong. Please try again.");
  //     } finally {
  //       setIsLoadingSendQuery(false);
  //     }
  //   },
  //   [dispatch, router]
  // );

  const sendChatQueryCallback = useCallback(
    async (
      user_id: string,
      chat_id: string,
      history: string[],
      user_query: string
    ) => {
      const data = await dispatch(
        sendChatQuery({
          user_id,
          chat_id,
          history,
          user_query,
        })
      );
      return data;
    },
    [dispatch]
  );

  const createChatCallback = useCallback(
    async (userId: string, title: string, chatId: any, type: string ) => {

      const data = await dispatch(createChat({ userId, title, chatId, type }));
      return data;
    },
    [dispatch]
  );

  const updateChatCallback = useCallback(
    async (chatId: string, updateData: any) => {
      await dispatch(updateChat({ id: chatId, updateData }));
    },
    [dispatch]
  );

  const deleteChatCallback = useCallback(
    async (chatId: string) => {
      await dispatch(deleteChat(chatId));
    },
    [dispatch]
  );

  return {
    isLoading: chatState.loadingSendMessage,
    chats: chatState.chats,
    messages: chatState.messages,
    loading: chatState.loading,
    error: chatState.error,
    chatId: chatState.chat_id,
    setSuggestQuestions: handleSetSuggestQuestions,
    history: chatState.history,
    fetchChats: fetchChatsCallback,
    fetchMessagesForChat: fetchMessagesForChatCallback,
    sendChatQuery: sendChatQueryCallback,
    createChat: createChatCallback,
    updateChat: updateChatCallback,
    deleteChat: deleteChatCallback,
    createMessage: fetchCreateMessage,
    setIsLoadingSendQuery,
    handleResetChat,
    submitChat
  };
};
