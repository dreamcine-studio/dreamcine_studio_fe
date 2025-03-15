export default function ModalDelete({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3 text-center">
        <h3 className="text-xl font-semibold text-black mb-4">
          Are you sure you want to delete this data?
        </h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}