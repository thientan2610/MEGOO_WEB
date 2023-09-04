import React, { Component } from "react";

import SendbirdChat from "@sendbird/chat";
import {
  GroupChannelModule,
  GroupChannelFilter,
  GroupChannelListOrder,
  MessageFilter,
  MessageCollectionInitPolicy,
} from "@sendbird/chat/groupChannel";

import { SENDBIRD_INFO } from "../../features/constants/constants";

const sb = SendbirdChat.init({
  appId: SENDBIRD_INFO.appId,
  modules: [new GroupChannelModule()],
});

export const connectSendBird = async (USER_ID) => {
  try {
    await sb.connect(USER_ID);
    await sb.setChannelInvitationPreference(true);
  } catch (err) {
    console.log(err);
  }
};

export const setupUser = async (USER_ID, USER_NAME, AVATAR) => {
  const userUpdateParams = {};
  userUpdateParams.nickname = USER_NAME;
  userUpdateParams.userId = USER_ID;
  userUpdateParams.profileUrl = AVATAR;

  await sb.updateCurrentUserInfo(userUpdateParams);
};

export const createChannel = async (CHANNEL_NAME, AVATAR, userIdsToInvite) => {
  try {
    const groupChannelParams = {};
    groupChannelParams.invitedUserIds = userIdsToInvite;
    groupChannelParams.name = CHANNEL_NAME;
    groupChannelParams.coverUrl = AVATAR;
    groupChannelParams.operatorUserIds = userIdsToInvite;

    const groupChannel = await sb.groupChannel.createChannel(
      groupChannelParams
    );

    return [groupChannel, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserChannel = async (CHANNEL_URL) => {
  const channel = await sb.groupChannel.getChannel(CHANNEL_URL);
  return channel;
};

export const inviteMember = async (CHANNEL_URL, USER_ID) => {
  let userIds = [];
  userIds.push(USER_ID);
  const channel = await getUserChannel(CHANNEL_URL);
  await channel.inviteWithUserIds(userIds);
}

export const updateNameChannel = async (CHANNEL_URL, NAME) => {
  const channel = await getUserChannel(CHANNEL_URL);

  try {
    const GroupChannelUpdateParams = {};
    GroupChannelUpdateParams.name = NAME;

    const groupChannel = await channel.updateChannel()(
      GroupChannelUpdateParams
    );

    return [groupChannel, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateAvatarChannel = async (CHANNEL_URL, AVATAR) => {
  const channel = await getUserChannel(CHANNEL_URL);

  try {
    const GroupChannelUpdateParams = {};
    GroupChannelUpdateParams.coverUrl = AVATAR;

    const groupChannel = await channel.updateChannel()(
      GroupChannelUpdateParams
    );

    console.log("groupChannel", groupChannel);

    return [groupChannel, null];
  } catch (error) {
    return [null, error];
  }
};

export const sendMessage = async (channel, TEXT_MESSAGE, CUSTOM_TYPE) => {
  const params = {
    message: TEXT_MESSAGE,
    customType: CUSTOM_TYPE,
  };
  await channel.sendUserMessage(params).onSucceeded((message) => {
    const messageId = message.messageId;
    console.log("mess of vy: ", messageId);
  });
};

export const receiveMessage = async (channel) => {
  try {
    const MessageListParams = {
      prevResultSize: 100,
      nextResultSize: 100,
      // ...
    };
    const messages = await channel.getMessagesByTimestamp(0, MessageListParams);

    // Reverse message array by message.createdAt
    messages.reverse();
    console.log(channel);
    return messages.map((message) => {
      return {
        _id: message.messageId,
        text: message.message,
        name: message.name,
        url: message.plainUrl,
        type: message.customType,
        lastMess: message.customType !== "image" ? channel.lastMessage.message : "",
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.sender.userId,
          name: message.sender.nickname,
          avatar: message.sender.plainProfileUrl,
        },
      };
    });
  } catch (e) {
    // Todo: Handle error
    console.log("get messages error", e);

    return [];
  }
};

export const sendFile = async (channel, FILE) => {
  const fileMessageParams = {};
  fileMessageParams.file = FILE;
  fileMessageParams.message = FILE;
  await channel
    .sendFileMessage(fileMessageParams)
    .onSucceeded(() => {
      return true;
    })
    .onFailed((error) => {
      console.log(error);
      return false;
    });
};
