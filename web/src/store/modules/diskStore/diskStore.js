import {diskActions} from "@/store/modules/diskStore/components/diskActions";
import {diskMutations} from "@/store/modules/diskStore/components/diskMutations";
import {diskState} from "@/store/modules/diskStore/components/diskState";

export const diskStore = {
  state: diskState,
  actions: diskActions,
  mutations: diskMutations,
}