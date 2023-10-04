// pages/index.js
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex transition-all duration-300">
      <Head>
        <title>Dashboard</title>
      </Head>

      {/* Sidebar */}

      <aside className="w-1/5 p-6 bg-white shadow-xl">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/assets/svgs/Pave_Logo.svg"
            alt="Logo"
            className="w-32 h-auto mb-4"
          />
        </div>

        <div className="flex items-center mb-6 space-x-2">
          <button className="btn text-primary">☰</button>
          <button className="btn text-primary">❌</button>
        </div>
        <nav className="space-y-4">
          {["Dashboard", "Quizzes", "Students", "Results", "Help"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block p-2 rounded hover:bg-gray-100 transition-all duration-300"
              >
                {item}
              </a>
            )
          )}
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-100 transition-all duration-300"
          >
            New Attendance
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex transition-all duration-300">
        <div className="bg-white p-6 rounded-xl shadow-md w-2/3 mr-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-gray-500">Dr Fanie Radebe</div>
              <button className="btn btn-primary transition-all duration-300 hover:shadow-lg">
                New quiz
              </button>
            </div>
          </div>

          {/* Upcoming Quizzes */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming quizzes</h2>
            {[1, 2].map((quiz, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-200 rounded-lg flex items-center justify-between mb-4 space-x-4 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  className="w-20 h-20 object-cover rounded"
                  src="https://images.unsplash.com/photo-1662120455989-5a433cec9980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1914&q=80"
                  alt="Quiz Image"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Quiz Title</h3>
                  <p>12/03/2023 | 09:00 AM</p>
                  <p>No. of students enrolled: 32</p>
                </div>
                <button className="btn btn-primary">Open</button>
              </div>
            ))}
          </section>

          {/* Completed Quizzes */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Completed Quizzes</h2>
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/4 px-4 py-2">Title</th>
                  <th className="w-1/4 px-4 py-2">Group name</th>
                  <th className="w-1/4 px-4 py-2">No. of persons</th>
                  <th className="w-1/4 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {["Assembly language", "C programming", "Python"].map(
                  (quiz, idx) => (
                    <tr key={idx}>
                      <td className="border px-4 py-2">{quiz}</td>
                      <td className="border px-4 py-2">Group {idx + 1}</td>
                      <td className="border px-4 py-2">
                        {(idx + 1) * 10} persons
                      </td>
                      <td className="border px-4 py-2">12/02/2023</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        </div>

        {/* Students List */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Students List</h2>
            <button className="btn btn-outline btn-primary">Directory →</button>
          </div>

          {[
            "Emmanuel James",
            "Alice Jasmine",
            "Harrison Menlaye",
            "Jones Doherty",
          ].map((name, idx) => (
            <div
              key={idx}
              className="flex items-center bg-gray-200 p-4 rounded-lg mb-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                className="w-10 h-10 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80"
                alt={name}
              />
              <div className="ml-4 flex-1">
                <p className="font-medium">{name}</p>
                <p>
                  Class rank: {idx + 1}th | Average score: {80 + idx}%
                </p>
              </div>
              <button className="btn btn-primary">Profile</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
