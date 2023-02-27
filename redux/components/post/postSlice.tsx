import { PayloadAction, createSlice, nanoid  , createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { sub } from "date-fns";
import { IPropsEntry } from "./ReactionButtons";
import axios from "axios";


//--------------------------------------------------------------------
// Started using the asyc thunk logic 
//--------------------------------------------------------------------

const POST_URL =  "https://jsonplaceholder.typicode.com/posts" ;

interface PostState {
  posts : any[];
  status : string;
  error : string | null;
}


const initialState : PostState = {
  posts : [],
  status : "idle" , /*idle  , loading , succeeded , failed "*/
  error : null 
}

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostState>) => {
        state.posts.push(action.payload);
      },
      prepare: (title: string, content: string, user: string) : any => {
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
              coffee: 0,
            },
          },
        }
      },
    },

    reactionAdded: (state, action: PayloadAction<IPropsEntry>) => {
      const { id, reactions } = action.payload;

      const existingPost = state.posts.find((post) => post.id === id);

      if (existingPost) {
        existingPost.reactions[reactions]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1 ;
        const loadedPosts = action.payload.map((post : any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post 
      })
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  }
});



export const allPosts = (state: RootState) => state.post.posts;
export const getPostsStatus = (state: RootState) => state.post.status;
export const getPostsError = (state: RootState) => state.post.error;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;









/*
--------------------------------------------------------------------------
--------------------------------------------------------------------
Code of second chapter. 
--------------------------------------------------------------------------
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
      coffee: 0,
    },
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
      coffee: 0,
    },
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
              coffee: 0,
            },
          },
        };
      },
    },

    reactionAdded: (state, action: PayloadAction<IPropsEntry>) => {
      const { id, reactions } = action.payload;

      const existingPost = state.find((post) => post.id === id);

      if (existingPost) {
        existingPost.reactions[reactions]++;
      }
    },
  },
});


export const allPosts = (state: RootState) => state.post;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;

*/