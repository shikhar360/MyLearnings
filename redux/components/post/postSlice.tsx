import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { sub } from "date-fns";


export interface PostState {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: any;
}

const initialState: PostState[] = [
  {
    id: "1",
    title: "First Post",
    content: "This is the first post",
    user: "ululul",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
  }
  },
  {
    id: "2",
    title: "jingalala",
    content: "this is gonna be a second post ",
    user: "jhgj",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
  }
  },
];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {

    postAdded: {
      reducer: (state, action: PayloadAction<PostState>) => {
        state.push(action.payload);
      },
      prepare: (title: string, content: string, user: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
          }
          },
        };
      },
    },

    reactionAdded (state, action) {
      const { id, reaction } = action.payload;

      const existingPost = state.find((post) => post.id === id);
      
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }

  },
});

export const allPosts = (state: RootState) => state.post;

export const { postAdded , reactionAdded } = postSlice.actions;

export default postSlice.reducer;
