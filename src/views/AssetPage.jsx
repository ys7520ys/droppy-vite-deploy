import {React, use, useState, useEffect} from "react";
import { Helmet } from "react-helmet-async";
import AssetBanner from "../components/Asset/AssetBanner";
import AssetGridCard from "../components/Asset/AssetGridCard";
import { assetBanner, assetGridCard } from "../constants/data/asset";

const AssetPage = () => {
  const [selectedCategory_img,setSelectedCategory_img] = useState(assetGridCard.gridCard_img.tv);
  const [selectedCategory_text,setSelectedCategory_text] = useState(assetBanner.banner_text.tv);
  const [categoryChangeCheck, SetCategoryChangeCheck] = useState("");

  const handleCategoryImgChange = (category) => {
    setSelectedCategory_img(category);
    console.log("현재 handleCategory가 동작함")
  }
  const handleCategoryTextChange = (category) => {
    setSelectedCategory_text(category);
    console.log("현재 handleCategoryTextChange의 값이 동작함")
  }
  const checkCategory = (category) => {
    SetCategoryChangeCheck(category);
    console.log("현재 checkCategory의 값이 동작함")
  }

  
  const [announceText, setAnnounceText] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnounceText("ASSET 페이지로 이동하였습니다, CJ ENM과 함께하는 프로그램 드라마,영화,애니메이션에 대해서 알아보는 페이지입니다. 버튼을 클릭하여 TV프로그램, 애니메이션 카테고리의 값을 변경할 수 있습니다.");
    }, 100);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>ASSET | CJ ENM CP License</title>
        <meta name="description" content="CJ ENM과 함께하는 프로그램들은 어떠한 것들이 존재하는지 확인하세요." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jovial-figolla-2d7b4d.netlify.app/asset" />
      </Helmet>
      <h1 className="sr-only">
        CJ ENM | ASSET 페이지
      </h1>
      <div aria-live="polite" className="sr-only">
        {announceText}
      </div>
      <div aria-live="polite" className="sr-only">
        CJ ENM과 함께하는 {categoryChangeCheck}을 알아보아요.
      </div>

      <AssetBanner 
        onCategoryChangeText={handleCategoryTextChange}
        onCategoryChangeImg={handleCategoryImgChange}
        onCategoryChangeSrOnly={checkCategory}
        categoryChangeCheck={categoryChangeCheck}

        selectedCategory_text={selectedCategory_text}
        setSelectedCategory_text={setSelectedCategory_text}

        selectedCategory_img={selectedCategory_img}
        setSelectedCategory_img={setSelectedCategory_img}
      />
      <AssetGridCard 
        selectedCategory_img={selectedCategory_img} 
        setSelectedCategory_img={setSelectedCategory_img}
      />
    </>
  )
}

export default AssetPage;