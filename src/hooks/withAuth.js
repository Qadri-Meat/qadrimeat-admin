import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent, requireAuth = true) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
      if (requireAuth && !user) {
        navigate("/login"); // Redirect to the login page if not authenticated
      } else if (!requireAuth && user) {
        navigate("/");
      }
    }, [user, navigate]);

    // if (!user) {
    //   // You can also show a loading spinner or message here
    //   return <Loader />;
    // }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
