import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCollectionsBySlug } from "../utils/getData";
import Isle from "../Components/Isle";

const Collection = () => {
  const { slug } = useParams();
	const [data, setData] = useState(undefined);

  const getCollectionDetails = async () => {
    const res = await fetchCollectionsBySlug(slug);
		setData(res);
  };

  useEffect(() => {
    getCollectionDetails();
  }, [slug]);

  return <div className="products-page">
		<Isle title={data?.title} items={data ? data.products : [{},{},{},{}]}/>
	</div>;
};

export default Collection;
