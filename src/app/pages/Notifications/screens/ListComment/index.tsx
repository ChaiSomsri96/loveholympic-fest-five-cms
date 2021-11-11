/**
 *
 * ListComment
 *
 */
import AvatarIcon from 'images/auth/avatar.png';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import styled from 'styled-components/macro';
import { DeleteIcon } from 'app/components/Icons';
interface Props {
  comment?: any;
  onHandleComment: any;
  typing: any;
  onChangeValue: any;
  name?: string;
  onDeleteComment: any;
  onDeleteReplyAdmin?: any;
  positionComment: number;
  avatarAdmin?: string;
}

export const ListComment = memo((props: Props) => {
  const { t } = useTranslation();
  const {
    comment,
    typing,
    onHandleComment,
    onChangeValue,
    onDeleteComment,
    onDeleteReplyAdmin,
    positionComment,
    avatarAdmin,
  } = props;

  return (
    <Row>
      <Col sm={12}>
        <img
          src={(comment.user && comment.user.defaultAvatar) || AvatarIcon}
          style={{
            borderRadius: '50%',
            border: '2px solid #d2d6de',
            width: '50px',
          }}
          alt=""
        />
        <TextName>{comment.user && comment.user.nickname}</TextName>
      </Col>
      <WrapperComment>
        <Col sm={12} className="pt-3">
          <TextComment>{comment.content}</TextComment>
        </Col>
        <Col sm={12} className="">
          <ButtonDel onClick={onDeleteComment}>
            <DeleteIcon />
          </ButtonDel>
        </Col>
      </WrapperComment>

      {comment.replies.length > 0 &&
        comment.replies.map((reply, idx) => (
          <Col sm={12} className="pl-5 pt-3" key={idx}>
            <Row>
              <Col sm={12} className="pt-1">
                <img
                  src={avatarAdmin}
                  style={{ borderRadius: '50%', border: '2px solid #d2d6de' }}
                  alt=""
                  width={50}
                  height={50}
                />
                <TextName>{t('Admin')}</TextName>
              </Col>
              <WrapperComment>
                <TextComment>{reply.content}</TextComment>
                <ButtonDel
                  onClick={e => onDeleteReplyAdmin(e, positionComment, idx)}
                >
                  <DeleteIcon />
                </ButtonDel>
              </WrapperComment>
            </Row>
          </Col>
        ))}
      <Col sm={12} className="pt-4">
        <Input
          placeholder="Type a comment"
          onKeyDown={onHandleComment}
          value={typing || ''}
          onChange={onChangeValue}
        />
      </Col>
    </Row>
  );
});

const ButtonDel = styled.button`
  border: none;
  background: #fff;
`;

const TextComment = styled.span`
  color: #666;
  font-size: 15px;
`;

const TextName = styled.span`
  font-weight: 600;
  color: #3c8dbc;
  padding-left: 1rem;
`;

const WrapperComment = styled.div`
  /* border: solid 1px; */
  display: flex;
  width: 80%;
`;
