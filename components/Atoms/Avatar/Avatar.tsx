import styles from "./Avatar.module.scss";
import getAssets from "../../../lib/directus/getAssets";
import Image from "next/image";

const Avatar = ({ infos }) => {
  return (
    infos && (
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Image src={getAssets(infos.avatar)} alt={`Avatar de ${infos.last_name} ${infos.first_name}`} fill />
        </div>
      </div>
    )
  );
};

export default Avatar;
