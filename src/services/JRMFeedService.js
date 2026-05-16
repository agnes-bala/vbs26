import apiClient from "./Client";
import config from "../partnerconfig.json";

const getFeed = () => {
  //console.log ("FeedService get", config.jrmFeedServiceUrl);
  return apiClient.get(config.jrmFeedServiceUrl);
};
const vote = (pId, cId, today, token, votedFor) => {
  console.log("Vote ", config.quizGame);
  const month =
    new Date(today).getMonth() + 1 >= 10
      ? new Date(today).getMonth() + 1
      : 0 + `${new Date(today).getMonth() + 1}`;
  const day = new Date(today).getDate();
  const Voteapi = `${config.quizGame}/${pId}/children/${cId}/2026/${month}/${day}/vote`;
  console.log("Vote", Voteapi);
  const conf = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Vote", conf);
  const request = { game: `${votedFor}`, score: 0, country: "India" };
  console.log("Vote", request);
  return apiClient.post(Voteapi, request, conf);
};

const getvote = (pId, cId, today, token, ) => {
  console.log("Voteget ", config.quizGame);
  const month =
    new Date(today).getMonth() + 1 >= 10
      ? new Date(today).getMonth() + 1
      : 0 + `${new Date(today).getMonth() + 1}`;
  const day = new Date(today).getDate();
  const Voteapi = `${config.quizGame}/${pId}/children/${cId}/2026/${month}/${day}/vote`;
  console.log("Voteget", Voteapi);
  const conf = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Quiz conf", conf);
  // const request = { game: `${gameName}`, score: 0, country: "India" };
  // console.log("Vote", request);
  return apiClient.get(Voteapi, "",  conf);
};
const startGame = (pId, cId, today, token, gameName) => {
  console.log("start game ", config.quizGame);
  const month =
    new Date(today).getMonth() + 1 >= 10
      ? new Date(today).getMonth() + 1
      : 0 + `${new Date(today).getMonth() + 1}`;
  const day = new Date(today).getDate();
  const gameStartapi = `${config.quizGame}/${pId}/children/${cId}/2026/${month}/${day}/startgame`;
  console.log("game Started", gameStartapi);
  const conf = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Quiz conf", conf);
  const request = { game: `${gameName}`, score: 0, country: "India" };
  console.log("start game request", request);
  return apiClient.post(gameStartapi, request, conf);
};

const updateScore = (pId, cId, today, score, token, gameName) => {
  console.log("start game 2 ", config.quizGame);
  const month =
    new Date(today).getMonth() + 1 >= 10
      ? new Date(today).getMonth() + 1
      : 0 + `${new Date(today).getMonth() + 1}`;
  const day = new Date(today).getDate();
  const updateScoreapi = `${config.quizGame}/${pId}/children/${cId}/2026/${month}/${day}/gamescores`;
  console.log("update score", updateScoreapi);
  const conf = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = { game: `${gameName}`, score: score, country: "India" };
  console.log("request", request);
  return apiClient.post(updateScoreapi, request, conf);
};

const getScore = (pId, cId, token, gameName) => {
  const getScoreapi = `${config.quizGame}/${pId}/children/${cId}/gamescores`;
  console.log("get score", getScoreapi);
  const conf = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return apiClient.get(getScoreapi, "", conf);
};

const getTop = (date, region) => {
  const month =
    new Date(date).getMonth() + 1 >= 10
      ? new Date(date).getMonth() + 1
      : 0 + `${new Date(date).getMonth() + 1}`;
  const day = new Date(date).getDate();
  const getResultapi = `${config.quizNonIndiaResult}/${month}/${day}/${region}`;
  console.log("get Top", getResultapi);
  return apiClient.get(getResultapi);
};

const getQuestion = (day, category) => {
  const getQuestionapi = `${config.quizQuestions}/${day}/${category}`;
  console.log("questions", getQuestionapi);
  return apiClient.get(getQuestionapi);
};

export { getFeed, startGame, updateScore, getScore, getTop, getQuestion, vote, getvote };
