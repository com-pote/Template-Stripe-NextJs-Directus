import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { url } = publicRuntimeConfig;

const getAsset = (id: string | undefined) => {
  return `${url}/assets/${id}`;
};

export default getAsset;
