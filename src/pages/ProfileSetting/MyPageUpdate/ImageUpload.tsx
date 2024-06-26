import defaultUser from "../../../components/Common/ProfileIcon/defaultUser.png";
import "react-toastify/dist/ReactToastify.css";

interface ImageUploadProps {
  profileImage: string | null;
  handleIconClick?: () => void;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ profileImage }) => {
  return (
    <div className="flex justify-center ">
      <div className="relative">
        <img
          src={profileImage || defaultUser}
          alt="Profile"
          className="rounded-full w-28 h-28 object-cover"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
