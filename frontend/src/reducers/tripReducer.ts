const initialState = {
  trips: localStorage.getItem("trips")
    ? JSON.parse(localStorage.getItem("trips"))
    : [],
};

const tripReducer = (state, action) => {
  switch (action.type) {
    case "TRIP_LIST":
      return { trips: action.payload };
    case "TRIP_ADD":
      return { trips: [action.payload, ...state.trips] };
    default:
      return state;
  }
};

export { initialState, tripReducer };
