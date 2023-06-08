import { Person } from "@/types/starWarsApiTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type EditState = {
  editedPersons: Person[];
  isEditMode: boolean;
};

const initialState: EditState = {
  editedPersons: [],
  isEditMode: false,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setIsEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
    },
    setEditedPersons: (state, action: PayloadAction<Person>) => {
      let index = state.editedPersons.findIndex(
        (person) => person.url === action.payload.url
      );

      if (index === -1) {
        state.editedPersons.push(action.payload);
        return;
      }
      state.editedPersons[index] = action.payload;
    },
  },
});

export const { setIsEditMode, setEditedPersons } = editSlice.actions;
export default editSlice.reducer;
