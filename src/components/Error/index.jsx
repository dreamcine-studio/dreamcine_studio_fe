export default function Error({ res }) {
  return (
    <div className="p-2 my-2 text-sm text-red-800 rounded-lg bg-red-50">
      <span className="font-medium">{res}</span>
  </div>
  );
}




