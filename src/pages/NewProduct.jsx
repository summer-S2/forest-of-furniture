import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";
import { GiCheckMark } from "react-icons/gi";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSucess] = useState();
  const { addProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    // 제품 사진을 Cloudinary에 업로드 하고 URL 획득
    uploadImage(file) //
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: (id) => {
              setSucess("성공적으로 제품이 추가되었습니다.");
              setTimeout(() => {
                setSucess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleReset = () => {
    console.log(!file);
    if (window.confirm("입력한 내용을 삭제하시겠습니까?")) {
      setProduct({});
      setFile();
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };
  return (
    <section className="w-full text-center mb-10">
      <h2 className="text-main text-2xl font-bold py-4">새로운 제품 등록</h2>
      {success && (
        <div className="fixed flex items-center justify-center top-1/3 z-40 w-full max-w-screen-lg py-10 rounded-xl bg-main text-white my-2">
          <GiCheckMark className="text-white mr-2" />
          <span>{success}</span>
        </div>
      )}
      {file && (
        <img
          className="w-[320px] h-[480px] md:w-[384px] md:h-[512px] mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      {!file && (
        <div className="flex flex-col justify-center w-[320px] h-[480px]  md:w-[384px] md:h-[512px] mx-auto my-2 border-4 border-dashed border-main">
          <p>1080 X 720 ( 3 : 2 )</p>
          <p>또는</p>
          <p>1920 X 1080 ( 9 : 16 )</p>
          <p>파일의 사용을 권장합니다.</p>
        </div>
      )}
      <div className="w-full px-12">
        <button
          className="w-full py-2 font-bold text-accent disabled:text-accent/50"
          onClick={handleReset}
          disabled={Object.keys(product).length === 0 && !file}
        >
          내용 지우기
        </button>
      </div>
      <form className="flex flex-col px-4 md:px-12" onSubmit={handleSubmit}>
        <label className="text-left cursor-pointer" htmlFor="image_uploads">
          {file ? file.name : "파일 선택"}
        </label>
        <input
          className="hidden"
          id="image_uploads"
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          className="mb-2"
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션 (콤마( , )로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
