export const socketCheckout = (SOCKET, NAME) => {
  SOCKET.on(NAME, (data) => {
    console.log(data);
    return data;
  });
};
