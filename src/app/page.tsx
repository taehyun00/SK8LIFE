'use client';

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Bottombar from "./components/bottombar/bottombar";
import {data} from "./rollerskate_facilities";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // 사용자 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
          // 위치 정보를 가져올 수 없을 때 기본 위치 (서울)
          setUserLocation({
            lat: 37.5665,
            lng: 126.9780
          });
        }
      );
    } else {
      // Geolocation을 지원하지 않는 경우 기본 위치
      setUserLocation({
        lat: 37.5665,
        lng: 126.9780
      });
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return; // 위치 정보가 없으면 대기

    const KAKAO_APP_KEY = "ab10b55e22c4a11f942000379e0d8c2c";

    const existingScript = document.getElementById("kakao-map-script");
    if (existingScript) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => initMap());
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => initMap());
      }
    };

    document.head.appendChild(script);
  }, [userLocation]);

  const initMap = () => {
    if (!userLocation) return;

    const container = document.getElementById("map");
    if (!container) return;

    // 사용자 위치를 중심으로 설정
    const options = {
      center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
      level: 5, 
    };

    const map = new window.kakao.maps.Map(container, options);

    // 현재 위치 마커 생성 (다른 색상으로 구분)
    const userMarkerPosition = new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng);
    
    // 현재 위치 마커 이미지 설정
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; 
    const imageSize = new window.kakao.maps.Size(24, 35); 
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    const userMarker = new window.kakao.maps.Marker({
      position: userMarkerPosition,
      map: map,
      image: markerImage // 별 모양 마커로 현재 위치 표시
    });

    // 현재 위치 인포윈도우
    const userInfowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:12px;font-weight:bold;color:#4285f4;">📍 현재 위치</div>`
    });

    window.kakao.maps.event.addListener(userMarker, 'click', function() {
      userInfowindow.open(map, userMarker);
    });

    // 시설 마커들 생성
    data.forEach((facility) => {
      const markerPosition = new window.kakao.maps.LatLng(
        facility.FCLTY_LA, 
        facility.FCLTY_LO
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:10px;font-size:12px;color:black;">${facility.FCLTY_NM}</div>`
      });

      window.kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });
    });
  };

  return (
    <HomeLayout>
      <div id="map" style={{ width: "100%", height: "100%", zIndex: 1 }}></div>
      <Bottombar />
    </HomeLayout>
  );
}

const HomeLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
