export default function TaskList({ tasks, onEdit, onDelete, userRole }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-400 py-8 text-sm">No tasks found.</p>;
  }

  const statusClass = (status) => {
    const map = {
      'Pending': 'bg-yellow-100 text-yellow-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-green-100 text-green-700'
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="text-left py-2 px-3 font-medium">Title</th>
            <th className="text-left py-2 px-3 font-medium">Status</th>
            <th className="text-left py-2 px-3 font-medium">Assigned To</th>
            <th className="text-left py-2 px-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id || task.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2 px-3">{task.title}</td>
              <td className="py-2 px-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusClass(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="py-2 px-3">{task.assignedTo?.name || 'N/A'}</td>
              <td className="py-2 px-3 flex gap-1">
                <button onClick={() => onEdit(task)}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-700">
                  Edit
                </button>
                {userRole === 'Admin' && (
                  <button onClick={() => onDelete(task._id || task.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-red-700">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
