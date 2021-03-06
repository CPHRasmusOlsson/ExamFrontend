import { URL } from "../constants.js";
import ApiFacade from "./apiFacade";

const Facade = () => {
  const dataThreads = () => {
    const options = ApiFacade.makeOptions("GET", true);
    return fetch(URL + "/api/trip/show", options).then(
      ApiFacade.handleHttpErrors
    );
  };

  return {
    dataThreads,
  };
};

export default Facade();
