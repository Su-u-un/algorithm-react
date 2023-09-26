import { combineActions, createAction, handleActions } from 'redux-actions';

const prefix = 'PLAYER';

const setChunks = createAction(`${prefix}/SET_CHUNKS`, (chunks:any) => ({ chunks }));
// const setCursor = createAction(`${prefix}/SET_CURSOR`, cursor => ({ cursor }));
// const setLineIndicator = createAction(`${prefix}/SET_LINE_INDICATOR`, lineIndicator => ({ lineIndicator }));

export const actions = {
  setChunks,
  // setCursor,
  // setLineIndicator,
};

const defaultState = {
  chunks:     [
    {
      method:'select',
      args:[0]
    }
  ],
  // cursor: 0,
  // lineIndicator: undefined,
};

const temp:any = combineActions(
  setChunks,
  // setCursor,
  // setLineIndicator,
)

export default handleActions({
  [temp]: (state:any, { payload }:any) => ({
    ...state,
    ...payload,
  }),
}, defaultState);

