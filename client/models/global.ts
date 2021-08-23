const GlobalModel = {
  namespace: 'global',
  state: {
    myName:'',
    myID:'',
    otherName:'',
    otherID:'',
    calling:false,
  },
  effects: {
  },
  reducers: {
    callVideo(state, { payload }){
      return {
        ...state,
        myName:payload.myName,
        otherID:payload.otherID,
        calling:payload.calling
      }
    },
    setMyID(state, { payload }){
      return {
        ...state,
        myID:payload
      }
    },
  }
};

export default GlobalModel
