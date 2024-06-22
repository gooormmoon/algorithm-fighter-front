import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import defaultUser from "../../../components/Common/ProfileIcon/defaultUser.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleFileChange) {
      handleFileChange(event);
      const file = event.target.files?.[0];
      if (file) {
        toast.success("이미지가 성공적으로 업로드되었습니다.");
      } else {
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
      }
    }
  };
  return (
    <div className="flex justify-center ">
      <div className="relative">
        <img
          src={profileImage || defaultUser}
          alt="Profile"
          className="rounded-full w-28 h-28 object-cover"
        />
        {
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
              onChange={onFileChange}
            />
          </>
        }
      </div>
    </div>
  );
};

export default ImageUpload;
