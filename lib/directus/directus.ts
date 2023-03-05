import { Directus } from "@directus/sdk";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { url } = publicRuntimeConfig;

const directus = new Directus(url);

export default directus;
