import axios from "axios";

export async function battleService(firstUser: string, secondUser: string) {
    let firstUserStarts: number = 0;
    let secondUserStars: number = 0;
  try {
    const firstUserInfo = await axios.get(
      `https://api.github.com/users/${firstUser}/repos`
    );

    for (let projects of firstUserInfo.data) {
        firstUserStarts += projects.stargazers_count;
    }

    const secondUserInfo = await axios.get(
      `https://api.github.com/users/${secondUser}/repos`
    );

    for (let projects of secondUserInfo.data) {
        secondUserStars += projects.stargazers_count;
    }

    console.log(firstUserStarts, secondUserStars);

  } catch (error) {
    throw {
      type: error.response.data.message,
    };
  }
}
