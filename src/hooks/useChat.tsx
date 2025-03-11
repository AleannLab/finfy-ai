"use client";

import { useCallback, useState } from "react";
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
  setStreamMessage,
  setMessages,
  createMessageInDB,
} from "@/lib/store/features/chat/chatSlice";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAppSelector } from "@/lib/store/hooks";

export const useChat = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const chatState = useSelector((state: RootState) => state.chat);
  const prompt = useAppSelector((state) => state.suggest.prompt);


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
      // if (data.message_type === "bot") {
        const newFiles = data?.files ? 
        data?.files.map((file: any)=> {
          const filePath = `uploads/${file.path}`;

          const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        
          const publicURL = data?.publicUrl; // Correctly access publicUrl

          return {
            file,
            preview: publicURL || ""
          }
        })
        : null;
        const message = {
          ...data,
          files: newFiles
        }
      createMessageInDB(message)
      // } else {
      //   await dispatch(createMessage(data));
      // }
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
      files = []
    }: {
      message: string;
      userId: string;
      assistantId: string;
      threadIdFromURL?: string | null;
      handleClose?: () => void;
      handleResetChat?: () => void;
      files?: any
    }) => {
      setIsLoadingSendQuery(true);
      let accumulatedResponse = "";
      let threadId = threadIdFromURL || null;
      let isFirstStream = true;
      let currentMessages = [...chatState.messages]; // Use a local copy of messages
      if (files?.length) {
        files.forEach((file: any) => {
          file.name = `${Date.now()}`;
        });
      }

      
      if (!message || !userId) {
        console.error("Missing message or userId");
        setIsLoadingSendQuery(false);
        return;
      }

      // Add user message to local state immediately
      const newUserMessage = {
        content: message,
        date: `${Date.now()}`,
        message_type: "user",
        files: files?.Dropzone?.map((file: File)=> {
          return {
            ...file,
            saverSRC: `/uploads/${file?.name}`
          }

        }),
      };
      currentMessages = [...currentMessages, newUserMessage];
      dispatch(setMessages(currentMessages));

      if (threadId) {
        await fetchCreateMessage({
          chat_id: threadId,
          user_id: userId,
          content: message,
          message_type: "user",
          is_processed: true,
          files: files?.Dropzone?.map((file: File)=> {
            return {
              ...file,
              saverSRC: `/uploads/${file?.name}`
            }
  
          }),
        });
      }

      try {
        if (handleClose) {
          handleClose();
        }


        // const response = await fetch("/api/openai", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     message,
        //     assistantId,
        //     chatId: threadId,
        //   }),
        // });

        const formData = new FormData();
        formData.append("message", message);
        formData.append("assistantId", assistantId);
        formData.append("chatId", threadId || "");
        formData.append("additionalPrompt", prompt || "");

        if (files?.Dropzone?.length > 0) {
          // formData.append("file", files?.Dropzone?.[0]);
          for (const file of files?.Dropzone) {
            formData.append("file", file);
          }
        }

        const response = await fetch("/api/openai", {
          method: "POST",
          body: formData,
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (reader) {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            // Check for threadId and handle thread creation logic
            if (chunk.includes("threadId")) {
              const cleanChunk = chunk.startsWith("data:") ? chunk.slice(5).trim() : chunk;

              try {
                const json = JSON.parse(cleanChunk);
                const type = pathname.includes("tutor") ? "tutor" : pathname.includes("teacher") ? "teacher" : "career-coach";


                if (json.threadId && !pathname.includes("thread")) {
                  threadId = json.threadId;
                  createChatCallback(userId, message.slice(0, 30) + "...", threadId, type, assistantId).then(async () => {
                    await fetchCreateMessage({
                      chat_id: threadId,
                      user_id: userId,
                      content: message,
                      message_type: "user",
                      is_processed: true,
                      files: files?.Dropzone?.map((file: File)=> {
                        return {
                          ...file,
                          saverSRC: `/uploads/${file.name}`
                        }
              
                      }),
                    }).then(() => {
                      router.push(`${pathname}/chat/${threadId}`, undefined);
                    });
                  });
                }

                if (json.message) {
                  accumulatedResponse += json.message;
                  // Incrementally update the assistant's message
                  if (isFirstStream) {
                    isFirstStream = false;
                    currentMessages = [
                      ...currentMessages,
                      {
                        content: accumulatedResponse,
                        date: `${Date.now()}`,
                        message_type: "bot",
                      },
                    ];
                  } else {
                    // Replace the last message with the updated content
                    currentMessages = [
                      ...currentMessages.slice(0, -1),
                      {
                        content: accumulatedResponse,
                        date: `${Date.now()}`,
                        message_type: "bot",
                      },
                    ];
                  }

                  dispatch(setMessages(currentMessages)); // Update state with new messages
                  dispatch(setStreamMessage(accumulatedResponse));
                }
              } catch (error) {
                console.error("Error parsing chunk:", error);
              }
            } else {
              accumulatedResponse += chunk;
              // Incrementally update the assistant's response message
              if (isFirstStream) {
                isFirstStream = false;
                currentMessages = [
                  ...currentMessages,
                  {
                    content: accumulatedResponse,
                    date: `${Date.now()}`,
                    message_type: "bot",
                  },
                ];
              } else {
                // Replace the last message with the updated content
                currentMessages = [
                  ...currentMessages.slice(0, -1),
                  {
                    content: accumulatedResponse,
                    date: `${Date.now()}`,
                    message_type: "bot",
                  },
                ];
              }

              dispatch(setMessages(currentMessages)); // Update state with new messages
              dispatch(setStreamMessage(accumulatedResponse));
            }
          }
        }

        accumulatedResponse = accumulatedResponse.trim();

        // Finalize the assistant's message
        currentMessages = [
          ...currentMessages.slice(0, -1),
          {
            content: accumulatedResponse,
            date: `${Date.now()}`,
            message_type: "bot",
          },
        ];
        dispatch(setMessages(currentMessages));
        dispatch(setStreamMessage(""));

        if (threadId) {
          await fetchCreateMessage({
            chat_id: threadId,
            user_id: userId,
            content: accumulatedResponse,
            message_type: "bot",
            is_processed: true,
          });

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
    [dispatch, router, chatState.messages]
  );

  const submitChatFromAudioChat = useCallback(
    async ({
      messages,
      userId,
      assistantId,
      // threadIdFromURL,
      handleClose,
      handleResetChat,
    }: {
      messages: { role: string, message: string }[];
      userId: string | undefined;
      assistantId: string;
      handleClose?: () => void;
      handleResetChat?: () => void;
    }) => {
      setIsLoadingSendQuery(true);

      let threadId: string | null = null;

      if (!messages || !messages.length || !userId) {
        console.error("Missing message or userId");
        setIsLoadingSendQuery(false);
        return;
      }

      try {
        if (handleClose) {
          handleClose();
        }

        const dialogText = `Here is the context of our audio dialog:\n${messages
          .map(item => `${item.role}: ${item.message}`)
          .join(",\n")}. Save it to history of this chat`;

        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: dialogText,
            assistantId,
            chatId: null,
            additionalPrompt: prompt || ""
          }),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        if (reader) {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            if (chunk.includes("threadId")) {
              const cleanChunk = chunk.startsWith("data:") ? chunk.slice(5).trim() : chunk;

              try {
                const json = JSON.parse(cleanChunk);
                const type = pathname.includes("tutor") ? "tutor" : pathname.includes("teacher") ? "teacher" : "career-coach";

                if (json.threadId && !pathname.includes("thread")) {
                  threadId = json.threadId;
                  router.push(`${pathname}/chat/${threadId}`, undefined);
                  createChatCallback(userId, messages[0].message.slice(0, 30) + "...", threadId, type, assistantId);
                }
              } catch (error) {
                console.error("Error parsing chunk:", error);
              }
            }
          }
        }

        if (threadId) {
          const createMessagePromises = messages.map((msg, index) => {
            if (msg.message.trim().length > 0) {
              const createdAt = new Date();
              createdAt.setMilliseconds(createdAt.getMilliseconds() + index);
              return fetchCreateMessage({
                chat_id: threadId,
                user_id: userId,
                content: msg.message,
                message_type: msg.role,
                is_processed: true,
                created_at: createdAt.toISOString()
              });
            }
          });
          await Promise.all(createMessagePromises);
          await fetchMessagesForChatCallback(threadId);

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

  const sendAudioChatContext = useCallback(
    async ({
      messages,
      assistantId,
      threadId,
    }: {
      messages: { role: string, message: string }[];
      assistantId: string;
      threadId: string;
    }) => {
      try {
        const dialogText = `Here is the context of our audio dialog:\n${messages
          .map(item => `${item.role}: ${item.message}`)
          .join(",\n")}. Save it to history of this chat`;

        await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: dialogText,
            assistantId,
            chatId: threadId,
            additionalPrompt: prompt || ""
          }),
        });
      } catch (error) {
        console.error("Error in sendAudioChatContext:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
    []
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
    async (userId: string, title: string, chatId: any, type: string, assistantId: string) => {

      const data = await dispatch(createChat({ userId, title, chatId, type, assistantId }));
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
    streamMessage: chatState.streamMessage,
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
    submitChat,
    submitChatFromAudioChat,
    sendAudioChatContext
  };
};
