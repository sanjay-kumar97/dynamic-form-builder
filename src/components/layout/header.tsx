import useStore from "@/store";

const Header = () => {
  const { formStatus, setFormStatus } = useStore();

  const isPreview = formStatus === "preview";

  const handlePreviewClick = () => {
    setFormStatus("preview");
  };

  const handlePublishClick = () => {
    if (isPreview) {
      setFormStatus("edit");
    } else {
      alert("Handle Publish form");
    }
  };

  return (
    <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 shadow-sm h-14">
      <h1 className="text-lg font-semibold">Form Builder</h1>
      <div className="flex gap-4">
        {!isPreview && (
          <button
            onClick={handlePreviewClick}
            className="border border-gray-300 rounded px-3 py-1 font-semibold text-sm"
          >
            Preview
          </button>
        )}
        <button
          onClick={handlePublishClick}
          className="bg-black/90 text-white rounded px-3 py-1 font-semibold text-sm"
        >
          {isPreview ? "Exit Preview" : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default Header;
