import Image from "next/image";

export default function StudentList() {
  return (
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
          <Image
            width={100}
            height={100}
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
  );
}
