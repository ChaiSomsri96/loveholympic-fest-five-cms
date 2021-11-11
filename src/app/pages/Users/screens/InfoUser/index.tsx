/**
 *
 * InfoUser
 *
 */
import { LocationIcon } from 'app/components/Icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components/macro';
interface Props {
  data: any;
}

export const InfoUser = memo((props: Props) => {
  const { t } = useTranslation();
  const { data } = props;
  const {
    nickname,
    email,
    phone,
    age,
    ranking,
    gender,
    totalHeart,
    personalities,
    hobbies,
    userHolympic,
    area,
  } = data;

  return (
    <Row>
      <Col sm={12} className="info-user">
        <Div className="mr-3">
          <Box>
            <div className="pb-5 text-center">
              <img
                src={`https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-3-26/3/910ac7fa9c8a0c7fcff300afad0fa9b1_origin`}
                alt=""
              />
              <img
                src={`https://keno-techain-dev.s3.ap-southeast-1.amazonaws.com/public/images/2021-3-26/3/910ac7fa9c8a0c7fcff300afad0fa9b1_origin`}
                className="ml-4"
                alt=""
              />
            </div>
            <h3>{nickname}</h3>
            <p className="address">
              <LocationIcon /> {area?.name || '-'}
            </p>
            <ListItem>
              <b>순위</b>
              <span>{ranking}</span>
            </ListItem>
            <ListItem>
              <b>하트 개수</b>
              <span>{totalHeart}</span>
            </ListItem>
            <ListItem>
              <p>
                Lorem ipsum represents a long-held tradition for designers,
                typographers and the like. Some people hate it a nd argue for
                its demise, but others ignore the hate as they create awesome
                tools to help create filler text for everyone from bacon lovers
                to Charlie Sheen fans.
              </p>
            </ListItem>
            <button>{t('잠금')}</button>
          </Box>
        </Div>

        <Div className="mr-3">
          <Box>
            <h4>{t('프로필 정보')}</h4>
            <ListItem>
              <b>{t('전화번호')}</b>
              <span>{phone}</span>
            </ListItem>
            <ListItem>
              <b>{t('이메일')}</b>
              <span>{email}</span>
            </ListItem>
            <ListItem>
              <b>{t('성별')}</b>
              <span>{gender}</span>
            </ListItem>
            <ListItem>
              <b>{t('나이')}</b>
              <span>{age}</span>
            </ListItem>
            <ListItem>
              <b>{t('지역')}</b>
              <span>{area && area.name}</span>
            </ListItem>
            <ListItem>
              <b>{t('타입')}</b>
              {hobbies &&
                hobbies.length &&
                hobbies.map(item => (
                  <span key={item._id} className="pl-1">
                    {item.name}
                  </span>
                ))}
            </ListItem>
            <ListItem>
              <b>{t('성향')}</b>
              {personalities &&
                personalities.length &&
                personalities.map((item, idx) => (
                  <span key={idx} className="pl-1">
                    {item.name}
                  </span>
                ))}
            </ListItem>
          </Box>
        </Div>

        <Div>
          <Box>
            <h4>{t('상대 정보')}</h4>
            <ListItem>
              <b>{t('이름')}</b>
              <span>{userHolympic?.nickname}</span>
            </ListItem>
            <ListItem>
              <b>{t('순위')}</b>
              <span>{userHolympic?.ranking}</span>
            </ListItem>
            <ListItem>
              <b>{t('하트 개수')}</b>
              <span>{userHolympic?.totalHeart}</span>
            </ListItem>
            <ListItem>
              <b>{t('성별')}</b>
              <span>{userHolympic?.gender}</span>
            </ListItem>
            <ListItem>
              <b>{t('나이')}</b>
              <span>{userHolympic?.age}</span>
            </ListItem>
            <ListItem>
              <b>{t('지역')}</b>
              <span>{userHolympic?.area?.name}</span>
            </ListItem>
            <ListItem>
              <b>{t('타입')}</b>
              <span> {userHolympic?.type} </span>
            </ListItem>
            <ListItem>
              <b>{t('성향')}</b>
              {userHolympic?.personalities?.length &&
                userHolympic.personalities.map((item, idx) => (
                  <span key={idx} className="pl-1">
                    {item.name}
                  </span>
                ))}
            </ListItem>
          </Box>
        </Div>
      </Col>
    </Row>
  );
});

const Div = styled.div`
  font-size: 14px;
  position: relative;
  width: 100%;
  background: #ffffff;

  border-radius: 3px;
  border-top: 3px solid #3c8dbc;
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);

  margin-bottom: 20px;

  button {
    width: 100%;
    background-color: #3c8dbc;
    color: #ffffff;

    margin-top: 10px;
    padding: 6px 12px;
    border: none;

    :hover {
      background-color: #367fa9;
    }
  }
`;

const Box = styled.div`
  padding: 10px;

  h3,
  > p {
    text-align: center;
  }
`;

const ListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;

  span {
    color: #3c8dbc;
  }
`;
