import React from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  FeedWrapper,
  FeedHeader,
  FeedMain,
  FeedCardSlickStyle,
  FeedCardTitle,
  FeedCardImage,
  FeedCardIcon,
  FeedCardContent,
} from './styles';
import LIkeIcon from '../../lib/style/feedIcon/LIkeIcon';
import ComentIcon from '../../lib/style/feedIcon/ComentIcon';
import SaveIcon from '../../lib/style/feedIcon/SaveIcon';

const Feed = () => {
  return (
    <>
      <FeedCardSlickStyle />
      <FeedWrapper>
        <div className="feed-section">
          <FeedHeader>
            <ul className="feed-head__title">
              <li>
                <NavLink to="/feed/hometown" activeClassName="selected">
                  <button type="button">우리동네</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/feed/all" activeClassName="selected">
                  <button type="button">전체</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/feed/friend" activeClassName="selected">
                  <button type="button">내 친구</button>
                </NavLink>
              </li>
            </ul>
            <div className="feed-head__tag">
              <ul>
                <li>
                  <button type="button">#일상</button>
                </li>
                <li>
                  <button type="button">#나눔</button>
                </li>
                <li>
                  <button type="button">#구조</button>
                </li>
                <li>
                  <button type="button">#탁묘</button>
                </li>
                <li>
                  <button type="button">#냥이자랑</button>
                </li>
                <li>
                  <button type="button">#우리동네</button>
                </li>
                <li>
                  <button type="button">#우리동네</button>
                </li>
              </ul>
            </div>
          </FeedHeader>
          <FeedMain>
            <ul>
              <li>
                <FeedCardTitle>
                  <dl className="feed-card__title-column">
                    <dt>
                      <img
                        src="https://i.pinimg.com/236x/55/8f/9f/558f9f4b364247f9fa5d3442cfb6f089.jpg"
                        alt=""
                      />
                    </dt>
                    <dd>페퍼보이</dd>
                  </dl>
                  <div className="feed-card__title-column">김해시 장유1동</div>
                </FeedCardTitle>
                <FeedCardImage>
                  <span className="feed-card__img-index">1/10</span>
                  <Slider
                    dots={false}
                    infinite={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                  >
                    <div className="feed-card__img-box">
                      <img
                        src="https://static.hubzum.zumst.com/hubzum/2019/08/08/14/b975969f6894484ca3b049cfa6fda972.jpg"
                        alt=""
                      />
                    </div>
                    <div className="feed-card__img-box">
                      <img
                        src="https://t1.daumcdn.net/liveboard/catlab/df4476dc4598433bb29710242487ed4c.JPG"
                        alt=""
                      />
                    </div>
                  </Slider>
                </FeedCardImage>
                <FeedCardIcon>
                  <div className="feed-card__icon-column">
                    <div className="icon--item">
                      <button type="button">
                        <LIkeIcon />
                      </button>
                      <span>56</span>
                    </div>
                    <div className="icon--item">
                      <button type="button">
                        <ComentIcon />
                      </button>
                      <span>156</span>
                    </div>
                  </div>
                  <div className="feed-card__icon-column">
                    <SaveIcon />
                  </div>
                </FeedCardIcon>
                <FeedCardContent>
                  <div className="feed-card__content-column">
                    <p>연탄이는 오늘도 식빵 굽굽 ´▽` 요즘 연탄이가 살dasffasdas</p>
                    <button type="button">더보기</button>
                  </div>
                  <div className="feed-card__content-column">
                    <p>5시간 전</p>
                  </div>
                </FeedCardContent>
              </li>
              <li>
                <FeedCardTitle>
                  <dl className="feed-card__title-column">
                    <dt>
                      <img
                        src="https://i.pinimg.com/236x/55/8f/9f/558f9f4b364247f9fa5d3442cfb6f089.jpg"
                        alt=""
                      />
                    </dt>
                    <dd>페퍼보이</dd>
                  </dl>
                  <div className="feed-card__title-column">김해시 장유1동</div>
                </FeedCardTitle>
                <FeedCardImage>
                  <span className="feed-card__img-index">1/10</span>
                  <Slider
                    dots={false}
                    infinite={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                  >
                    <div className="feed-card__img-box">
                      <img
                        src="https://static.hubzum.zumst.com/hubzum/2019/08/08/14/b975969f6894484ca3b049cfa6fda972.jpg"
                        alt=""
                      />
                    </div>
                    <div className="feed-card__img-box">
                      <img
                        src="https://t1.daumcdn.net/liveboard/catlab/df4476dc4598433bb29710242487ed4c.JPG"
                        alt=""
                      />
                    </div>
                  </Slider>
                </FeedCardImage>
                <FeedCardIcon>
                  <div className="feed-card__icon-column">
                    <div className="icon--item">
                      <button type="button">
                        <LIkeIcon />
                      </button>
                      <span>56</span>
                    </div>
                    <div className="icon--item">
                      <button type="button">
                        <ComentIcon />
                      </button>
                      <span>156</span>
                    </div>
                  </div>
                  <div className="feed-card__icon-column">
                    <SaveIcon />
                  </div>
                </FeedCardIcon>
                <FeedCardContent>
                  <div className="feed-card__content-column">
                    <p>연탄이는 오늘도 식빵 굽굽 ´▽` 요즘 연탄이가 살dasffasdas</p>
                    <button type="button">더보기</button>
                  </div>
                  <div className="feed-card__content-column">
                    <p>5시간 전</p>
                  </div>
                </FeedCardContent>
              </li>
            </ul>
          </FeedMain>
        </div>
      </FeedWrapper>
    </>
  );
};

export default Feed;
