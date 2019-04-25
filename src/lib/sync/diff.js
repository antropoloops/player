export default function diff(before, after) {
  const state = {};

  const setBeforeState = ({ id }) => (state[id] = "delete");
  const setAfterState = ({ id }) =>
    (state[id] = state[id] === "delete" ? "keep" : "create");
  before.forEach(setBeforeState);
  after.forEach(setAfterState);

  const result = { delete: [], create: [], keep: [] };
  Object.keys(state).forEach(clipId => {
    const action = state[clipId];
    result[action].push(clipId);
  });
  return result;
}
