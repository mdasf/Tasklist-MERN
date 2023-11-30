import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // console.log(user, isError, isLoading, message);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    // if (isError) {
    //   console.log(message);
    // }

    if (!user) {
      console.log("/login");
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  // user, navigate, dispatch, isError, message

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <div className="form">
        {isError && <p>${message}</p>}
        <section className="heading">
          <h1>Welcome {user && user.name}</h1>
          <p>Dashboard</p>
        </section>
        <GoalForm />
      </div>

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>There are no tasks left to complete.</h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
