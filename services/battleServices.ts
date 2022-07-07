import axios from "axios";

export async function battleService(firstUser: string, secondUser: string) {
    let firstUserStarts: number = 0;
    let secondUserStart: number = 0;
  try {
    const firstUserInfo = await axios.get(
      `https://api.github.com/users/${firstUser}/repos`
    );

    const secondUserInfo = await axios.get(
      `https://api.github.com/users/${secondUser}/repos`
    );

    console.log(firstUserInfo.data, secondUserInfo.data);

  } catch (error) {
    throw {
      type: error.response.data.message,
    };
  }
}
