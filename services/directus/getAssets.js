import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { url } = publicRuntimeConfig;

/**
 * [returns the full url of a directus image]
 *
 * @param   {[Number]}  id  [id of the image]
 *
 * @return  {[String]}      [return the full URL]
 */
const getAssetURL = (id) => {
  if (!id) return null;
  return `${url}/assets/${id}`;
};

export default getAssetURL;
