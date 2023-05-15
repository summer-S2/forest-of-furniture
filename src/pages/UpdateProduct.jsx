import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { uploadImage } from "../api/uploader";
import { GiCheckMark } from "react-icons/gi";
import Button from "../components/ui/Button";

export default function UpdateProduct() {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [product, setProduct] = useState({
    title,
    description,
    id,
    category,
    price,
    options: options.join(","),
  });
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSucess] = useState();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 수정사항 없을때
    if (
      !file &&
      product.title === title &&
      product.description === description &&
      product.category === category &&
      product.price === price &&
      product.options === options.join(",")
    ) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    setIsUploading(true);
    // 이미지 그대로
    if (!file) {
      updateProduct.mutate(
        { id, product, url: image },
        {
          onSuccess: () => {
            setSucess("성공적으로 제품 내용이 변경되었습니다.");
            setTimeout(() => {
              setSucess(null);
            }, 4000);
          },
        }
      );
    }

    // 이미지 변경 제품 사진을 Cloudinary에 업로드 하고 URL 획득
    if (file) {
      uploadImage(file) //
        .then((url) => {
          updateProduct.mutate(
            { product, url },
            {
              onSuccess: (id) => {
                setSucess("성공적으로 제품 내용이 변경되었습니다.");
                setTimeout(() => {
                  setSucess(null);
                }, 3000);
              },
            }
          );
        });
    }
    setIsUploading(false);
    setTimeout(() => {
      // 변경 후 홈으로 이동 (수정된 데이터 반영)
      navigate("/");
    }, 4000);
  };

  // input 내용 변경
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
    // console.log(product);
  };

  // 내용 지우기
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
    <section className="w-full text-center mb-10 animate-mount">
      <h2 className="text-main text-2xl font-bold py-4">제품 내용 수정</h2>
      {success && (
        <div className="fixed flex items-center justify-center top-1/3 z-40 w-full max-w-screen-lg py-10 rounded-xl bg-main text-white my-2">
          <GiCheckMark className="text-white mr-2" />
          <span>성공적으로 제품 내용이 변경되었습니다.</span>
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
        <img
          className="w-[320px] h-[480px] md:w-[384px] md:h-[512px] mx-auto mb-2"
          src={image}
          alt="prev file"
        />
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
          text={isUploading ? "업데이트중..." : "제품 내용 수정하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
