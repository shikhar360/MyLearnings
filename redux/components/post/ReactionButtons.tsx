import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

import { AppDispatch } from "../../store/store";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

type IEntry = [string, string]
interface IProps{
  id : string,
  reactions : any
}

const ReactionButtons = ({ id, reactions }: IProps ) => {
  const dispatch = useDispatch<AppDispatch>();

  const reactionButtons = Object.entries(reactionEmoji);

  return (
    <div>
      {reactionButtons?.map(([name , emoji] : IEntry) => {
        return (
          <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={() =>
              dispatch(reactionAdded({ id: id, reaction: name }))
            }
          >
            {emoji} {reactions[name] }
          </button>
        );
      })}
    </div>
  );
};
export default ReactionButtons;
