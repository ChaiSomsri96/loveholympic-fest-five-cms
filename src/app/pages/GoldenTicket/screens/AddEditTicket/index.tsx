/**
 *
 * AddEditTicket
 *
 */
import { FesSelect } from 'app/components/FesSelect/Loadable';
import { UploadImage } from 'app/components/UploadImage/Loadable';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Row } from 'reactstrap';
import styled from 'styled-components/macro';
interface Props {
  ticket?: any;
  listCodes?: any;
  defaultOptions?: any;
  handleChange?: any;
  handleChangeRandom?: any;
  handleChangeTopics?: any;
  onChangeFileTicket?: any;
  handleDeleteTicket?: any;
  onReset?: any;
  loading?: boolean;
}

export const AddEditTicket = memo((props: Props) => {
  const { t } = useTranslation();
  const {
    ticket,
    handleChange,
    handleChangeRandom,
    handleChangeTopics,
    handleDeleteTicket,
    onChangeFileTicket,
    onReset,
    listCodes,
    loading,
  } = props;

  const inputRefLucky = React.useRef<HTMLInputElement>(null);

  return (
    <Row>
      <Col sm={2} className="mt-4">
        <strong className="d-block pb-2">{t('등수')}</strong>
        <FiledInput
          placeholder="등수"
          name="name"
          value={ticket.name}
          onChange={handleChange}
        />
        <div className="text-right pt-2 w-75">
          <Button color="success" onClick={handleDeleteTicket}>
            삭제
          </Button>
        </div>
      </Col>
      <Col className="mt-4 golden-prize" sm={4}>
        <strong className="d-block pb-2">{t('수상내역')}</strong>
        <Section>
          <strong>{t('지정')}</strong>
          <FesSelect
            options={listCodes}
            defaultOptions={ticket.defaultOptions}
            onChange={handleChangeTopics}
          />
        </Section>
        <Section>
          <strong>{t('랜덤')}</strong>
          <FiledInput
            type="number"
            value={ticket.random}
            onChange={handleChangeRandom}
            name="random"
          />
        </Section>
      </Col>
      <Col sm={4} className="pt-4 ml-4">
        <div className="mb-2">
          <strong>수상이미지</strong>
        </div>
        <UploadImage
          item={ticket.imageLucky}
          loading={loading}
          name="lucky"
          fileRefs={inputRefLucky}
          onChangeFile={onChangeFileTicket}
          onReset={onReset}
        />
      </Col>
    </Row>
  );
});

const FiledInput = styled(Input)`
  padding: 6px 12px;
  font-size: 15px;
  width: 80%;

  :focus {
    border-color: #3c8dbc !important;
    box-shadow: none;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
