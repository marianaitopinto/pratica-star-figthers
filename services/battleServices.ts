import axios from "axios";

import * as battleRepository from "../repositories/battleRepository.js";

export async function battleService(firstUser: string, secondUser: string) {
  let firstUserStarts: number = 0;
  let secondUserStars: number = 0;

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
  const firstFighter = await getFighters(firstUser);
  const secondFighter = await getFighters(secondUser);

  return getBattleResult(
    firstFighter,
    secondFighter,
    firstUserStarts,
    secondUserStars
  );
}

async function getFighters(username: string) {
  const fighter = await battleRepository.findByUsername(username);

  if (!fighter) {
    const createdFighter = await battleRepository.insert(username);
    return { id: createdFighter.id, username, wins: 0, losses: 0, draws: 0 };
  }

  return fighter;
}

async function getBattleResult(
  firstFighter: any,
  secondFighter: any,
  firstUserStars: number,
  secondUserStars: number
) {
  if (firstUserStars > secondUserStars) {
    await updateWinnerAndLoserStats(firstFighter.id, secondFighter.id);

    return {
      winner: firstFighter.username,
      loser: secondFighter.username,
      draw: false,
    };
  }

  if (secondUserStars < firstUserStars) {
    await updateWinnerAndLoserStats(secondFighter.id, firstFighter.id);

    return {
      winner: secondFighter.username,
      loser: firstFighter.username,
      draw: false,
    };
  } 
  
  if (secondUserStars === firstUserStars) {

    await updateDrawStats(firstFighter.id, secondFighter.id);
    return { winner: null, loser: null, draw: true };
  }
}

async function updateWinnerAndLoserStats(winnerId: number, loserId: number) {
  await battleRepository.updateStats(winnerId, "wins");
  await battleRepository.updateStats(loserId, "losses");
}

async function updateDrawStats(
  firstFighterId: number,
  secondFighterId: number
) {
  await battleRepository.updateStats(firstFighterId, "draws");
  await battleRepository.updateStats(secondFighterId, "draws");
}

export async function find() {
  return battleRepository.find();
}