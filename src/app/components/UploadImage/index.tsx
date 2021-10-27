/**
 *
 * UploadImage
 *
 */
import { FesFileUpload } from 'app/components/FesFileUpload/Loadable';
import { FesLoadingImage } from 'app/components/FesLoadingImage/Loadable';
import { UnionIcon } from 'app/components/Icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';
import styled from 'styled-components/macro';
interface Props {
  item: any;
  fileRefs: any;
  onChangeFile: any;
  onReset?: any;
  onDelete?: any;
  onChangeCap?: any;
  handleUpLoadImage?: any;
  onSetFile?: any;
  description?: any;
  isBanner?: boolean;
  name?: string;
  loading?: boolean;
}

export const UploadImage = memo((props: Props) => {
  const { t } = useTranslation();
  const { item, fileRefs, onChangeFile, onReset, name, loading } = props;

  const trigger = e => {
    e.preventDefault();
    fileRefs.current.click();
  };

  return (
    <WrapItem>
      <Item style={{ paddingRight: '30px' }}>
        <FesFileUpload
          fileRef={fileRefs}
          onChangeFile={onChangeFile}
          name={name}
        >
          {!item && !loading && (
            <CustomButton onClick={trigger} className="xxx">
              <UnionIcon />
              <Span style={{ marginLeft: '10px' }}>{t('이미지 업로드')}</Span>
            </CustomButton>
          )}
        </FesFileUpload>
        <div className="position-relative">
          {loading && <FesLoadingImage />}
          {item && !loading && (
            <>
              <CustomImg url={item} />
              <ButtonDel
                onClick={onReset}
                className="btn-delete-image"
                type="button"
              >
                x
              </ButtonDel>
              {/* {isBanner && (
                <Input
                  placeholder="Description"
                  onChange={onChangeCap}
                  value={description}
                />
              )} */}
              <Div className="mt-2">
                <Button color="primary" name={name} onClick={trigger}>
                  {t('이미지 업로드')}
                </Button>
              </Div>
            </>
          )}
        </div>
      </Item>
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

const CustomButton = styled(Button)`
  box-sizing: border-box;
  border: 1px dashed #2c5282;
  border-radius: 6px;

  display: block;
  background: #ffffff;

  padding: 5px 30px;
  width: 180px;
`;

const CustomImg = styled('div')<{ url: string }>`
  background-image: url(${props => (props.url ? props.url : '')});
  background-size: cover;

  width: 250px;
  height: 200px;

  position: relative;
  top: -20px;

  :hover {
    opacity: 0.5;
  }
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
    left: 93%;
    top: -34px;
  }
  &.btn-delete-item {
    margin-left: 12px;
  }
`;
