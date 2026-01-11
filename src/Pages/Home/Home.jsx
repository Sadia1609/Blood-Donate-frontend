import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <Navbar />

      <section className="relative bg-gradient-to-r from-red-600 to-rose-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Donate Blood, Save Lives
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-red-100 mb-10">
            A single blood donation can save multiple lives. Be someone’s hero
            today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="btn bg-white text-red-600 hover:bg-gray-100 px-8"
            >
              Join as a Donar
            </Link>

            <Link
              to="/search"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600 px-8"
            >
              Search Donars
            </Link>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How Blood Donation Works
          </h2>

          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
            Follow a simple process to help patients in need of blood across the
            country.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Register as Donor</h3>
              <p className="text-gray-600 text-sm">
                Create an account and provide your basic blood information.
              </p>
            </div>

            <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">
                Find Blood Requests
              </h3>
              <p className="text-gray-600 text-sm">
                Search blood requests by group and location.
              </p>
            </div>

            <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2">
                Donate & Save Lives
              </h3>
              <p className="text-gray-600 text-sm">
                Visit the hospital and help save a precious life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>

          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button className="btn btn-error w-full">Send Message</button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Hotline: <span className="font-semibold">+880 1234-567890</span>
          </p>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-10 text-center">
        <p>© {new Date().getFullYear()} BloodDonate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
