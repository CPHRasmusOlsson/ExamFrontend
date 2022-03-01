import { URL } from "../constants.js";
import ApiFacade from "./apiFacade";

const examFacade = () => {
  const raceThreads = () => {
    const options = ApiFacade.makeOptions("GET", true);
    return fetch(URL + "/api/race/show", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  return {
    raceThreads,
  };
};

export default examFacade();
