import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

interface ImageUploadProps {
  profileImage: string | null;
  handleIconClick: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  profileImage,
  handleIconClick,
  handleFileChange,
  fileInputRef,
}) => (
  <div className="flex justify-center mb-4">
    <div className="relative">
      <img
        src={
          profileImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt="Profile"
        className="rounded-full w-24 h-24 object-cover"
      />
      <div
        className="absolute bottom-0 right-0 p-1 bg-transparent rounded-full cursor-pointer"
        onClick={handleIconClick}
      >
        {/* <img
          src={`${process.env.PUBLIC_URL}/images/photo-99135_640.png`}
          alt="Upload Icon"
          className="w-6 h-6 object-contain"
        /> */}
        <div className="w-6 h-6 object-contain cursor-pointer text-black flex justify-center items-center">
          <AddAPhotoIcon fontSize={"large"} />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  </div>
);

export default ImageUpload;
