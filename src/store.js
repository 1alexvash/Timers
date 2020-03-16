import { createStore, action } from "easy-peasy";

const store = createStore({
  navigation: {
    activeTab: "stopwatch",
    setActiveTab: action((state, payload) => {
      state.activeTab = payload;
    })
  }
});

export default store;
