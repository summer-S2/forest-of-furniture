import HomeBanner from "../components/HomeBanner";
import Products from "../components/Products";

export default function Home() {
  return (
    <div className="animate-mount">
      <HomeBanner />
      <Products home />
    </div>
  );
}
