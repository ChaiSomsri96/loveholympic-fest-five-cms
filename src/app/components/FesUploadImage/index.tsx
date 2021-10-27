/**
 *
 * FesUploadImage
 *
 */
import { FesFileUpload } from 'app/components/FesFileUpload/Loadable';
import { UnionIcon } from 'app/components/Icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'reactstrap';
import styled from 'styled-components/macro';
interface Props {
  keyIndex?: any;
  item?: any;
  fileRefs?: any;
  onChangeFile?: any;
  onTrigger?: any;
  onReset?: any;
  onDelete?: any;
  handleChange?: any;
  loading?: boolean;
}

export const FesUploadImage = memo((props: Props) => {
  const { t } = useTranslation();
  const {
    keyIndex,
    item,
    fileRefs,
    onChangeFile,
    onTrigger,
    onReset,
    onDelete,
    handleChange,
    loading,
  } = props;

  return (
    <WrapItem>
      <Item style={{ paddingRight: '30px' }}>
        <FesFileUpload
          fileRef={fileRefs}
          onChangeFile={onChangeFile}
          accept="image/x-png,image/gif,image/jpeg"
        >
          <CustomButton onClick={onTrigger}>
            <UnionIcon />
            <Span style={{ marginLeft: '10px' }}>{t('Upload')}</Span>
          </CustomButton>
        </FesFileUpload>
        {loading && (
          <SpinnerLoading>
            <Spinner color="primary" />
          </SpinnerLoading>
        )}
        {item.image && !loading && (
          <CustomImg url={item.image}>
            <ButtonDel onClick={onReset} className="btn-delete-image">
              x
            </ButtonDel>
          </CustomImg>
        )}
      </Item>
      <Div>
        <CustomInput
          placeholder="Link URL"
          onChange={handleChange}
          value={item.url}
        />
        {keyIndex !== 0 && (
          <ButtonDel onClick={onDelete} className="btn-delete-item">
            x
          </ButtonDel>
        )}
      </Div>
    </WrapItem>
  );
});

const Div = styled.div`
  width: 100%;
  display: flex;
`;

const WrapItem = styled.div`
  display: flex;
  padding: 10px 0px;
`;

const Item = styled.div``;

const CustomButton = styled.button`
  box-sizing: border-box;
  border: 1px dashed #2c5282;
  border-radius: 6px;
  display: block;
  background: #ffffff;
  padding: 5px 30px;
  width: 180px;
`;

const CustomInput = styled.input`
  border: 1px solid #2c5282;
  box-sizing: border-box;
  border-radius: 4px;
  width: 95%;
  height: 40px;

  outline: none;
`;

const CustomImg = styled('div')<{ url: string }>`
  background-image: url(${props => (props.url ? props.url : '')});
  background-size: cover;
  width: 180px;
  height: 140px;
  position: relative;
  top: -38px;
`;

const Span = styled.span`
  margin-left: 10px;
  color: #424242;
  font-size: 14px;
  line-height: 16px;
`;

const ButtonDel = styled.button`
  height: 33px;
  width: 33px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid #d8dcff;
  background: red;
  color: #fff;
  &.btn-delete-image {
    position: absolute;
    right: -13px;
    top: -13px;
  }
  &.btn-delete-item {
    margin-left: 12px;
  }
`;

const SpinnerLoading = styled.div`
  width: 180px;
  height: 140px;

  position: relative;
  top: -35px;

  background: black;
  opacity: 0.2;

  display: flex;
  justify-content: center;
  align-items: center;
`;
