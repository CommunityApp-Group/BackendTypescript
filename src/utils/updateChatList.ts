import mongoose from "mongoose";
import MessageService from "../module/chat/service";

const updateSenderChatList = async (
  io: any,
  senderId: mongoose.Types.ObjectId
) => {
  try {
    const senderChatList = await MessageService.getChatList(senderId);
    io.emit(`chatlist-update-${senderId}`, senderChatList);
  } catch (error) {
    console.log(error);
  }
};

const updateReceiverChatList = async (
  io: any,
  receiverId: mongoose.Types.ObjectId
) => {
  try {
    const receiverChatList = await MessageService.getChatList(receiverId);
    io.emit(`chatlist-update-${receiverId}`, receiverChatList);
  } catch (error) {
    console.log(error);
  }
};

export {
  updateReceiverChatList,
  updateSenderChatList,
};
