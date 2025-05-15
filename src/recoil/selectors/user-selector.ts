import { selector } from "recoil";
import { UserService } from "../../services/user.service";
// import { UserService } from "../services/user.service";
export const userListSelectors = selector({
  key: "userListSelector",
  get: async () => {
    const queryResult = await UserService.getAll(); 
    return queryResult;
  },
});
