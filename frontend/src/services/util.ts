export const generateRandomString = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};



export const isValidRoomId = (roomId: string): boolean => {
  return /^[a-zA-Z]*$/.test(roomId) && roomId.length === 4;
};
