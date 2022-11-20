import {userActions} from "@/store/modules/userStore/components/userActions";
import {userState} from "@/store/modules/userStore/components/userState";
import {userMutations} from "@/store/modules/userStore/components/userMutations";

export const userStore = {
  state: userState,
  actions: userActions,
  mutations: userMutations
}
