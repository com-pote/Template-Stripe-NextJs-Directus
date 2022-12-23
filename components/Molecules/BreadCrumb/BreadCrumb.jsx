import styles from "./BreadCrumb.module.css";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Crumb from "../../Atoms/Crumb/Crumb";

const _defaultGetTextGenerator = (param, query) => null;
const _defaultGetDefaultTextGenerator = (path) => path;

// Pulled out the path part breakdown because its
// going to be used by both `asPath` and `pathname`
const generatePathParts = (pathStr) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

const BreadCrumb = ({
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}) => {
  const router = useRouter();

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath);
      const pathnameNestedRoutes = generatePathParts(router.pathname);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        // Pull out and convert "[post_id]" into "post_id"
        const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");

        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return {
          href,
          textGenerator: getTextGenerator(param, router.query),
          text: getDefaultTextGenerator(subpath, href),
        };
      });

      return [{ href: "/", text: "Accueil" }, ...crumblist];
    },
    [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]
  );

  return (
    <div aria-label="breadcrumb" className={styles.container}>
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </div>
  );
};

export default BreadCrumb;
