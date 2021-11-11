/**
 *
 * DetailUser
 *
 */
import { RadarData, RadarOptions } from 'app/config/chart';
import { InfoUser } from 'app/pages/Users/screens/InfoUser/Loadable';
import { useUserSlice } from 'app/pages/Users/slice';
import { selectUserDetail } from 'app/pages/Users/slice/selectors';
import React, { memo, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {}
interface ParamTypes {
  id: string;
}

export const DetailUser = memo((props: Props) => {
  const chartRef = React.useRef<Radar>(null);
  const dispatch = useDispatch();
  const { actions } = useUserSlice();
  const { id } = useParams<ParamTypes>();
  const data = useSelector(selectUserDetail);
  const {
    lovePoint,
    intellectPoint,
    spiritPoint,
    responsibilityPoint,
    innocencePoint,
  } = data;

  const tmpData = [
    lovePoint || 0,
    intellectPoint || 0,
    spiritPoint || 0,
    responsibilityPoint || 0,
    innocencePoint || 0,
  ];

  const RadarDataTest = RadarData(tmpData);

  const average = tmpData.reduce((curr, next) => {
    return curr + next;
  }, 0);

  useEffect(() => {
    dispatch(actions.getUser(id));
  }, [actions, dispatch, id]);

  return (
    <Div>
      <InfoUser data={data} />
      <Row className="wrap-chart">
        <Col sm={6} md={6}>
          <Radar ref={chartRef} data={RadarDataTest} options={RadarOptions} />
          <b className="average">평균 점수: {average / 5}</b>
        </Col>
        <Col sm={5}>
          <div className="result-test pt-4">
            <b>테스트 결과</b>
            <p>
              <span>1.pographers and the like. Some people hate it</span>
              <span className="love">{tmpData[0]}</span>
            </p>
            <p>
              <span>1.pographers and the like. Some people hate it</span>
              <span className="intell">{tmpData[1]}</span>
            </p>
            <p>
              <span>1.pographers and the like. Some people hate it</span>
              <span className="spirit">{tmpData[2]}</span>
            </p>
            <p>
              <span>1.pographers and the like. Some people hate it</span>
              <span className="responsibi">{tmpData[3]}</span>
            </p>
            <p>
              <span>1.pographers and the like. Some people hate it</span>
              <span className="innocen">{tmpData[4]}</span>
            </p>
          </div>
        </Col>
      </Row>
    </Div>
  );
});

const Div = styled.div`
  height: 100%;
  padding: 1rem;

  background-color: #ecf0f5;
  .wrap-chart {
    background-color: #fff;
    padding: 1rem;
    margin: 0;

    .average {
      display: block;
      margin-top: 2rem;
      text-align: center;
      color: #ff4646;
      font-size: 24px;
    }

    .result-test {
      p {
        color: #3c8dbc;
        font-size: 18px;

        span {
          padding-left: 1rem;
        }

        .love {
          color: #ff5766;
        }
        .intell {
          color: #ffc406;
        }
        .spirit {
          color: #514f4f;
        }
        .responsibi {
          color: #2fb24b;
        }
        .innocen {
          color: #127ccc;
        }
      }
    }
  }

  .info-user {
    display: flex;
  }
`;
