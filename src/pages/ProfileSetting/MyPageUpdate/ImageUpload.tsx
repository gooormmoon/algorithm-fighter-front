import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import defaultUser from "../../../components/Common/ProfileIcon/defaultUser.png";
interface ImageUploadProps {
  profileImage: string | null;
  handleIconClick?: () => void;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  profileImage,
  handleIconClick,
  handleFileChange,
  fileInputRef,
}) => {
  const hasAllProps = handleFileChange && handleIconClick && fileInputRef;

  return (
    <div className="flex justify-center ">
      <div className="relative">
        <img
          src={profileImage || defaultUser}
          alt="Profile"
          className="rounded-full w-28 h-28 object-cover"
        />
        {hasAllProps && (
          <>
            {" "}
            <div
              className="absolute bottom-0 right-0 p-1 bg-transparent rounded-full cursor-pointer"
              onClick={handleIconClick}
            >
              <div className="w-6 h-6 object-contain cursor-pointer text-secondary flex justify-center items-center">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
