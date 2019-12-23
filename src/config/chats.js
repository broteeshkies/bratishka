export const nataChatId = 80081115;
export const botovodChatId = -1001138695583;
export const mgbetaChatId = -1001042071273;
export const pornoChatId = -1001296980004;



export const mainChatId = __DEV__ ? botovodChatId : pornoChatId;
export const mediaChatId = __DEV__ ? botovodChatId : pornoChatId;
export const repostChatId = __DEV__ ? botovodChatId : mgbetaChatId;

export default { mainChatId, mediaChatId, repostChatId };