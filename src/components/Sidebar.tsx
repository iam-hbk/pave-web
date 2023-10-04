export default function Sidebar() {
  return (
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
        {["Dashboard", "Quizzes", "Students", "Results", "Help"].map((item) => (
          <a
            key={item}
            href="#"
            className="block p-2 rounded hover:bg-gray-100 transition-all duration-300"
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="block p-2 rounded hover:bg-gray-100 transition-all duration-300"
        >
          New Session
        </button>
      </nav>
    </aside>
  );
}
