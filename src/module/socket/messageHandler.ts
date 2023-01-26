import { MESSAGESTATUS } from "../../constants";
import logger from "../../utils/logger";
import { updateReceiverChatList, updateSenderChatList } from "../../utils/updateChatList";
import MessageService from "../chat/service";
import UserService from "../user/service";

const messageHandler = (io: any, socket: any) => {
    const storeMessage = async (payload: any) => {
        const { senderId, receiverId, message, type } = payload;
        // if (
        //   !senderId ||
        //   !type ||
        //   !MESSAGETYPE[type.toUpperCase()] ||
        //   !mongoose.Types.ObjectId.isValid(senderId)
        // ) {
        //   return;
        // }
        logger(module).info(
          `storeMessage: ${JSON.stringify({ senderId, receiverId })}`
        );
        const query: any = { sender: senderId, message,  type };
        const findSender = await UserService.findUserById({ _id: senderId });

        if (!findSender) {
        logger(module).info(`storeMessage: ${senderId} does not exist`);
        return;
        }
        const findReceiver = await UserService.findUserById({ _id: receiverId });

        if (!findReceiver) {
            logger(module).info(`storeMessage: ${receiverId} does not exist`);
            return;
        }
        query.receiver = receiverId;
        const storeMessage = await MessageService.storeMessage(query);
        const storedMessage = await MessageService.findMessageById(storeMessage.id);
        socket.emit(senderId, storedMessage);
        if (query.receiver) io.emit(receiverId, storedMessage);
        // if (query.group) io.emit(groupId, storedMessage);
        updateSenderChatList(io, senderId);
        updateReceiverChatList(io, receiverId);
        return;
    }
    const deliverMessage = async (messageId: string) => {
        
        const findMessage = await MessageService.findMessageById(messageId);
        if (!findMessage) {
          logger(module).info(`Message does not exist`);
          return;
        }
        const message = await MessageService.updateMessageStatus(
          findMessage,
          MESSAGESTATUS.DELIVERED
        );
        io.emit(findMessage.sender, message);
        return;
      };
    
      const readMessage = async (messageId: string) => {
        
        const findMessage = await MessageService.findMessageById(messageId);
        if (!findMessage) {
          logger(module).info(`Message does not exist`);
          return;
        }
        const message = await MessageService.updateMessageStatus(
          findMessage,
          MESSAGESTATUS.VIEWED
        );
        io.emit(findMessage.sender, message);
        return;
      };
    
      socket.on("message:store", storeMessage);
      socket.on("message:deliver", deliverMessage);
      socket.on("message:read", readMessage);
} 

export default messageHandler;