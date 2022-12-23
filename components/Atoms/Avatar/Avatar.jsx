import styles from "./Avatar.module.css";
import { User } from "@nextui-org/react";
import getAssetURL from "../../../services/directus/getAssets";

const Avatar = ({ infos }) => {
  return (
    infos && (
      <User
        zoomed
        pointer
        size="sm"
        src={infos.avatar !== null && getAssetURL(infos.avatar)}
        text={infos.avatar === null && `${infos.first_name} ${infos.last_name}`}
        name={`${infos.first_name} ${infos.last_name}`}
      />
    )
  );
};

export default Avatar;
