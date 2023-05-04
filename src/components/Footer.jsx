import React from "react";
import { GrYoutube, GrInstagram, GrFacebook } from "react-icons/gr";

export default function Footer() {
  return (
    <footer>
      <div className="flex w-full">
        <div className="flex flex-col w-1/2">
          <div>고객센터</div>
          <a>
            1234-1234 <span>09:00 ~ 18:00</span>
          </a>
          <p>평일: 전체 문의 상담 가능</p>
          <p>주말, 공휴일: 이메일 문의 접수 가능</p>
          <button>카톡 상담</button>
          <button>이메일 문의</button>
        </div>
        <nav className="flex flex-col w-1/2">
          <a href="">회사소개</a>
          <a href="">이용약관</a>
          <a href="">개인정보 처리방침</a>
          <a href="">취소 및 환불 정책</a>
          <a href="">고객의 소리</a>
        </nav>
      </div>
      <div className="flex flex-wrap">
        <div className="shrink-0 px-1">
          <span>(주)포레스트오브퍼니처</span>
        </div>
        <div className="shrink-0 px-1">
          <span>대표이사 정윤지</span>
        </div>
        <div className="shrink-0 px-1">
          <span>서울 대한구 대한민국대로31길1 포레스트타워 20층</span>
        </div>
        <div className="shrink-0 px-1">
          <span>forest@example.com</span>
        </div>
        <div className="shrink-0 px-1">
          <span>사업자등록번호 xxx-xx-xxxxx</span>
        </div>
        <div className="shrink-0 px-1">
          <span>통신판매업신고번호 제0000-서울대한-0000호</span>
        </div>
      </div>
      <div className="flex">
        <a href="">
          <GrYoutube />
        </a>
        <a href="">
          <GrInstagram />
        </a>
        <a href="">
          <GrFacebook />
        </a>
      </div>
      <div>Copyright © Forest Of Furniture. All Rights Reserved.</div>
    </footer>
  );
}