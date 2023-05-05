import React from "react";
import { GrYoutube, GrInstagram } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t border-main mt-20 p-4">
      <div className="flex flex-col md:flex-row w-full md:mb-4">
        {/* 고객센터 정보 */}
        <div className="flex flex-col md:w-1/2 p-1 md:p-4 border-b-2 md:border-b-0 md:border-r-2 border-main/30">
          <button className="font-bold md:text-xl text-left hover:underline">
            고객센터 {">"}
          </button>
          <div className="flex items-center md:mt-4 mb-2">
            <button className="font-bold mr-2 md:text-xl text-left hover:underline">
              1234-1234{" "}
            </button>
            <span className="text-xs md:text-sm">09:00 ~ 18:00</span>
          </div>
          <p className="text-sm md:text-base">평일: 전체 문의 상담 가능</p>
          <p className="text-sm md:text-base">
            주말, 공휴일: 이메일 문의 접수 가능
          </p>
          <div className="mt-4">
            <button className="flex items-center border border-main rounded-md p-1 hover:underline">
              <RiKakaoTalkFill className="mr-2 shrink-0 text-main" />
              카톡 상담 (평일 09:00~18:00)
            </button>
          </div>
          <div className="mt-1">
            <button className="flex items-center border border-main rounded-md p-1 hover:underline">
              <MdEmail className="mr-2 shrink-0 text-main" />
              이메일 문의
            </button>
          </div>
        </div>

        {/* 사이트맵 */}
        <nav className="flex flex-col md:gap-2 items-start md:w-1/2 p-1 md:p-4">
          <button className="hover:underline">회사소개</button>
          <button className="hover:underline">이용약관</button>
          <button className="font-bold hover:underline">
            개인정보 처리방침
          </button>
          <button className="hover:underline">취소 및 환불 정책</button>
          <button className="hover:underline">고객의 소리</button>
        </nav>
      </div>

      {/* 기업 정보 */}
      <div className="flex flex-wrap py-1 border-t-2 border-main/30">
        <div className="shrink-0">
          <span className="text-sm px-1 border-r border-main">
            (주)포레스트오브퍼니처
          </span>
        </div>
        <div className="shrink-0">
          <span className="text-sm px-1 border-r border-main">
            대표이사 김나무
          </span>
        </div>
        <div className="shrink-0">
          <span className="text-sm px-1 border-r border-main">
            서울 대한구 대한민국대로31길1 포레스트타워 20층
          </span>
        </div>
        <div className="shrink-0">
          <span className="text-sm px-1 border-r border-main">
            forest@example.com
          </span>
        </div>
        <div className="shrink-0">
          <span className="text-sm px-1 border-r border-main">
            사업자등록번호 xxx-xx-xxxxx
          </span>
        </div>
        <div className="shrink-0">
          <span className="text-sm px-1 border-r border-main">
            통신판매업신고번호 제0000-서울대한-0000호
          </span>
        </div>
      </div>

      {/* SNS LINK */}
      <div className="flex items-center gap-4 p-2">
        <button className="p-1 bg-main rounded-full">
          <GrYoutube className="text-white" />
        </button>
        <button className="p-1 bg-main rounded-full">
          <GrInstagram className="text-white" />
        </button>
        <button className="p-1 bg-main rounded-full">
          <FaFacebookF className="text-white" />
        </button>
      </div>

      {/* copyright */}
      <div className=" text-sm px-1 pb-10">
        Copyright © Forest Of Furniture. All Rights Reserved.
      </div>
    </footer>
  );
}
