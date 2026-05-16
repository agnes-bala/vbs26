import moment from "moment";
import { startGame, getScore } from "./JRMFeedService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../routes/paths";

const HandlePlay = (id, dateOfBirth, path) => {

  const navigate = useNavigate();
  const date = moment().date();
  localStorage.setItem("path", path);
  localStorage.setItem("date", date);
  var today = moment();
  var dob = moment(dateOfBirth, "YYYY-MM-DD");
  localStorage.setItem("currentChildId", id);
  localStorage.setItem("childId", id);

  if (today.diff(dob, "years") <= 7) {

    console.log(`age-${id}`, today.diff(dob, "years"));
    localStorage.setItem("category", "beginner");

  } else if (today.diff(dob, "years") >= 8 && today.diff(dob, "years") <= 10) {

    console.log(`age-${id}`, today.diff(dob, "years"));
    localStorage.setItem("category", "primary");

  } else if (today.diff(dob, "years") >= 11 && today.diff(dob, "years") <= 13) {

    console.log(`age-${id}`, today.diff(dob, "years"));
    localStorage.setItem("category", "junior");
    
  }
  navigate(PATH_DASHBOARD.general.routegame(id, path));

};

const handleGame = async (pId, childId, date, token, i, navigate) => {

  const response = await startGame(pId, childId, date, token);
  console.log("fn resp", response);
  if (!response) {
    toast.error("Error: Unable to communicate");
    console.log("Error: Unable to communicate");
    return;
  }  
  const result = await getScore(pId, childId, token);
  const path = localStorage.getItem("path");
  console.log("individual score", result);
  console.log("datascore", result.data.gameScoreList[i].endDateTime);
  console.log("i", result.data.gameScoreList[i].endDateTime);

  if (result.data.gameScoreList[i].endDateTime === null) {
    if (!response.ok) {
      console.log("Personal ContactInfo FAILED", response.status);
      if (response.status === 400) {
        alert("Game started earlier, you are allowed to continue ");
        console.log("Game started earlier, you are allowed to continue ");
      } else {
        toast.error(response.message);
      }
    }
    navigate(PATH_DASHBOARD.general.routegame(childId, path));

  } else {
    alert(
      "You have already played for this day quiz. Your Score is: " +
        result.data.gameScoreList[i].score
    );
    return;

  }

};
export { HandlePlay, handleGame };
