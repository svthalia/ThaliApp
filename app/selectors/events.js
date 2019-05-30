export const eventStore = state => state.event;
export const currentEventSelector = state => eventStore(state).data.pk;
