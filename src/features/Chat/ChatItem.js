import React, { useEffect, useState } from "react";
import ChatLayout from "./ChatLayout";

import { useDispatch, useSelector } from "react-redux";

import * as SB from "../../component/Chat/SendBirdGroupChat.js";
import { updateChannelID } from "../../redux/userSlice";
import ChatEmpty from "./ChatEmpty";

function ChatItem() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const channels = useSelector((state) => state?.user?.channel);

  const [listChannel, setListChannel] = useState([]);
  const [channelFisrt, setChannelFirst] = useState();
  const [messageFirst, setMessageFirst] = useState([]);

  useEffect(() => {
    const getChannels = async () => {
      let newChannel = [];

      await SB.connectSendBird(userInfo?._id);
      for (let channel of channels) {
        let item = await SB.getUserChannel(channel.channel);
        if (item) {
          let fromData = {
            _id: item.url,
            name: item.name,
            avatar: item.coverUrl,
            lastMess: item.lastMessage != null ? item.lastMessage.message : "",
          };
          newChannel.push(fromData);
        }
      }
      setListChannel(newChannel);
      dispatch(updateChannelID(newChannel[0]._id));
      let c = await SB.getUserChannel(channels[0].channel);
      setChannelFirst(c);

      let m = await SB.receiveMessage(c);
      setMessageFirst(m.reverse());
      //setMessageFirst(m);
    };

    if (channels.length > 0) {
      getChannels().catch(console.error);
    }
  }, [channels, dispatch, userInfo?._id]);

  return (
    <>
      {listChannel.length > 0 ? (
        <ChatLayout
          item={listChannel}
          channelFisrt={channelFisrt}
          messageFirst={messageFirst}
        />
      ) : (<ChatEmpty />)}
    </>
  );
}

export default ChatItem;
