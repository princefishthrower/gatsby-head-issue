import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TestState = {
  myString: string;
};

export const testInitialState: TestState = {
    myString: "Hello World",
};

export const testSlice = createSlice({
  name: "test",
  initialState: testInitialState,
  reducers: {
    setMyString: (state, action: PayloadAction<string>) => {
        state.myString = action.payload;
        }

  },
});

export const { setMyString } = testSlice.actions;

export default testSlice.reducer;
