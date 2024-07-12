import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="max-w-7xl mx-auto px-5">
      <div className="lg:mt-20 md:mt-14 mt-5">
        <h1 className="md:text-5xl text-xl">
          Welcome!{" "}
          <span className="mt-10 font-bold text-[#2680f0]">
            {currentUser.username}
          </span>
        </h1>
        <p className="md:text-xl text-base md:mt-10 mt-5">
          Welcome to our MERN web app! After signing in, you{"'"}ll be greeted
          with a personalized welcome message tailored just for you. Navigate
          effortlessly through your dashboard, profile, and latest updates,
          ensuring you stay connected and informed with everything that matters
          to you. Our app is designed to provide you with a seamless and
          intuitive user experience from the moment you log in.
        </p>
        <p className="md:text-xl text-base md:mt-10 mt-5">
          Our app is built using the robust MERN stack, which includes MongoDB,
          Express.js, React, and Node.js. This powerful combination allows us to
          deliver a fast, responsive, and scalable web application. We{"'"}ve
          also integrated Redux for efficient state management, ensuring that
          your data and application state remain consistent across all
          components.
        </p>
        <p className="md:text-xl text-base md:mt-10 mt-5">
          To make the interface visually appealing and user-friendly, we{"'"}ve
          incorporated Tailwind CSS. This utility-first CSS framework enables us
          to create a sleek and modern design with minimal effort, ensuring that
          you have a pleasant and engaging experience every time you use our
          app. Dive in and explore the full potential of our feature-rich
          platform!
        </p>
        <h2 className="mt-10 mb-10 font-bold text-[#2680f0] text-2xl">
          Made by Khizar Wakeel!
        </h2>
      </div>
    </section>
  );
};

export default Home;