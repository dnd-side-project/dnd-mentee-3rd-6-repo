/* global kakao */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import ServantInfoAddressForm from '../../components/auth/SignUp/ServantInfo/ServantInfoAddressForm';

const ServantInfoAddressFormContainer = () => {
  const [hometown, setHometown] = useState('');
  const [myMap, setMyMap] = useState(null);
  const [geoLat, setGeoLat] = useState(null);
  const [geoLon, setGeoLon] = useState(null);

  // 좌표를 가져오기 성공 했을 때
  const handleGeoSucces = (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    setGeoLat(latitude);
    setGeoLon(longitude);
  };

  // 좌표를 가져오기 실패 했을 때
  const handleGeoError = () => {
    alert('GPS값을 가져올 수 없습니다.');
  };

  // 좌표를 호출하는 함수
  const askForCoords = useCallback(() => {
    if (navigator.geolocation) {
      console.log('1. gps 값 가져오기');
      navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    }
  }, []);

  /* 지도 생성 */
  useEffect(() => {
    if (myMap === null) {
      const script = document.createElement('script');
      console.log('2. 지도 생성');
      script.type = 'text/javascript';
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?appkey=6143843e556646f143fe9ceaa635a513&libraries=services&autoload=false';
      document.head.appendChild(script);

      script.onload = () => {
        kakao.maps.load(() => {
          askForCoords();
          const mapContainer = document.getElementById('map'); // 지도를 표시할 div
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 6,
          };

          const map = new kakao.maps.Map(mapContainer, options);

          setMyMap(map);
        });
      };
    }
  }, [askForCoords, geoLat, geoLon, myMap]);

  useEffect(() => {
    if (myMap !== null && geoLat && geoLon) {
      console.log('3. 마커 등록');
      console.log(geoLat, geoLon);

      // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      const locPosition = new kakao.maps.LatLng(geoLat, geoLon);

      // 마커와 인포윈도우를 표시합니다
      const imageSrc = '/images/map/maker.svg'; // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(30, 40); // 마커이미지의 크기입니다
      const imageOption = { offset: new kakao.maps.Point(10, 30) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: myMap,
        image: markerImage, // 마커이미지 설정
        position: locPosition,
      });
      marker.setMap(myMap);

      // 마커 포지션 지도의 중심으로 옮기기
      const center = myMap.getCenter();
      myMap.relayout();
      myMap.setCenter(center);

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      myMap.panTo(locPosition);
    }
  }, [geoLat, geoLon, myMap]);

  useEffect(() => {
    if (myMap !== null && geoLat && geoLon) {
      console.log('4. 행정동 찾기');
      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();

      const searchAddrFromCoords = (coords, callback) => {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      };

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      const displayCenterInfo = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
              setHometown(result[i].address_name);
              break;
            }
          }
        } else {
          setHometown('행정동을 찾을 수 없습니다.');
        }
      };

      // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
      searchAddrFromCoords(myMap.getCenter(), displayCenterInfo);

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(myMap, 'idle', () => {
        searchAddrFromCoords(myMap.getCenter(), displayCenterInfo);
      });
    }
  }, [geoLat, geoLon, myMap]);

  const onSubmitHometownClose = useCallback(() => {
    console.log('onSubmitHometownClose');
  }, []);

  return (
    <ServantInfoAddressForm hometown={hometown} onSubmitHometownClose={onSubmitHometownClose} />
  );
};

ServantInfoAddressFormContainer.prototype = {
  hometown: PropTypes.string.isRequired,
  onSubmitHometownClose: PropTypes.func.isRequired,
};

export default ServantInfoAddressFormContainer;
