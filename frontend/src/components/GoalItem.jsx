import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { MdCancel } from "react-icons/md";
const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-IN")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <MdCancel />
      </button>
    </div>
  );
};

export default GoalItem;
